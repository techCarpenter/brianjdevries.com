# Capture Worker

This Worker powers `/capture/` by accepting authenticated image uploads, storing images in R2, and optionally committing quick notes to GitHub.

## One-Time Setup

1. Replace `TODO_REPLACE_WITH_R2_BUCKET_NAME` in `wrangler.jsonc` with the existing R2 bucket name that serves `https://assets.vries.land`.
2. In GitHub repository secrets, add:
   - `CLOUDFLARE_API_TOKEN`
   - `CLOUDFLARE_ACCOUNT_ID`
   - `CAPTURE_UPLOAD_TOKEN`
   - `CAPTURE_GITHUB_TOKEN`
3. Run the `Deploy Capture Worker` GitHub Action manually once, or push a change under `workers/`.

`CAPTURE_GITHUB_TOKEN` should have the narrowest repo contents write access available for `techcarpenter/brianjdevries.com`.

`CAPTURE_UPLOAD_TOKEN` is the bearer token you save in the `/capture/` page.

## Local Wrangler Commands

From the `workers/` directory:

```sh
npx wrangler dev
npx wrangler deploy
```

Use `.dev.vars` for local-only secrets. Do not commit `.dev.vars`.
