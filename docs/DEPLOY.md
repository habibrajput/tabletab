# Deploy — Hetzner + Cloudflare + Namecheap

The site runs in Docker on the Hetzner VPS. The container always listens on
**3000**; the **host port** comes from `.env` (`APP_PORT`), so it
never clashes with the other projects on the box. Cloudflare fronts DNS and TLS;
nginx on the VPS routes the domain to `APP_PORT`.

```
Namecheap ──NS──> Cloudflare ──:80/:443──> nginx ──> container (APP_PORT → 3000)
(registrar)       (DNS + TLS + cache)      (VPS)
```

## Where each command runs

This trips people up, so every code block below is labelled. In short:

| Command                                | Run on   | Why                                        |
| -------------------------------------- | -------- | ------------------------------------------ |
| `dig ...`                              | your Mac | DNS is global — check from outside         |
| `./cli/docker.sh ...`                  | the VPS  | that is where Docker runs                  |
| `sudo ./cli/nginx.sh <domain>`         | the VPS  | configures nginx on the box                |
| `curl -H 'Host: ...' http://127.0.0.1` | the VPS  | tests nginx→container, skipping Cloudflare |
| `curl -I https://tabletab.co`          | your Mac | tests the whole chain                      |

That last pair is the key debugging split: **VPS-local 200 + public 521 means
the problem is Cloudflare or the firewall, not the app.**

---

## 1. Run the app on the VPS

> Run on: **the VPS**

```bash
git clone https://github.com/habibrajput/tabletab.git && cd tabletab
cp .env.example .env   # set APP_PORT to a free port, e.g. APP_PORT=3007
cp .env.example .env.development  # only if you'll run the dev container too

./cli/docker.sh prod-up      # build + start production (detached)
./cli/docker.sh status       # see what's running
./cli/docker.sh prod-logs    # follow logs
```

Confirm it is actually serving before touching DNS or nginx:

```bash
curl -I http://127.0.0.1:3007      # = APP_PORT; expect HTTP/1.1 200 OK
```

Update later with `git pull && ./cli/docker.sh prod-up`. Run `./cli/docker.sh`
with no argument for the full command list.

---

## 2. Point Namecheap at Cloudflare

> Run in: **the Cloudflare and Namecheap dashboards**

1. **Cloudflare** → _Add a site_ → enter `tabletab.co` → Free plan. Cloudflare
   assigns **two nameservers**, e.g. `athena.ns.cloudflare.com` and
   `austin.ns.cloudflare.com`.
2. **Namecheap** → _Domain List_ → _Manage_ → **Nameservers** → switch _Basic
   DNS_ to **Custom DNS** → paste both → save.

Once nameservers are delegated, records at Namecheap are ignored — **all DNS now
lives in Cloudflare**. If you use Namecheap Private Email, re-create the MX and
SPF/DKIM records inside Cloudflare _before_ switching, or mail stops.

Verify (run on **your Mac**):

```bash
dig +short NS tabletab.co     # → athena.ns.cloudflare.com, austin.ns.cloudflare.com
```

---

## 3. Cloudflare DNS records

> Run in: **the Cloudflare dashboard** → _DNS_ → _Records_

Add **both** records. `tabletab.co` and `www.tabletab.co` are unrelated names in
DNS — there is no wildcard fallback, so a missing `www` gives
`ERR_NAME_NOT_RESOLVED` even when the apex works perfectly.

| Type  | Name  | Content             | Proxy status     |
| ----- | ----- | ------------------- | ---------------- |
| A     | `@`   | your Hetzner VPS IP | Proxied (orange) |
| CNAME | `www` | `tabletab.co`       | Proxied (orange) |

Leave MX and SPF/DKIM TXT records on **DNS only** (grey cloud) — the Cloudflare
proxy handles HTTP(S) only, and proxying mail records breaks email.

### Verifying, and why `dig` may lie to you

> Run on: **your Mac**

```bash
dig +short tabletab.co
dig +short www.tabletab.co
```

Both should return Cloudflare anycast IPs (`104.x` / `172.67.x`), **not** your
VPS IP — that is what "Proxied" means. A proxied CNAME shows up as an A record;
that is Cloudflare flattening it, not a mistake.

If `www` comes back empty, check whether the record is actually missing or
whether you are being served a **cached negative answer**:

