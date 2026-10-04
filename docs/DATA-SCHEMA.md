# Data schema (`data.js`)

`data.js` defines one global, `window.CROPS`, an array of crop objects. The app reads it at load time; there is no database.

## Example

```js
{
  id: "sumac",
  he: "סומק",
  img: "images/Watercolor_Red_Berry_Botanical_Sprig.png",
  col: "#d98a8a",
  s: [8, 11],            // season: August to November
  p: [9, 10],            // peak: September to October (must be inside s)
  use: "תבלין מיובש, חומץ בטעם סומק, סירופ",
  prep: "מגשי ייבוש או מייבש, שקיות בד, כפפות",
  z: { ca: 2, gt: 2, ju: 2, ge: 2, sa: 2, go: 1, sh: 1, sp: 1 },
  inat: "Rhus coriaria",
  conf: 3,
  src: "צמח השדה (קק״ל), ויקיפדיה, נאות קדומים, זרעים מציון",
  note: "גדל בחורש ובהרים, לא בעמקים ובמדבר. ..."
}
```

## Fields

| Field | Type | Required | Meaning |
|---|---|---|---|
| `id` | string | yes | Unique, lowercase, hyphenated. Used for map selection and the `.ics` UID. |
| `he` | string | yes | Hebrew display name. A name with " – " is split into two lines in the PNG export (used for the two elder entries). |
| `img` | string | yes | Path of the illustration inside the `images/` folder, for example `images/Mulberry_Sprig_in_Bloom.png`. **Case-sensitive** on GitHub Pages. |
| `col` | string | yes | Fallback color (`#rrggbb`) if the image is missing. |
| `s` | `[m1, m2]` | yes | Season, months 1–12 (1 = January). `m1 <= m2`. Cannot wrap over the new year. |
| `p` | `[m1, m2]` | yes | Peak, inside `s`. |
| `use` | string | yes | Typical uses, comma separated, shown on the card and sheet. |
| `prep` | string | yes | Preparation checklist. Also becomes the description of the `.ics` reminder. |
| `z` | object | yes | Region likelihood: `{ regionKey: 2 \| 1 }`. `2` very likely (strong purple, listed in the sheet), `1` possible (light purple). Absent regions are drawn as outline only. |
| `inat` | string | yes | Scientific name used for iNaturalist (`taxon_name`). Genus alone works (`"Morus"`). |
| `term` | number | no | `13` for flowers. Default is fruit (`14`). Affects the annotated-observations query. |
| `q` | string | no | Custom search term for recipes and Facebook (for example `"זיתים"` for olive). Default is the first word of `he`. |
| `conf` | `1 \| 2 \| 3` | yes | Confidence in the season months: 3 high, 2 medium, 1 low. Shown in the sheet. |
| `src` | string | yes | Short list of sources, shown in the sheet. |
| `note` | string | no | Practical note, caveats, protection status. Shown as "שימו לב". |

## Region keys

| Key | Region | Key | Region |
|---|---|---|---|
| `ge` | Upper Galilee (גליל עליון) | `ju` | Judean & Jerusalem hills |
| `go` | Golan (גולן) | `sh` | Shfela (שפלה) |
| `gt` | Lower Galilee (גליל תחתון) | `gz` | Gaza Strip |
| `ca` | Carmel (כרמל) | `ds` | Judean Desert & Dead Sea |
| `jz` | Jezreel Valley (עמק יזרעאל) | `ng` | Negev (הנגב) |
| `sp` | Sharon (שרון) | `ar` | Arava & Eilat |
| `sa` | Samaria (שומרון) | `jv` | Jordan Valley (בקעת הירדן) |

Region seed points and names live in the `ZONES` constant in `index.html`. To add a region you must add it there (name and one or more `[lat, lng]` seeds) and bump the geometry cache key (see ARCHITECTURE.md §4.2).

## Adding a crop

1. Add the illustration PNG to the `images/` folder (a transparent or cream background looks best; around 600 px is plenty).
2. Append an object to `window.CROPS` in `data.js` with every required field.
3. Add the PNG path (`images/<name>.png`) to `CORE_FILES` in `sw.js` (optional but recommended for offline use).
4. Bump `VERSION` in `sw.js` and the `?v=` query on `data.js` in `index.html`.
5. Open the app, check the console for a warning (`p` outside `s`), the calendar row, the sheet and the map.

## Editing rules of thumb

- Hebrew names the project uses on purpose: **סברס** (not צבר) for the fruit, **פיטנגו** (not פיטנגה). Olive recipe searches use **זיתים**.
- Prefer a lower `conf` over a confident guess. State disagreement between sources in `note`.
- For protected or garden-only plants, say so in `note` and point to gardens or orchards.
- Keep `note` to two or three sentences; it appears on a phone screen.

## Quick validation script

Paste in a terminal from the project folder (Node 18+):

```bash
node -e "
global.window={};eval(require('fs').readFileSync('data.js','utf8'));
const Z=new Set('ge go gt ca jz sp sa jv ju sh gz ds ng ar'.split(' '));
const ids=new Set();
window.CROPS.forEach(c=>{
  if(ids.has(c.id))console.log('duplicate id',c.id);ids.add(c.id);
  if(c.s[0]>c.s[1]||c.p[0]<c.s[0]||c.p[1]>c.s[1])console.log('bad range',c.id);
  Object.keys(c.z).forEach(k=>{if(!Z.has(k))console.log('bad zone',c.id,k)});
  ['he','img','col','use','prep','inat','src'].forEach(f=>{if(!c[f])console.log('missing',f,c.id)});
  if(![1,2,3].includes(c.conf))console.log('bad conf',c.id);
});
console.log(window.CROPS.length,'crops checked');"
```
