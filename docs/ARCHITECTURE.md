# Website Architecture

This document is internal repo documentation. It is intentionally stored outside `src/`, and `docs/**` is also listed in `.eleventyignore`, so Eleventy should not publish it as website content.

## High-Level Shape

`brianjdevries.com` is a static Eleventy site with a small authenticated capture workflow for quick notes and images.

The main pieces are:

- Eleventy builds public site files from `src/` into `dist/`.
- Netlify hosts the generated static site.
- `/capture/` is a browser-based posting tool served by the static site.
- A Cloudflare Worker receives authenticated uploads/posts from `/capture/`.
- Cloudflare R2 stores uploaded images served from `https://assets.vries.land`.
- The Worker commits new note Markdown files back to GitHub, which triggers the normal site rebuild/deploy flow.

## Eleventy Site

Eleventy is configured in `eleventy.config.js`.

Important settings:

- `dir.input` is `src`.
- `dir.output` is `dist`.
- `markdownTemplateEngine` is `njk`.
- `src/static` is copied through to the site root.
- Markdown uses a shared `markdown-it` renderer that adds `loading="lazy"` and `decoding="async"` to Markdown images.

Because the input directory is `src`, repo-level docs such as this file are not part of the public website build.

## Content Types

Top-level pages live directly under `src/` as `.md` or `.njk` files and usually use `page.njk`.

Blog posts:

- Live in `src/blog/*.md`.
- Use `src/blog/blog.11tydata.js`.
- Render with `article.njk`.
- Are collected through the custom `blog` collection.

Notes:

- Live in `src/notes/*.md`.
- Use `src/notes/notes.11tydata.js`.
- Render with `notePage.njk`.
- Are collected through the custom `notes` collection.
- Use UTC timestamp permalinks like `/notes/20260603182233/`.

Shared note rendering is centralized in `src/_includes/macros/note.njk`.

## Notes Rendering

The note macro accepts:

- rendered note content
- note URL
- note date
- optional `images` frontmatter list

The current preferred generated note format is:

```md
---
date: 2026-06-03T18:22:33.000Z
images:
  - url: "https://assets.vries.land/photos/2026/06/example.webp"
    alt: "Example image alt text"
---

Note text goes here.
```

The macro renders `images` separately from the note body so CSS can control media display independently from the note text.

Older notes may still contain Markdown image syntax in the body. Those images are still supported, lazy-loaded by the Markdown renderer, and enhanced by the note image viewer script.

## Note Images

Note image behavior is split across:

- `src/_includes/macros/note.njk` for frontmatter image markup
- `src/static/styles/base.css` for note image layout, media grid, inspectable overlay, and modal styling
- `src/static/scripts/note-images.js` for click/tap-to-enlarge behavior

Default feed images are constrained with a max height so tall photos do not dominate the notes page. Visitors can click or tap images to inspect them in a larger overlay.

## Capture Page

The `/capture/` page lives at `src/capture.njk` and is marked with:

```yaml
permalink: /capture/
eleventyExcludeFromCollections: true
showNewsletterForm: false
```

It also injects:

```html
<meta name="robots" content="noindex, nofollow">
```

The browser-side workflow lives in `src/static/scripts/capture.js`.

The browser does most of the image work:

- chooses an image from the photo library or camera
- prepares/compresses the image client-side
- strips metadata by re-encoding through canvas
- keeps normal images under roughly 1 MB where possible
- previews the image before posting
- stores Worker endpoint/token settings in browser storage for personal devices

The capture form can:

- upload an image to R2
- post a note with text only
- post a note with text plus an image
- reset the form
- forget saved upload settings

## Capture Worker

The Worker lives in `workers/r2-image-upload-worker.js`.

It handles authenticated `POST` requests only.

Main responsibilities:

- verify the bearer token against `env.UPLOAD_TOKEN`
- accept multipart form data
- upload prepared images to the bound R2 bucket
- optionally create a note Markdown file
- commit that note file to GitHub
- roll back the R2 upload if the GitHub commit fails

The Worker expects already-prepared images from the browser. It validates type and file size, but it does not do heavy image processing.

## Worker Configuration

Worker config lives in `workers/wrangler.jsonc`.

Important bindings and vars:

- `IMAGE_BUCKET`: R2 bucket binding
- `ASSET_BASE_URL`: public asset base URL
- `GITHUB_OWNER`: GitHub owner
- `GITHUB_REPO`: GitHub repo
- `GITHUB_BRANCH`: target branch for note commits
- `ALLOWED_ORIGINS`: allowed CORS origins

Required Worker secrets:

- `UPLOAD_TOKEN`
- `GITHUB_TOKEN`

In GitHub Actions, repository secrets are mapped to Worker secret names:

- `CAPTURE_UPLOAD_TOKEN` -> `UPLOAD_TOKEN`
- `CAPTURE_GITHUB_TOKEN` -> `GITHUB_TOKEN`

## Deployments

Site deployment:

- Normal site changes build and deploy through Netlify.
- New notes committed by the Worker trigger the usual GitHub-to-Netlify flow.

Worker deployment:

- Configured in `.github/workflows/deploy-capture-worker.yml`.
- Runs on manual dispatch or pushes to `main` that change the workflow or `workers/**`.
- Uses `cloudflare/wrangler-action`.

Required GitHub repository secrets:

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`
- `CAPTURE_UPLOAD_TOKEN`
- `CAPTURE_GITHUB_TOKEN`

## Security Model

`/capture/` is not meant to be a public CMS.

Current practical security model:

- The page is public but marked `noindex`.
- The Worker requires a bearer token.
- The token is saved only in the browser on personal devices.
- The Worker token should be rotated if a device is lost or the token might be exposed.
- The GitHub token should have the narrowest repo contents write permissions available.

The main accepted risk is that a personal-device browser stores upload credentials. This is convenient for the solo workflow, but it should not be used on shared devices.

## Local Development

Useful commands:

```sh
ELEVENTY_ENV=development ./node_modules/.bin/eleventy --quiet
ELEVENTY_ENV=production ./node_modules/.bin/eleventy
```

Worker commands from `workers/`:

```sh
npx wrangler dev
npx wrangler deploy
```

Use `workers/.dev.vars` for local Worker secrets. Do not commit it.

## Future Notes

Likely future improvements:

- Add recent notes to `/now/`.
- Add pagination or archive slicing if `/notes/` becomes too image-heavy.
- Expand note frontmatter to support multiple images from `/capture/`.
- Consider short-lived Worker sessions or a stricter auth flow if the capture page ever needs to be used beyond personal devices.
