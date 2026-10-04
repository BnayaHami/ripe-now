# Changelog

## 1.0.2 · 2026-10-04
- Calendar: the calendar now fits phone screens without horizontal scrolling. Crop names that contain a dash (the two black elder entries) are shown on two lines.
- README: documented that the Facebook search link does not work on phones.

## 1.0.1 · 2026-10-04
- Illustrations moved to an `images/` folder; `img` paths in `data.js` and the service worker cache list updated.
- Fixed illustrations that did not appear on GitHub Pages: the paths in `data.js` now match the real file names exactly, including capitalization.
- README: roadmap and publishing placeholders removed, real repository details filled in. Contributing guide simplified.

## 1.0.0 · 2026-10-03
First public release.

- 20 crops, including myrtle (הדס) and pine nuts (צנוברים).
- Season ranges and likely regions re-researched against public sources. Each crop now shows a confidence rating, its sources and a practical note (protection status, garden-only plants, sources that disagree).
- PWA: web manifest, icons, service worker with offline support and automatic updates.
- Map attribution now credits OpenStreetMap and Natural Earth.
- Bilingual README (English and Hebrew) and full documentation in `docs/`.

## Development history (pre-release, summarized)

- v1–v14: Hebrew RTL interface, pastel botanical design with author's illustrations, calendar and PNG export, `.ics` reminders, puzzle-style regional map from OpenStreetMap and Natural Earth data, iNaturalist observations and summaries, region polish for Judea and Samaria.
