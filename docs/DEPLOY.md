# Deploy — Hetzner + Cloudflare + Namecheap

The site runs in Docker on your Hetzner VPS. The container always listens on
**3000**; the **host port** comes from the env file (`APP_PORT`), so it never
clashes with the other projects on the box. Cloudflare fronts DNS/SSL; your
reverse proxy routes the domain to `APP_PORT`.

## 1. Run it on the VPS

```bash
git clone <your-repo> tabletab && cd tabletab
cp .env.example .env.production   # set APP_PORT to a free port, e.g. APP_PORT=3007
cp .env.example .env.development  # (only if you'll run the dev container too)

# everything goes through cli/docker.sh:
./cli/docker.sh prod-up      # build + start production (detached)
./cli/docker.sh status       # see what's running
./cli/docker.sh prod-logs    # follow logs
```

The app is now on `http://<VPS_IP>:APP_PORT`. Update later with:

```bash
git pull && ./cli/docker.sh prod-up
```

Run `./cli/docker.sh` with no argument for the full command list.

## 2. Namecheap → Cloudflare

1. In **Cloudflare** → _Add a site_ → enter your domain → Free plan. Cloudflare
   shows **two nameservers** (e.g. `xxx.ns.cloudflare.com`).
2. In **Namecheap** → _Domain List_ → _Manage_ → **Nameservers** → _Custom DNS_ →
   paste Cloudflare's two nameservers → save. (Propagation: minutes to hours.)

## 3. Cloudflare DNS + SSL

### DNS records

Add **both** records — a missing `www` is the most common cause of
`ERR_NAME_NOT_RESOLVED`, because DNS has no wildcard fallback: `example.com` and
`www.example.com` are unrelated names and each needs its own record.

| Type  | Name  | Content             | Proxy status     |
| ----- | ----- | ------------------- | ---------------- |
| A     | `@`   | your Hetzner VPS IP | Proxied (orange) |
| CNAME | `www` | `example.com`       | Proxied (orange) |

Leave MX and SPF/DKIM TXT records on **DNS only** (grey cloud) — Cloudflare's
proxy handles HTTP(S) only, and proxying mail records breaks email.

Verify before moving on:

```bash
dig +short example.com          # → Cloudflare anycast IPs (104.x / 172.67.x)
dig +short www.example.com      # → the same; empty output means the record is missing
```

### SSL/TLS encryption mode

The mode must match what your origin actually listens on, or Cloudflare cannot
complete the second hop:

| Origin (nginx) listens on                       | Correct mode      | Wrong mode gives         |
| ----------------------------------------------- | ----------------- | ------------------------ |
| `listen 80;` (HTTP only)                        | **Flexible**      | Full → **521**           |
| `listen 443 ssl;` with a Cloudflare Origin cert | **Full (strict)** | Flexible → redirect loop |

**Full** and **Full (strict)** both make Cloudflare connect to the origin over
**HTTPS on port 443** — they are not "HTTP is fine" modes. Start on Flexible to
get the site up, then move to Full (strict) once the Origin certificate is
installed (section 4).

## 4. Route the domain to the container (reverse proxy)

> **Quick path:** `sudo ./cli/nginx.sh tabletab.co` does everything in
> this section — reads `APP_PORT` from `.env.production`, renders
> `cli/nginx/default.conf.template`, installs the site, refreshes the Cloudflare IP
> list for real client IPs, runs `nginx -t` and reloads. Safe to re-run.
> Then set Cloudflare SSL/TLS mode to **Flexible**. The rest of this section
> explains what it does and how to move to Full (strict).

Cloudflare hits your VPS on 80/443. Since the box hosts several projects, a
reverse proxy maps each domain to its container's `APP_PORT`. Example **nginx**
(`/etc/nginx/sites-available/tabletap`):

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://127.0.0.1:3007;   # = APP_PORT from .env.production
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

```bash
ln -s /etc/nginx/sites-available/tabletap /etc/nginx/sites-enabled/
nginx -t && systemctl reload nginx
```

### Why a reverse proxy is required at all

DNS maps a name to an **IP address only** — there is no field for a port, so a
browser visiting `example.com` always lands on 443 (or 80). On top of that,
Cloudflare's proxy will only connect to an origin on a fixed set of ports:

