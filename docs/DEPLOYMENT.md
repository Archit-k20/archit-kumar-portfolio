# Deployment and maintenance

This repository contains Archit Kumar's editorial portfolio.

- Repository: https://github.com/Archit-k20/archit-kumar-portfolio
- Production: https://portfolio-updated-ak.vercel.app/
- Vercel project: `portfolio-updated`
- Production branch: `main`

## Build configuration

Use Node.js 24, `npm ci`, `npm test`, then `npm run build`. Vercel serves `dist/` and uses the SPA rewrite in `vercel.json` for direct case-study URLs and browser refresh. Static images, fonts and PDFs are served as files.

The contact form is optional. Set all three `VITE_APP_EMAILJS_*` variables described in the README to enable it. With no configuration the email and copy-address actions remain available. Tests mock email delivery; do not submit real messages as a deployment check.

## Validate a release

1. Run the tests and production build.
2. Check `/` and all three `/projects/*` routes by opening each directly and refreshing.
3. Verify project/source links, Xelron's May–October 2026 dates and the two resume PDFs.
4. Check navigation, the screenshot galleries and the motion toggle at desktop and mobile widths.
5. Inspect Vercel's deployment status and the public production URL after deployment.

## Rollback

In Vercel, select the last known-good deployment and use the production rollback control. Revert the corresponding source change in Git and push the revert so the production branch matches the intended site.

This GitHub repository starts from the current editorial version. Earlier portfolio Git tags and private folder backups remain in the original local project; they are not part of this new repository. Deployments created before this publication remain available in the existing Vercel project.

## Publication boundary

The public repository includes the application source, lockfile, public assets, tests, CI configuration, README and deployment documentation. Machine-specific restore notes, old working reports, local credentials and generated dependencies are excluded. Resume PDFs are the two supplied documents, unchanged.
