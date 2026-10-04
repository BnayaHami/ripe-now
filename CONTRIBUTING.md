# Contributing / תרומה לפרויקט

Thank you for helping make the data more accurate. The most valuable contribution is a **correction with a source**.

תודה שאתם עוזרים לדייק את הנתונים. התרומה החשובה ביותר היא תיקון **עם מקור**.

## Reporting a data mistake / דיווח על טעות בנתונים

Open an issue and include:

1. The crop (Hebrew name or `id`).
2. What is wrong: season months, peak, a region, a note.
3. What it should be, with a **source** (link, book, or a dated field observation with place and photo).

Examples of good evidence: Flora of Israel Online, KKL's wild-flower database, a Plants Board report, an iNaturalist observation link with date and location, your own dated record.

## Pull requests

1. Fork, create a branch.
2. Edit `data.js` following [docs/DATA-SCHEMA.md](docs/DATA-SCHEMA.md). Lower `conf` if sources disagree and explain in `note`.
3. Run the validation script from the schema document.
4. Update [docs/DATA-SOURCES.md](docs/DATA-SOURCES.md) and [CHANGELOG.md](CHANGELOG.md), and bump `VERSION` in `sw.js`.
5. Open the pull request and describe the evidence.

## Code changes

Keep the project dependency-free and build-free: plain HTML, CSS and JavaScript, single `index.html`. Hebrew UI text must stay in Hebrew and right-to-left. Do not change the map style without discussion. If you change the map geometry logic, bump the cache key `isr-v5`.

## Conduct

Be kind and factual. Do not post advice that encourages picking protected plants or trespassing. Safety first: never recommend eating a plant that cannot be identified with certainty.
