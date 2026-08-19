# Deploy — Hetzner + Cloudflare + Namecheap

The site runs in Docker on your Hetzner VPS. The container always listens on
**3000**; the **host port** comes from the env file (`APP_PORT`), so it never
clashes with the other projects on the box. Cloudflare fronts DNS/SSL; your
reverse proxy routes the domain to `APP_PORT`.

## 1. Run it on the VPS

```bash
git clone <your-repo> tabletap-site && cd tabletap-site
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

1. **DNS** → add an **A record**: `@` → your **Hetzner VPS IP**, **Proxied**
   (orange cloud). Add `www` too (A → same IP, or CNAME `www` → `@`).
2. **SSL/TLS** → set encryption mode to **Full** (or **Full (strict)** if the
   origin has a valid cert). Visitors get HTTPS for free.

## 4. Route the domain to the container (reverse proxy)

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

With Cloudflare proxying + SSL **Full**, HTTPS terminates at Cloudflare, so nginx
on port 80 is fine. For **Full (strict)**, add a free
[Cloudflare Origin Certificate](https://developers.cloudflare.com/ssl/origin-configuration/origin-ca/)
and listen on 443.

### Alternative: Cloudflare Tunnel (no open ports)

Run `cloudflared` and point a tunnel at `http://localhost:APP_PORT`. Cloudflare
creates the DNS record and no VPS firewall ports need opening.

## Changing the port later

Edit `.env.production` (`APP_PORT=...`), update the nginx `proxy_pass` to match,
then `./cli/docker.sh prod-up` and `systemctl reload nginx`. No code changes.
