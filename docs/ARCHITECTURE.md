# Architecture

"Ripe Now" is a static site with **no build step and no backend**. Everything runs in the browser. This document explains how each part works so you can change it safely.

## 1. Files and responsibilities

| File | Role |
|---|---|
| `index.html` | Markup, CSS and all application JavaScript (one file, one inline `<script>` at the end). |
| `data.js` | Defines `window.CROPS`, the dataset. Loaded before the app script as `data.js?v=<version>`. |
| `sw.js` | Service worker: offline cache and update strategy. |
| `manifest.webmanifest` | PWA metadata (name, icons, colors, display mode). |
| `icons/` | App icons: 192, 512, maskable 512, apple-touch 180, favicon 32. |
| `images/` | Crop illustrations, referenced by the `img` path of each crop. File names are case-sensitive on GitHub Pages. |

External libraries are loaded from CDNs: Leaflet 1.9.4 (cdnjs), Turf.js 6.5.0 and topojson-client 3.1.0 (jsDelivr). Fonts: Google Fonts "Suez One" (headings) and "Secular One" (body). Both have a single weight, so `<b>` is set to `font-weight: 400`.

## 2. Application structure

The page has three `<section>` tabs (now / calendar / map) switched by `tab(t)`, and one `<dialog id="dlg">` used as the crop sheet. Main functions:

| Function | Purpose |
|---|---|
| `st(c, m)` | Status of crop `c` in month `m` (1–12): `"peak"`, `"early"`, `"late"` or `""`. |
| `art(c)` | Returns the illustration markup, or a colored circle (`c.col`) if the image is missing. |
| `item(...)`, `fill()` | Build the "Now" tab groups and the calendar strips. |
| `sheet(c)` | Opens the crop dialog (peak, uses, prep, regions, note, confidence, sources, buttons). |
| `evidence(c)` | Fetches and renders the iNaturalist summary line. |
| `ics(c)` | Generates and downloads the yearly reminder. |
| `tab(t)`, `init()` | Tab switching; lazy creation of the Leaflet map on first visit. |
| `israel()`, `land()`, `holeless(g)`, `puzzle(isr)` | Build the country shape and the region puzzle (section 4). |
| `draw(kv)` | Draws regions and observation dots for the selected crop. |
| `lastSeason(c)` | Start and end dates of the crop's most recent season (for the "latest season only" filter). |
| `fd(d)`, `rr()` | Date formatting; rounded-rectangle helper for the PNG export. |
| `shot()` | Exports the calendar as a 1500 px wide PNG using a canvas. |

## 3. Season model

Each crop has two ranges in `data.js`:

- `s = [start, end]`: the whole season.
- `p = [start, end]`: the peak, which must lie inside `s`.

Months before the peak are **early**, months after it are **late**. They are derived, never stored, so the order is always early, peak, late. A console warning is printed if `p` is outside `s`. Ranges do not wrap around the new year (a season from November to February must be split or cut at December).

The pages are right-to-left, so January is on the **right** and months flow right to left. The calendar shows a note about this.

On the "Now" tab, `st(c, currentMonth)` decides the group:

1. *In season now*: status is peak/early/late (peak sorted first).
2. *Starting soon*: season starts within the next two months.
3. *Later this year*: everything else, with a "in N months" or "next month" tag.

Out-of-season months and tags are light grey (`#E3E0DA` cells, `#E7E4DD` tags).

## 4. The map

### 4.1 Basemap and labels
Leaflet map centered on `[31.5, 35.0]`, zoom 7. Tiles: Esri `World_Shaded_Relief` (relief only, no borders or labels), max zoom 13. Hebrew city labels are permanent tooltips on small circle markers, so no foreign-language labels appear.

### 4.2 Country shape (built at runtime, cached)
The outline covers Israel, Judea & Samaria, the Gaza Strip and the Golan as one solid area without sea:

1. **OSM relations** via Nominatim `lookup?osm_ids=R1473946,R1703814` (Israel and Palestine), size-checked by bounding box; fallback text searches.
2. **Union** with two hand-drawn polygons: `GOLAN` and `WB` (West Bank). OSM's Palestine relation contains only the enclaves (areas A/B), leaving open land empty and the area looking shattered, so `WB` fills it. Its eastern edge (Jordan River and Dead Sea west shore) is approximate.
3. `holeless(g)`: removes holes and parts smaller than 2 km², dissolves overlaps by union, keeps the outer rings.
4. **Sea removal**: intersect with Natural Earth 10 m land (`world-atlas@2/land-10m.json`, clipped to `[33, 28.3, 37, 34]`). If the file fails to load, a hand-drawn `COAST` polygon is used.
5. The result is stored in `localStorage` under the key **`isr-v5`**. **Bump the key** (for example `isr-v6`) whenever you change any of the geometry logic, otherwise visitors keep the old cached shape.

