# Mohammad Raihan — Portfolio & /admin CMS (Cloudflare Pages + D1 + Cloudinary)

## Pre-Configured Credentials & Bindings
- **Admin Login Route**: `/admin` (or click `/admin` in the top navigation bar)
- **Admin Email**: `mohammadraihan4386@gmail.com`
- **Admin Password**: `Raihan@2026#Admin`
- **Cloudflare D1 Database Name**: `raihan_portfolio_db`
- **Cloudflare D1 Database ID**: `212050f4-a269-4c14-a6d2-9b3f21431902`
- **Cloudinary Cloud Name**: `dbkmg0oia`

## How to Deploy to Cloudflare Pages (.pages.dev)
1. Initialize the D1 table in Cloudflare Dashboard (`Workers & Pages -> D1 -> raihan_portfolio_db -> Console`) by pasting `schema.sql`.
2. Deploy via GitHub or Wrangler CLI:
   ```bash
   npx wrangler pages deploy public --project-name mohammad-raihan-portfolio
   ```
3. In Cloudflare Pages project `Settings -> Functions -> D1 database bindings`, verify binding variable `DB` points to `raihan_portfolio_db`.
