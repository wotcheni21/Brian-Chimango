# RSVP API — Python + SQLite

A small FastAPI service that receives RSVP submissions from the wedding
site and stores them in a local SQLite file. Deployed separately from the
Next.js site (which lives on Vercel) — this runs on your VPS.

## How to check the RSVP list

Once deployed (see below), you have three ways to view responses:

1. **Browser admin page** — visit `https://your-api-domain/admin?token=YOUR_ADMIN_TOKEN`
   for a live table of every response plus a summary (total responses,
   attending/not attending, total guests attending) and a CSV download link.
2. **CSV download** — `https://your-api-domain/rsvp/export.csv?token=YOUR_ADMIN_TOKEN`
   downloads a spreadsheet-ready file directly.
3. **Raw JSON** — `GET /rsvp` with header `Authorization: Bearer YOUR_ADMIN_TOKEN`
   (or `?token=` query param), e.g.:
   ```bash
   curl -H "Authorization: Bearer YOUR_ADMIN_TOKEN" https://your-api-domain/rsvp
   ```

`YOUR_ADMIN_TOKEN` is whatever you set as `RSVP_ADMIN_TOKEN` in `.env` — treat
it like a password and don't share the `/admin?token=...` link publicly.

## Local development

```bash
cd server
python -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env       # edit RSVP_ADMIN_TOKEN at minimum
uvicorn app.main:app --reload
```

API runs at `http://localhost:8000`. Interactive docs at
`http://localhost:8000/docs`. Point the frontend's
`NEXT_PUBLIC_RSVP_API_URL` at this URL for local end-to-end testing.

## Endpoints

| Method | Path | Auth | Purpose |
|---|---|---|---|
| `POST` | `/rsvp` | none | Called by the wedding site's RSVP form |
| `GET` | `/rsvp` | admin token | List all RSVPs as JSON |
| `GET` | `/rsvp/summary` | admin token | Counts: total/attending/not attending/guests |
| `GET` | `/rsvp/export.csv` | admin token | Download all RSVPs as CSV |
| `GET` | `/admin?token=...` | admin token | Browser-viewable RSVP list |
| `GET` | `/health` | none | Health check |

## Deploying to your VPS

Two options — pick one. Both assume a Debian/Ubuntu-family VPS with a
domain (or subdomain, e.g. `rsvp-api.yourdomain.com`) pointed at it.

### Option A — Docker (simplest)

```bash
# On the VPS
git clone <your-repo-url> app && cd app/server
cp .env.example .env && nano .env   # set RSVP_ADMIN_TOKEN and RSVP_ALLOWED_ORIGINS

docker build -t rsvp-api .
docker run -d --name rsvp-api \
  --restart unless-stopped \
  --env-file .env \
  -p 127.0.0.1:8000:8000 \
  -v rsvp-data:/data \
  rsvp-api
```

The SQLite file persists in the `rsvp-data` Docker volume, so `docker run`
recreating the container doesn't lose data.

### Option B — systemd (no Docker)

```bash
# On the VPS
sudo useradd -r -s /usr/sbin/nologin rsvp
sudo mkdir -p /opt/rsvp-api
sudo chown rsvp:rsvp /opt/rsvp-api

# as the rsvp user (or copy files then chown)
git clone <your-repo-url> /tmp/app
cp -r /tmp/app/server/* /opt/rsvp-api/
cd /opt/rsvp-api
python3 -m venv venv
venv/bin/pip install -r requirements.txt
cp .env.example .env && nano .env   # set RSVP_ADMIN_TOKEN and RSVP_ALLOWED_ORIGINS

sudo cp deploy/rsvp-api.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable --now rsvp-api
sudo systemctl status rsvp-api
```

### Both options — put nginx + HTTPS in front

```bash
sudo apt install nginx certbot python3-certbot-nginx
sudo cp deploy/nginx.conf.example /etc/nginx/sites-available/rsvp-api.conf
# edit server_name to your real domain
sudo ln -s /etc/nginx/sites-available/rsvp-api.conf /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
sudo certbot --nginx -d rsvp-api.yourdomain.com
```

### Connect the frontend

In the Next.js project (Vercel), set:

```
NEXT_PUBLIC_RSVP_API_URL=https://rsvp-api.yourdomain.com
```

in Vercel's Project Settings → Environment Variables, then redeploy. The
form will automatically start posting real submissions instead of using
the mock handler — no frontend code changes needed.

## Backups

The whole dataset is one SQLite file (`/data/rsvp.db` in Docker, or the
path set by `RSVP_DB_PATH`, default `server/rsvp.db`). Back it up with a
simple cron copy, e.g.:

```bash
0 3 * * * cp /var/lib/docker/volumes/rsvp-data/_data/rsvp.db /home/you/backups/rsvp-$(date +\%F).db
```