```bash
dig +short www.tabletab.co @1.1.1.1                    # a public resolver
dig +short www.tabletab.co @athena.ns.cloudflare.com   # your zone itself — never cached
```

If the authoritative nameserver answers but public resolvers do not, the record
is fine and you just have to wait. Every resolver that looked the name up
_before_ you created it cached "does not exist" for the zone's SOA minimum —
**1800 seconds (30 minutes)** on Cloudflare. Flushing your local DNS cache does
not help, because the stale answer lives upstream:

```bash
sudo dscacheutil -flushcache && sudo killall -HUP mDNSResponder   # macOS — local only
```

To see the site immediately, point your Mac at `1.1.1.1` (System Settings →
Network → Wi-Fi → Details → DNS), or just wait it out.

> **Lesson:** create DNS records _before_ you first test a hostname. One early
> lookup against a name that does not exist yet costs you a 30-minute wait.

---

## 4. Put nginx in front of the container

> Run on: **the VPS**

```bash
sudo ./cli/nginx.sh tabletab.co
```

That script does the whole section: reads `APP_PORT` from `.env`,
refuses to continue unless the container is answering, installs nginx if it is
missing, renders `cli/nginx/default.conf.template`, removes the `default` site
(it silently shadows port 80), refreshes Cloudflare's IP ranges so logs show
real visitor IPs, runs `nginx -t`, reloads, and finally proves nginx answers on
:80 — exiting non-zero if it does not. Safe to re-run any time.

Verify (still on the VPS):

```bash
curl -I -H 'Host: tabletab.co' http://127.0.0.1     # expect HTTP/1.1 200 OK
```

### Why a reverse proxy is needed at all

A reasonable question: why not just point DNS at `VPS_IP:3000`?

- **DNS maps a name to an IP address only.** There is no field for a port. A
  browser visiting `tabletab.co` always lands on 443 (or 80).
- **Cloudflare's proxy only connects to origins on a fixed port list:**
  - HTTP: `80, 8080, 8880, 2052, 2082, 2086, 2095`
  - HTTPS: `443, 2053, 2083, 2087, 2096, 8443`

`APP_PORT` values like 3000 or 3007 appear on neither list, so the container can
never be reached directly. nginx listening on 80/443 is what bridges the gap —
and it is also what lets one VPS host several projects on one IP.

### Changing the port later

Edit `APP_PORT` in `.env`, then:

```bash
./cli/docker.sh prod-up
sudo ./cli/nginx.sh tabletab.co    # re-renders nginx with the new port
```

---

## 5. Cloudflare SSL/TLS mode

> Run in: **the Cloudflare dashboard** → _SSL/TLS_ → _Overview_

The mode must match what your origin actually listens on. **Full** and **Full
(strict)** both make Cloudflare connect to the origin over **HTTPS on port
443** — they are not "HTTP to the origin is fine" modes:

| Origin (nginx) listens on                       | Correct mode      | Wrong mode gives         |
| ----------------------------------------------- | ----------------- | ------------------------ |
| `listen 80;` — what `cli/nginx.sh` installs     | **Flexible**      | Full → **521**           |
| `listen 443 ssl;` with a Cloudflare Origin cert | **Full (strict)** | Flexible → redirect loop |

To change it:

1. Click the blue **Configure** button, top-right of the SSL/TLS page.
2. Choose **Custom SSL/TLS** — the _Automatic SSL/TLS_ option picks a mode for
   you and will not let you force Flexible.
3. Select **Flexible** → **Save**. It takes effect within seconds; no restart or
   cache purge needed.

Then load `https://tabletab.co` and `https://www.tabletab.co`.

### Also turn on

_SSL/TLS_ → _Edge Certificates_:

- **Always Use HTTPS** — On. Redirects plain-HTTP hits at the edge.
- **Automatic HTTPS Rewrites** — On.
- Minimum TLS Version — 1.2.

_Speed_ → _Optimization_:

- **Rocket Loader** — **Off**. It reorders script execution and breaks React
  hydration.
- JS **auto-minify** — Off, for the same reason.

---

## 6. Hardening (after the site is confirmed up)

### Encrypt the Cloudflare→VPS hop (Flexible → Full strict)