### 4.3 Region puzzle
Each region in `ZONES` has one or more seed points `[lat, lng]`. A Voronoi diagram (`turf.voronoi`, bbox `[30, 25, 40, 36]`) is computed from all seeds, cells of the same region are merged, and the merged shapes are intersected with the country shape. Per crop, pieces with `z = 2` get a strong purple fill (opacity 0.5), `z = 1` a light purple (0.22), and all others a thin outline only. Layer toggles: regions (`tz`), observations (`to`), latest season only (`tl`).

Region keys: `ge` Upper Galilee, `go` Golan, `gt` Lower Galilee, `ca` Carmel, `jz` Jezreel Valley, `sp` Sharon, `sa` Samaria, `jv` Jordan Valley, `ju` Judean & Jerusalem hills, `sh` Shfela, `gz` Gaza Strip, `ds` Judean Desert & Dead Sea, `ng` Negev, `ar` Arava & Eilat.

### 4.4 Observation dots
iNaturalist API v1, `place_id=6815` (Israel), `per_page=200`, `order_by=observed_on`, `order=desc`. Default window: the last five years (`d1` = today minus 5 years). With "latest season only", `d1`/`d2` come from `lastSeason(c)` (first day of the `s[0]` month to the last day of the `s[1]` month, capped at today; if this year's season has not started, last year's season). Toggling keeps the current zoom.

## 5. Observation summary in the crop sheet

`evidence(c)` calls `observations/histogram` with `interval=month_of_year`:

- **Annotated** observations: `term_id=12, term_value_id=14` (fruit) or `term_value_id=13` (flowers, used when the crop has `term: 13`). Shown if there are at least **5**.
- Otherwise it falls back to **all** observations by month and says so. These include photos of trees without fruit, so it is only a rough guide.

Reason for both: annotated counts are tiny compared with the dots on the map, which confused early testers.

The API is public and rate-limited. The app makes a small number of requests per crop opened and never sends personal data.

## 6. Reminders (`.ics`)

`ics(c)` builds an iCalendar file with one all-day `VEVENT`, `RRULE:FREQ=YEARLY`, starting 14 days before the first day of month `s[0]`, with the crop's `prep` text as description. It is a calendar event, not a push notification, so alerts depend on the phone's calendar settings.

## 7. Calendar image export

`shot()` draws a 1500 px wide canvas: header, month columns, one row per crop with its illustration, colored cells by status, legend. Names containing " – " (the two elder entries) are drawn on two lines. The canvas becomes "tainted" if the page is opened from `file://`, in which case an alert asks the user to use localhost or https.

## 8. PWA and offline behavior

- `manifest.webmanifest`: standalone display, RTL Hebrew, theme/background `#F6F0E4`, three icons (two "any", one maskable). All paths are **relative** so the app works under a GitHub Pages sub-path.
- `sw.js` is registered from `index.html` after load.

| Request | Strategy |
|---|---|
| `index.html`, `data.js`, manifest, navigations | Network first, cache fallback (updates appear immediately when online). |
| Other same-origin files (illustrations, icons) | Cache first (stale-while-revalidate). |
| CDN libraries and fonts | Stale-while-revalidate in a runtime cache. |
| Esri map tiles | Cache first, capped at 400 tiles. |
| iNaturalist, Nominatim | Not handled by the worker (network only). |

On install the worker pre-caches the shell and every illustration one by one (a missing image does not fail the install). Old caches are deleted on activate. **Bump `VERSION` in `sw.js` on every release**, and add new illustration paths to `CORE_FILES` (images are also cached on first use even if you forget).

## 9. Design system

- Palette: `--bg #F6F0E4`, `--paper #FFFBF2`, `--ink #4d4236`, `--mute #8a7d6b`, `--line #E6DAC4`, `--peak #A9C9A0`, `--early #DCE8D0`, `--late #F2D6B5`, `--accent #8a5fa3`.
- Map purple `#8a6bb0`, observation dots `#5E8C4A`, country outline `#6b5f4f`.
- Light theme only. Illustrations replace emoji; if an image is missing, a colored circle (`col`) appears on cards and the calendar thumbnail is hidden.

## 10. Privacy

No analytics, no cookies, no accounts. The browser stores only the cached country shape (`localStorage`, key `isr-v5`) and service-worker caches. Requests go to the tile server, CDNs, Nominatim (first visit) and iNaturalist, which see the visitor's IP address as any website would.

## 11. Known limitations

- The `WB` polygon's eastern edge is approximate. The map is an aid for planning, not a survey.
- Season and region data are compiled estimates (see [DATA-SOURCES.md](DATA-SOURCES.md)).
- Browser support: modern evergreen browsers (service workers, `<dialog>`, ES2017+). Safari on iOS supports installation through *Add to Home Screen* but limits background caching.
- Seasons cannot cross the new year.
