# Picpong mockup v6

Static HTML/CSS/JS mockup for the Picpong website redesign - client review, not a production app.

## Live site

**https://picpong-mockup.web.app**

Deployed via Firebase Hosting (`firebase.json` `public: "mockup-v6"`).

## Pages

- `index.html` - home / "alive collage" landing
- `catalog.html` - product catalog
- `product.html` - product detail
- `projects.html` / `project-detail.html` - portfolio
- `accessibility.html`, `privacy.html`, `404.html` - chrome
- `backoffice/` - sales-support/spec UI mockup (mock auth, localStorage demo data, English chrome; URL-only access)

## Local preview

```bash
npm run serve    # Firebase Hosting emulator, serves the dir set in firebase.json
```

Or open any `*.html` directly in a browser - there is no build step, framework, or dependency.

## Deploy

```bash
npm run deploy   # firebase deploy --only hosting  (project: picpong-mockup)
```
