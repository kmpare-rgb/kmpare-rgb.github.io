# Kalen Pare — Engineering Portfolio

A responsive React + Vite + TypeScript portfolio with Tailwind CSS and GSAP. Includes seven case studies, continuously looping experience and personal-photo carousels, image lightboxes, and GitHub Pages deployment.

## Run locally

Install Node.js 22 LTS or newer and npm 10 or newer, then run:

```sh
npm ci
npm run dev
```

Open the URL printed by Vite. For a production preview:

```sh
npm run build
npm run preview
```

The ready-to-host production files are in `dist/`. Serve this directory through an HTTP server; opening `index.html` directly as a file does not support module loading or site routing.

## Content updates

All project content lives in `src/content/projects/*.json`. Files are discovered automatically; no component edits or route registration are needed.

1. Place images under `public/images/projects/your-project/` (WebP preferred).
2. Copy an existing project JSON file and assign a unique `id` and URL `slug`.
3. Edit the title, summary, description, objectives, contributions, tools, process, results, lessons, category and sources.
4. Set `order` for display sequence and `featured` for homepage inclusion. Currently only Projects 1–3 are featured.
5. Set `hero` and `gallery` assets with relative paths, meaningful alt text, captions and original dimensions. Optional `small` is a smaller responsive image.
6. Rebuild. The project index, case-study page and static route are generated automatically.

Optional fields: `metrics` contains value/label pairs; `missing` lists content to finish in plum; `modules` provides module descriptions; `placeholder` renders an honest missing-image visual when `hero` is null. Empty unsupported sections are omitted.

Personal information and About paragraphs: `src/content/profile.ts`. Five supplied personal photos are included, with the labeled city portrait shared by Home and About. Add a GitHub URL to enable its icon.

Work experience: `src/content/experience.ts`; role images are assigned in `ExperienceCarousel.tsx`. Production Lead uses its labeled factory photo, Mechatronics Intern uses the RoBIM logo, and Robotic Fabrication Intern uses the labeled team photo.

Replace `public/resume.pdf` and regenerate `public/resume-page-1.webp` when updating the résumé. Experience is a dedicated résumé page with a high-resolution preview and PDF download.

The contact form is intentionally disabled until email delivery is configured. Google Forms setup was deferred by the owner; the direct email link works.

Project 1 still needs technical writing. Actuator measured performance data and an optional GitHub URL remain outstanding. December 2026 role end dates are labeled as planned.

## GitHub Pages

No backend or paid hosting is needed. No GitHub username is hardcoded.

1. Create a public repository, preferably `kmpare-rgb.github.io`, and put this folder’s contents at its root (include `.github/`). Do not commit `node_modules`, `.pnpm-store` or `dist`.
2. Push to `main`.
3. In repository Settings → Pages → Build and deployment, choose **GitHub Actions**.
4. Run the included Deploy portfolio to GitHub Pages workflow (or push a new commit).

The workflow obtains the base path and final site URL from GitHub Pages, installs from `package-lock.json`, builds, uploads `dist` and deploys. Project repositories such as `kmpare-rgb.github.io/portfolio/` work too. The workflow may need to be rerun after enabling Pages for the first time.

For custom local builds set `VITE_BASE_PATH` (for example `/portfolio/`) and `SITE_URL` (for example `https://kmpare-rgb.github.io/portfolio`) before running `npm run build`. `SITE_URL` is the full site root including any repository path, without a trailing slash. The build emits unique titles, descriptions, Open Graph metadata, canonical links, sitemap and robots file when `SITE_URL` is set. Without it, no fabricated canonical domain or sitemap is emitted.

Each project gets a real `projects/SLUG/index.html` file. Direct navigation and browser refresh therefore work on static hosting without rewrites or hash routing. Unknown routes render a 404 page.

## Motion and accessibility

Both carousels move continuously, independently of page scrolling, with seamless looping. Hovering an image eases speed to 18% and leaving restores normal speed. Previous/next controls remain; there is no pause button. Reduced-motion preferences disable automatic movement. Hidden/offscreen carousels do not advance.

Navigation and gallery controls support keyboards; Escape closes a gallery image. The header contracts from full width into a centered pill on scroll.

## Build notes

The provided build is locally generated, not published to an account. A Windows-specific Node realpath issue in the authoring environment required a local compatibility shim for dependency installation; that shim is not needed or included for normal Node installations or GitHub Actions.

## Publishing updates

Repository: https://github.com/kmpare-rgb/kmpare-rgb.github.io

Website: https://kmpare-rgb.github.io/

Edit the source files, then run `npm install` and `npm run build`. Commit the changes and push to `main`:

```sh
git add .
git commit -m "Update portfolio"
git push origin main
```

The Deploy portfolio to GitHub Pages workflow builds and publishes automatically. Follow its progress in the repository Actions tab. Do not upload `dist` or `node_modules`; GitHub builds from the source. The contact form remains disabled until its deferred email-delivery setup is completed.
