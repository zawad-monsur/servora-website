# ClochePOS website

The marketing site for clochepos.com: plain HTML, CSS and JS.

## Pages

| Page | Source |
|---|---|
| Home (short overview) | `pages/index.html` |
| Features (with a jump-bar to each area) | `pages/features.html` |
| Pricing | `pages/pricing.html` |
| Build your plan | `pages/plan.html` + `assets/plan.js` |
| FAQ | `pages/faq.html` |
| Terms, Privacy | `pages/terms.html`, `pages/privacy.html` |

Edit the files in `pages/`, then run:

```
python build.py
```

It adds the shared header, phone menu, contact section and footer, and writes the finished pages
(`index.html`, `features.html`, …) and `sitemap.xml` next to it. Commit both. CI fails if you forget to build.

## Settings

- Contact and sign-up: `assets/contact.js` (`whatsapp`, `email`, `trial`). While `trial` is empty,
  “Start free trial” opens WhatsApp; set it to `https://start.clochepos.com` once the SaaS is live.
- Product images in `assets/img/` are deliberately cropped fragments at moderate resolution.
  Never publish full-screen captures of the product here.
- `robots.txt` blocks AI training crawlers.

## Hosting

- **clochepos.com (cPanel):** the `Website` workflow uploads `main` to `~/public_html` over FTPS.
  Turn it on with the repository variable `DEPLOY_ENABLED=true` and the secrets `FTP_SERVER`,
  `FTP_USERNAME`, `FTP_PASSWORD` (an FTP account whose folder is `public_html`).
  `.htaccess` forces HTTPS, drops `www` and serves clean addresses (`/features`, `/terms`).
- **GitHub Pages** (preview): Settings → Pages → Deploy from branch `main`, folder `/root`.
