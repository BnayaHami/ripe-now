# Deploying to GitHub Pages

The app is static, so any static host works. These steps use GitHub Pages (free, https included, which the PWA needs).

## 1. Prepare the folder

Your project folder must contain, side by side:

```
index.html  data.js  sw.js  manifest.webmanifest  icons/  README.md  README.he.md
LICENSE  CHANGELOG.md  CONTRIBUTING.md  docs/  .gitignore  .nojekyll
images/   (all 20 illustration PNG files)
```

Check that every `img` path in `data.js` points to a file in `images/` with **exactly** the same capitalization (GitHub Pages is case-sensitive; Windows is not, so a typo can work locally and break online).

```powershell
# from the project folder: list images that data.js expects but are missing in images/
node -e "global.window={};eval(require('fs').readFileSync('data.js','utf8'));const fs=require('fs'),p=require('path');const have=fs.readdirSync('images');window.CROPS.forEach(c=>{if(!have.includes(p.basename(c.img)))console.log('MISSING',c.img)});console.log('done')"
```

The `node -e` check compares exact names, so it also catches capitalization mistakes.

## 2. Create the repository and push

Create an empty repository on GitHub (no README, no license, since the project already has them), then:

```powershell
git init
git add .
git commit -m "Release 1.0.1"
git branch -M main
git remote add origin https://github.com/BnayaHami/ripe-now.git
git push -u origin main
```

## 3. Turn on GitHub Pages

Repository → **Settings** → **Pages** → *Build and deployment* → Source: **Deploy from a branch** → Branch: `main`, folder `/ (root)` → Save. After a minute the site is live at `https://bnayahami.github.io/ripe-now/`.

Put that address in the README ("Live app") and in the repository description. Add topics such as `pwa`, `israel`, `foraging`, `hebrew`, `leaflet`, `inaturalist`.

## 4. Check the PWA

Open the live site in Chrome, then DevTools (F12):

- **Application → Manifest**: no errors, icons visible, "Installable".
- **Application → Service Workers**: `sw.js` is *activated and running*.
- **Network → Offline** (tick), reload: the list, calendar and crop sheets still open.
- **Lighthouse → Progressive Web App** (or the *Installability* audit) passes.

On a phone: open the address, install (see README), open from the home screen, switch to airplane mode, and confirm the app opens.

## 5. Releasing an update

1. Edit files. If you changed `data.js`, update `docs/DATA-SOURCES.md` too.
2. Bump the version in these places: `VERSION` in `sw.js`, the `?v=` query on `data.js` in `index.html`, the visible label at the bottom of the first tab, `CHANGELOG.md`, and the README version line.
3. If you changed the map geometry logic, also bump the cache key `isr-v5` in `index.html`.
4. Commit, push. Pages redeploys in about a minute.

Because `index.html` and `data.js` are served *network first*, returning visitors get the new version on their next online load. The new service worker installs in the background and takes over the next time the app is opened.

## 6. Custom domain (optional)

Settings → Pages → *Custom domain*, then add the DNS records GitHub lists. Keep **Enforce HTTPS** on. Because all paths are relative, nothing in the app needs to change.

## 7. Usage limits to be aware of

| Service | Used for | Note |
|---|---|---|
| Esri World Shaded Relief tiles | Map basemap | Free for light public use with attribution; for high traffic read Esri's terms or switch tile source. |
| Nominatim (OpenStreetMap) | Country outline, once per visitor then cached | Policy: maximum 1 request per second, identify the app; heavy use should self-host. |
| iNaturalist API | Observation dots and summaries | Public, rate limited (roughly 100 requests per minute per IP is the documented guideline). |
| CDNs (cdnjs, jsDelivr, Google Fonts) | Libraries and fonts | Cached by the service worker. |

## 8. Troubleshooting

| Symptom | Likely cause and fix |
|---|---|
| I don't see my changes | Browser or service-worker cache. DevTools → Application → Service Workers → *Unregister*, then hard refresh (Ctrl+Shift+R). While developing tick *Bypass for network* / *Disable cache*. |
| Illustration missing online but fine locally | Capitalization or extension mismatch in `img`, or the file is not inside `images/`. |
| Map outline looks wrong or old | Clear site data, or bump `isr-v5` after changing geometry logic. Check Console and Network for Nominatim and `land-10m.json` errors. |
| "Cannot create image" on calendar export | The page is opened from `file://`. Use localhost or the https site. |
| Not offered as installable | Not served over https, manifest error, or missing icons. See step 4. |
| Observation dots missing | iNaturalist unreachable or rate limited; try again later. The rest of the app still works. |
