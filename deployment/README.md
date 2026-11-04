# Loima TVC - Linux VPS Deployment Guide

This directory contains the production infrastructure and automation files for deploying **Loima Technical & Vocational College (TVET Site)** to an Ubuntu or Debian Linux VPS.

---

## 1. Quick Start (First-Time Provisioning)

On a freshly created Linux VPS (Ubuntu 20.04 / 22.04 / 24.04 LTS):

1. **Clone the repository to your VPS**:
   ```bash
   sudo git clone https://github.com/teemoh00/TVET-Site.git /var/www/tvet-site
   cd /var/www/tvet-site
   ```

2. **Run the one-shot installer**:
   ```bash
   sudo bash scripts/deploy.sh --mode=install --domain=loima.royalsoftwares.co.ke
   ```
   *This automatically installs Python, Node.js, Nginx, PostgreSQL, Certbot, configures systemd, builds the React frontend, seeds the initial college catalog into the database, and prompts you to create the Django admin superuser.*

3. **Configure your domain & SSL**:
   ```bash
   sudo bash scripts/deploy.sh --mode=https --domain=loima.royalsoftwares.co.ke
   ```

---

## 2. Standard Deployment Updates

Whenever you make changes to either the frontend or the Django backend, push them to Git and run:

```bash
cd /var/www/tvet-site
sudo bash scripts/deploy.sh
```

This performs:
- Git fetch & fast-forward merge
- Compressed database backup to `/var/backups/tvet-site/`
- Virtualenv package verification from `requirements.txt`
- Django migrations (`python manage.py migrate --no-input`)
- Master data seeding check (`python manage.py seed_tvet_data`)
- Django static asset collection (`python manage.py collectstatic --no-input`)
- React/Vite production compilation (`npm run build`)
- Atomic sync to `/var/www/tvet-site-frontend`
- Zero-downtime Gunicorn restart & Nginx reload
- Post-deployment health verification probe

---

## 3. Shifting Domains Later (e.g. from `loima.royalsoftwares.co.ke` to `loimatvc.ac.ke`)

When your official domain `loimatvc.ac.ke` DNS points to your VPS IP:

1. Update `DOMAIN="loimatvc.ac.ke"` in `/etc/tvet-site/tvet.env`.
2. Run:
   ```bash
   sudo bash scripts/deploy.sh --mode=https --domain=loimatvc.ac.ke
   ```
   The script will automatically regenerate Nginx config for `loimatvc.ac.ke` & `www.loimatvc.ac.ke`, test syntax, reload Nginx, and request Let's Encrypt certificates.

---

## 4. Maintenance Mode Management

Put the portal into maintenance mode with a single command:

```bash
# Enable maintenance mode
sudo bash scripts/deploy.sh --maintenance=on

# Check current status & preview URL
sudo bash scripts/deploy.sh --maintenance=status

# Disable maintenance mode (Go Live)
sudo bash scripts/deploy.sh --maintenance=off
```

> **Client Preview Access**: When maintenance mode is active, you can preview the live portal using your private access URL:
> `https://loima.royalsoftwares.co.ke/preview-access?key=tvet-preview-2026`

---

## 5. Directory Structure Reference

| VPS Path | Purpose |
| :--- | :--- |
| `/etc/tvet-site/tvet.env` | Production environment variables & secrets |
| `/etc/systemd/system/tvet_backend.service` | Gunicorn backend systemd daemon |
| `/etc/nginx/sites-available/tvet-site` | Nginx reverse proxy configuration |
| `/var/www/tvet-site-frontend` | Compiled React/Vite static assets |
| `/var/www/tvet-site-static` | Django admin and collected static files |
| `/var/www/tvet-site-media` | Uploaded PDFs, brochures, crests, photos |
| `/var/backups/tvet-site` | Compressed 14-day database backups |
