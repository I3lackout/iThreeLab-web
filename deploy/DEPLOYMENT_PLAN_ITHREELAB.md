# Deployment-Plan für `ithreelab.com` (iThreeLab)

> **Status:** Vorbereitet. DNS wird beim Domain-/DNS-Provider gepflegt; das VPS-Deployment erfolgt erst nach expliziter Freigabe des Maintainers.

## 1. DNS-Einstellungen beim Domain-/DNS-Provider

Für `ithreelab.com` beim Registrar / DNS-Provider setzen (Ziel: VPS `152.53.122.73`):

| Typ | Host / Name | Ziel / Wert | Hinweis |
| :--- | :--- | :--- | :--- |
| `A` | `@` | `152.53.122.73` | Root-Domain `ithreelab.com` |
| `CNAME` | `www` | `ithreelab.com` | Vorhandene Parking-Einträge für `www` vorher entfernen |

## 2. Statischer Produktions-Build (ohne Live-Localhost-Bridge)

```bash
VITE_ECONOMICS_LAB_ENABLED=false npm run build
```

Im Produktions-Build läuft `/labs/economics` im reinen **Offline Synthetic Mode** ohne Backend-Abhängigkeit.

## 3. VPS-Deployment & Caddy (nach Freigabe)

1. `dist/` auf den VPS nach `/var/www/ithreelab-web/dist` übertragen (Leserechte für `caddy` sicherstellen).
2. Site-Block aus `deploy/Caddyfile.ithreelab.example` in `/etc/caddy/Caddyfile` ergänzen.
3. Konfiguration prüfen und neu laden:
   ```bash
   sudo caddy validate --config /etc/caddy/Caddyfile
   sudo systemctl reload caddy
   ```

## 4. Abnahme-Checkliste

- `curl -I https://www.ithreelab.com` → `301`/`308` Redirect auf `https://ithreelab.com`
- `curl -I https://ithreelab.com/` → `200`
- `curl -I https://ithreelab.com/labs/economics` → `200` (SPA-Fallback)
- `curl -I https://ithreelab.com/labs/intelligence` → `200`
- `systemctl status caddy` und `systemctl status musicchaini3.service` prüfen