- HTTP: `80, 8080, 8880, 2052, 2082, 2086, 2095`
- HTTPS: `443, 2053, 2083, 2087, 2096, 8443`

`APP_PORT` values like 3000/3007 are not on that list, so the container can never
be reached directly. nginx on 80/443 is what bridges the gap.

### Upgrading to Full (strict)

The `listen 80;` block above pairs with SSL mode **Flexible** — the
Cloudflare→VPS hop is plain HTTP. To encrypt it, create a free
[Cloudflare Origin Certificate](https://developers.cloudflare.com/ssl/origin-configuration/origin-ca/)
(SSL/TLS → Origin Server → Create Certificate, 15-year validity), install it, and
switch the mode to **Full (strict)**:

```bash
sudo install -d -m 750 /etc/ssl/cf
sudo nano /etc/ssl/cf/origin.pem   # certificate     (chmod 644)
sudo nano /etc/ssl/cf/origin.key   # private key     (chmod 600)
```

```nginx
server {
    listen 443 ssl;
    http2 on;
    server_name example.com www.example.com;

    ssl_certificate     /etc/ssl/cf/origin.pem;
    ssl_certificate_key /etc/ssl/cf/origin.key;

    location / {
        proxy_pass http://127.0.0.1:3007;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $http_cf_connecting_ip;
        proxy_set_header X-Forwarded-For $http_cf_connecting_ip;
        proxy_set_header X-Forwarded-Proto https;
    }
}

server {
    listen 80;
    server_name example.com www.example.com;
    return 301 https://$host$request_uri;
}
```

Note `$http_cf_connecting_ip` rather than `$remote_addr`: behind Cloudflare,
`$remote_addr` is always a Cloudflare edge IP, so logs and any rate limiting see
the proxy instead of the visitor.

### Lock the container to loopback

`cli/production/docker-compose.yml` publishes `"${APP_PORT}:3000"`, which binds
every interface — so `http://<VPS_IP>:3007` answers publicly and bypasses
Cloudflare entirely. Once nginx is in front, change it to bind loopback only:

```yaml
ports:
  - "127.0.0.1:${APP_PORT:-3000}:3000"
```

For the same reason, restrict inbound 80/443 to
[Cloudflare's IP ranges](https://www.cloudflare.com/ips/) in the Hetzner Cloud
Firewall, and 22 to your own IP.

### Alternative: Cloudflare Tunnel (no open ports)

Run `cloudflared` and point a tunnel at `http://localhost:APP_PORT`. Cloudflare
creates the DNS record and no VPS firewall ports need opening.

## Changing the port later

Edit `.env.production` (`APP_PORT=...`), update the nginx `proxy_pass` to match,
then `./cli/docker.sh prod-up` and `systemctl reload nginx`. No code changes.

## Troubleshooting

| Symptom                                 | Cause                                                                               |
| --------------------------------------- | ----------------------------------------------------------------------------------- |
| `ERR_NAME_NOT_RESOLVED` on `www.`       | No `www` record in Cloudflare DNS — see section 3                                   |
| **521** Web server is down              | SSL mode Full/Full (strict) while nginx only listens on 80; or nginx/container down |
| **522** Connection timed out            | Firewall blocking Cloudflare on 80/443                                              |
| **526** Invalid SSL certificate         | Full (strict) against a self-signed cert — use the Cloudflare Origin cert           |
| `ERR_TOO_MANY_REDIRECTS`                | Flexible mode while nginx also redirects to HTTPS                                   |
| **502** from nginx                      | `proxy_pass` port ≠ `APP_PORT` in `.env.production`                                 |
| Hydration errors in the browser console | Cloudflare **Rocket Loader** or JS auto-minify enabled — turn both off              |
| Every visitor logged as one IP          | Using `$remote_addr` instead of `$http_cf_connecting_ip`                            |

```bash
curl -I https://example.com                    # expect: server: cloudflare
curl -I http://127.0.0.1:3007                  # on the VPS: is the container answering?
docker logs tabletab-site --tail 50            # app-side errors
sudo tail -n 50 /var/log/nginx/error.log       # proxy-side errors
```
