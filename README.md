# mrraihan.pages.dev — Full-Stack Portfolio & Admin CMS (Cloudflare Pages + D1 + Cloudinary)

## Pre-Configured Credentials
- **Cloudflare Pages Project Name**: `mrraihan` (`https://mrraihan.pages.dev`)
- **D1 Database Name**: `raihan_portfolio_db`
- **D1 Database ID**: `212050f4-a269-4c14-a6d2-9b3f21431902`
- **Cloudinary Cloud Name**: `dbkmg0oia` (Folder: `raihan_portfolio`)
- **Admin Login Email**: `mohammadraihan4386.bd@gmail.com`
- **Admin Login Password**: `Mrraiha@3859`

## How to Deploy to GitHub + Cloudflare Pages
1. Upload all files in this folder to a new GitHub repository (e.g. `mrraihan-portfolio`).
2. Go to **Cloudflare Dashboard → Workers & Pages → Create Application → Pages → Connect to Git**.
3. Select your repository, set **Project Name** to `mrraihan` (so your domain becomes `mrraihan.pages.dev`), and set **Build output directory** to `public`.
4. In Cloudflare Pages **Settings → Bindings → Add → D1 database**, set Variable name to `DB` and select `raihan_portfolio_db` (`212050f4-a269-4c14-a6d2-9b3f21431902`).
5. To add any new tool in the future (HTML or built React/Vite `dist` files), simply drop the folder into `public/<tool-name>/` in GitHub and add its card from the Admin Panel (`raihan.` double-click or `/admin`).