Flexible leaves that hop as plain HTTP. To fix it, get a free
[Cloudflare Origin Certificate](https://developers.cloudflare.com/ssl/origin-configuration/origin-ca/)
— _SSL/TLS_ → _Origin Server_ → _Create Certificate_, hostnames
`tabletab.co, *.tabletab.co`, 15-year validity — and install it on the VPS:

```bash
sudo install -d -m 750 /etc/ssl/cf
sudo nano /etc/ssl/cf/origin.pem   # the certificate  (chmod 644)
sudo nano /etc/ssl/cf/origin.key   # the private key  (chmod 600)
```

Add a TLS server block alongside the generated one:

```nginx
server {
    listen 443 ssl;
    http2 on;
    server_name tabletab.co www.tabletab.co;

    ssl_certificate     /etc/ssl/cf/origin.pem;
    ssl_certificate_key /etc/ssl/cf/origin.key;

    location / {
        proxy_pass http://127.0.0.1:3007;          # = APP_PORT
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $http_cf_connecting_ip;
        proxy_set_header X-Forwarded-For $http_cf_connecting_ip;
        proxy_set_header X-Forwarded-Proto https;
    }
}

server {
    listen 80;
    server_name tabletab.co www.tabletab.co;
    return 301 https://$host$request_uri;
}
```

```bash
sudo nginx -t && sudo systemctl reload nginx
```

Then set the Cloudflare mode to **Full (strict)**. Prefer it over plain Full,
which accepts any certificate the origin presents — including a forged one.

Note `$http_cf_connecting_ip` rather than `$remote_addr`: behind Cloudflare,
`$remote_addr` is always a Cloudflare edge IP, so logs and rate limiting would
otherwise see the proxy instead of the visitor.

### Stop the container answering publicly

`cli/production/docker-compose.yml` publishes `"${APP_PORT}:3000"`, which binds
every interface — `http://<VPS_IP>:3007` answers directly and bypasses
Cloudflare, TLS and any WAF rules. Bind it to loopback instead:

```yaml
ports:
  - "127.0.0.1:${APP_PORT:-3000}:3000"
```

Then `./cli/docker.sh prod-up`. nginx proxies to `127.0.0.1`, so nothing breaks.

### Firewall

In the **Hetzner Cloud Firewall** (in front of the NIC, so stronger than ufw):

| Direction | Port       | Source                                                  |
| --------- | ---------- | ------------------------------------------------------- |
| inbound   | 22/tcp     | your IP only                                            |
| inbound   | 80,443/tcp | [Cloudflare IP ranges](https://www.cloudflare.com/ips/) |

Without this, anyone who learns the origin IP can skip Cloudflare entirely.

### Alternative: Cloudflare Tunnel (no open ports)

Run `cloudflared` pointed at `http://localhost:APP_PORT`. Cloudflare creates the
DNS record, the origin dials out, and no inbound ports need opening at all.

---

## Troubleshooting

| Symptom                                 | Cause                                                                               |
| --------------------------------------- | ----------------------------------------------------------------------------------- |
| `ERR_NAME_NOT_RESOLVED` on `www.`       | No `www` record — or a cached negative answer; see section 3                        |
| **521** Web server is down              | SSL mode Full/Full (strict) while nginx only listens on 80; or nginx/container down |
| **522** Connection timed out            | Firewall blocking Cloudflare on 80/443                                              |
| **526** Invalid SSL certificate         | Full (strict) against a self-signed cert — use the Cloudflare Origin cert           |
| `ERR_TOO_MANY_REDIRECTS`                | Flexible mode while nginx also redirects to HTTPS                                   |
| nginx welcome page instead of the site  | The `default` site is shadowing port 80 — re-run `sudo ./cli/nginx.sh tabletab.co`  |
| **502** from nginx                      | `proxy_pass` port ≠ `APP_PORT`; re-run `cli/nginx.sh`                               |
| Hydration errors in the browser console | Cloudflare **Rocket Loader** or JS auto-minify enabled — turn both off              |
| Every visitor logged as one IP          | Using `$remote_addr` instead of `$http_cf_connecting_ip`                            |

Work outwards from the container — the first command that fails tells you which
layer is broken:

```bash
# on the VPS
curl -I http://127.0.0.1:3007                    # 1. container alive?
curl -I -H 'Host: tabletab.co' http://127.0.0.1  # 2. nginx → container?
docker logs tabletab-site --tail 50              # app errors
sudo tail -n 50 /var/log/nginx/error.log         # proxy errors

# on your Mac
dig +short www.tabletab.co                       # 3. DNS resolving?
curl -I https://tabletab.co                      # 4. full chain — expect server: cloudflare
```
