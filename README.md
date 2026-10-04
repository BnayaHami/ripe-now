# עכשיו בעונה · Ripe Now, Israel 🌿

**English** · [עברית](README.he.md)

A mobile-first, installable web app (PWA, Hebrew, right-to-left) that tracks what is in season in Israel: wild and cultivated fruits, flowers and plants for people who make liqueurs, ferments, pickles and preserves (sumac, unripe green plums, katlav, olives, elderflower and more). It tells you what is ripe now, what starts soon, where in Israel you are most likely to find it, and gives you a calendar reminder so you are ready with jars and salt in time.

> **Live app:** `https://BnayaHami.github.io/ripe-now/` (replace after publishing)
> **Version:** 1.0.0 · **License:** MIT for the code (see [License](#license))

<!-- Add screenshots to docs/screenshots/ and uncomment:
![Now tab](docs/screenshots/now.png) ![Calendar](docs/screenshots/calendar.png) ![Map](docs/screenshots/map.png)
-->

## Features

| Tab / feature | What it does |
|---|---|
| **Now** (עכשיו) | All 20 crops in three groups: *in season now* (peak first), *starting soon* (within two months) and *later this year*. |
| **Calendar** | A 12-month strip per crop, shaded early / peak / late, with the crop's illustration. One button exports the whole calendar as a PNG image. |
| **Map** | A puzzle-style map of Israel, Judea & Samaria, the Gaza Strip and the Golan. Purple regions mark where a crop is *very likely* or *possible*; green dots are real iNaturalist observations (last 5 years, or the latest season only). Hebrew city labels, relief basemap. |
| **Crop sheet** | Peak months, uses, preparation checklist, likely regions, a practical note and legal caveats, a confidence rating, the sources, and a live observation summary from iNaturalist. |
| **Yearly reminder** | Downloads an `.ics` calendar event (all day, yearly, 14 days before the season starts) with the preparation list in the description. |
| **Links** | Google search for recipes and a Facebook posts search for each crop. |
| **PWA** | Installable to the home screen, works offline for the list, calendar and crop sheets, and updates itself when online. |

## Quick start

No build step, no dependencies to install. You only need a static file server (a service worker and the image export need `http://localhost` or `https`, not `file://`).

```bash
git clone https://github.com/BnayaHami/ripe-now.git
cd ripe-now
python -m http.server 8000      # or: npx serve .
# open http://localhost:8000
```

Windows PowerShell works the same way. While developing, open DevTools (F12) → Network → tick **Disable cache** (and *Application → Service Workers → Bypass for network*) so you always see your latest edits.

## Install as an app (PWA)

- **Android / Chrome:** menu → *Install app* / *Add to Home screen*.
- **iPhone / Safari:** Share → *Add to Home Screen*.
- **Desktop Chrome / Edge:** install icon in the address bar.

Offline behaviour: after the first visit the interface, data and illustrations work without a connection. The map basemap tiles you viewed are cached (up to 400). iNaturalist observations and the first-time map outline need a connection (the outline is then cached in the browser).

## Project structure

```
index.html              UI, styles and application logic (single file)
data.js                 the crop dataset (seasons, regions, sources, notes)
sw.js                   service worker (offline cache)
manifest.webmanifest    PWA manifest
icons/                  app icons (192, 512, maskable, apple-touch, favicon)
*.png                   crop illustrations (same folder as index.html)
docs/                   detailed documentation (see below)
```

## Documentation

| Document | Contents |
|---|---|
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | How the app works: season model, map pipeline, iNaturalist queries, reminders, PWA, design system. |
| [docs/DATA-SCHEMA.md](docs/DATA-SCHEMA.md) | The `data.js` format, region keys, and how to add or edit a crop. |
| [docs/DATA-SOURCES.md](docs/DATA-SOURCES.md) | Per-crop table, how values were chosen, confidence levels, known weak points. |
| [docs/DEPLOY.md](docs/DEPLOY.md) | Publishing to GitHub Pages, releasing updates, PWA checks, troubleshooting. |
| [CONTRIBUTING.md](CONTRIBUTING.md) | How to report data mistakes and contribute. |
| [CHANGELOG.md](CHANGELOG.md) | Version history. |

## About the data (please read)

Seasons and regions were **compiled from public sources** (KKL's wild-flower database, Flora of Israel Online, Hebrew Wikipedia, the Plants Board, the Fruit Growers' Organization, foraging and gardening sites) and have **not been verified in the field**. Each crop shows a confidence rating and its sources. The weakest entries are jujube, pine nuts, passion fruit and elderberries. Details: [docs/DATA-SOURCES.md](docs/DATA-SOURCES.md).

**Safety and law.** Several plants are protected in the wild in Israel (for example myrtle, wild almond, katlav trees and carob in natural habitats). Respect nature reserves and private land, and ask permission. Never eat a plant you cannot identify with certainty. Elderberries must be cooked; fig sap irritates the skin. This app is an information tool, not a field guide or professional advice.

## Credits and data licenses

- **Basemap tiles:** Esri World Shaded Relief (© Esri and contributors). Check [Esri's terms](https://www.esri.com/en-us/legal/terms/full-master-agreement) for your expected traffic, or swap the tile layer in `index.html`.
- **Country outline:** © [OpenStreetMap](https://www.openstreetmap.org/copyright) contributors (ODbL), fetched at runtime from Nominatim and cached in the visitor's browser; combined with [Natural Earth](https://www.naturalearthdata.com/) land data (public domain) via `world-atlas`.
- **Observations:** [iNaturalist](https://www.inaturalist.org/) community observations through its public API. Observers keep the rights to their photos; the app shows only counts and locations.
- **Libraries (CDN):** [Leaflet](https://leafletjs.com/) 1.9.4, [Turf.js](https://turfjs.org/) 6.5.0, [topojson-client](https://github.com/topojson/topojson-client) 3.1.0.
- **Fonts:** Suez One and Secular One (Google Fonts, SIL OFL).
- **Illustrations:** original watercolor-style artwork by the project author (see License).

## Roadmap

1. A script that computes real peak months per crop from iNaturalist observation histograms.
2. A personal foraging log (local to the device).
3. Curated recipe links instead of search queries.
4. A per-crop `src` review with field-verified dates, and finer regions (separate Judean and Jerusalem hills).
5. Optional push-style reminders.

## License

- **Code** (`index.html`, `sw.js`, `data.js` structure, docs): [MIT](LICENSE).
- **Illustrations** (`*.png`) and the **curated data values**: © the project author. Please ask before reusing the artwork. *(Change this section if you prefer a different license, for example CC BY-NC 4.0 for the artwork.)*

Built with the help of an AI assistant (Claude by Anthropic) for code and research, and reviewed by the author.
