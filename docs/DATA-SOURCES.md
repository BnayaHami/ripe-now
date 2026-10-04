# Data sources and per-crop table

*Generated from `data.js` (data version 1.0.0, October 2026). If you change `data.js`, regenerate or edit this file by hand.*

All seasons and areas are **compiled from public sources, not measured by this project**. They were checked against sources in Hebrew and English, but they have **not been verified in the field**. Treat them as a well-grounded starting point. Please open an issue (or a pull request against `data.js`) with a source when you find a mistake.

## How the numbers were chosen

1. For every crop, at least two independent sources were compared where possible: the KKL "Wild flowers" database (*Tzemach HaSade*), *Flora of Israel Online* (Hebrew University), Hebrew Wikipedia, the Israeli Plants Production and Marketing Board, the Fruit Growers' Organization, municipal and nature-association pages, and well-known foraging writers.
2. **Season** (`s`) is the widest range in which sources report the fruit (or flower, for elder flowers) as ripe or collectable. **Peak** (`p`) is the part of that range on which most sources agree.
3. When sources disagree, the range was widened to include them and `conf` was lowered, so the uncertainty is visible in the app.
4. **Areas** come mostly from *Flora of Israel Online* distribution classes ("common", "frequent", "rare") for wild plants and from agricultural reports for cultivated ones. "Very likely" = `2`, "possible" = `1`.
5. Where a plant is protected in the wild or is only found in gardens and orchards, the app says so in the note.

Confidence scale: **High (3)** sources agree · **Medium (2)** sources partly disagree or give partial data · **Low (1)** sparse or contradictory data.

## Summary table

| # | ID | Hebrew | English | Scientific name | Season | Peak | Confidence | Very likely areas | Possible areas |
|---|---|---|---|---|---|---|---|---|---|
| 1 | `green-plum` | שזיף ירוק | Green plum | *Prunus cerasifera* | Apr–Jun | Apr–May | Medium | Upper Galilee, Golan | Lower Galilee, Judean & Jerusalem hills |
| 2 | `sumac` | סומק | Sumac | *Rhus coriaria* | Aug–Nov | Sep–Oct | High | Carmel, Lower Galilee, Judean & Jerusalem hills, Upper Galilee, Samaria | Golan, Shfela, Sharon |
| 3 | `katlav` | קטלב | Eastern strawberry tree (katlav) | *Arbutus andrachne* | Sep–Dec | Oct–Dec | Medium | Upper Galilee, Carmel, Judean & Jerusalem hills, Samaria | Lower Galilee, Golan, Shfela |
| 4 | `olive` | זית | Olive | *Olea europaea* | Sep–Dec | Oct–Nov | High | Lower Galilee, Samaria, Judean & Jerusalem hills, Upper Galilee | Carmel, Golan, Shfela, Jezreel Valley |
| 5 | `carob` | חרוב | Carob | *Ceratonia siliqua* | Jul–Oct | Aug–Sep | Medium | Carmel, Shfela, Lower Galilee, Upper Galilee, Samaria | Sharon, Judean & Jerusalem hills, Jordan Valley |
| 6 | `green-almond` | שקד ירוק | Green almond | *Prunus dulcis* | Mar–Jun | Apr–May | High | Upper Galilee, Judean & Jerusalem hills, Shfela | Lower Galilee, Samaria |
| 7 | `loquat` | שסק | Loquat | *Eriobotrya japonica* | Mar–Jun | Apr–May | High | Sharon, Carmel, Shfela | Samaria, Lower Galilee, Judean & Jerusalem hills, Upper Galilee |
| 8 | `mulberry` | תות עץ | Mulberry | *Morus* | Apr–Jun | Apr–May | High | Sharon, Shfela, Lower Galilee, Jezreel Valley | Carmel, Upper Galilee, Judean & Jerusalem hills, Samaria, Jordan Valley |
| 9 | `prickly-pear` | סברס | Prickly pear (sabres) | *Opuntia ficus-indica* | Jul–Oct | Aug–Sep | High | Sharon, Shfela, Judean & Jerusalem hills, Lower Galilee, Carmel | Samaria, Upper Galilee, Negev |
| 10 | `pomegranate` | רימון | Pomegranate | *Punica granatum* | Sep–Dec | Sep–Nov | High | Jordan Valley, Negev, Samaria, Jezreel Valley | Lower Galilee, Upper Galilee, Shfela, Judean & Jerusalem hills, Judean Desert & Dead Sea, Arava & Eilat |
| 11 | `elder-flower` | סמבוק שחור – פרחים | Black elder, flowers | *Sambucus nigra* | Mar–Jun | Apr–May | Medium | Golan | Upper Galilee |
| 12 | `elder-fruit` | סמבוק שחור – פירות | Black elder, berries | *Sambucus nigra* | Aug–Oct | Sep–Oct | Low | Golan | Upper Galilee |
| 13 | `pitanga` | פיטנגו | Pitanga (Surinam cherry) | *Eugenia uniflora* | Apr–Jul | May–Jun | Medium | Sharon, Shfela | Carmel |
| 14 | `passion-fruit` | פסיפלורה | Passion fruit | *Passiflora edulis* | Jun–Dec | Aug–Oct | Low | Sharon, Shfela | Carmel, Jezreel Valley, Jordan Valley |
| 15 | `pecan` | פקאן | Pecan | *Carya illinoinensis* | Oct–Dec | Oct–Nov | High | Upper Galilee, Jezreel Valley, Sharon, Shfela | Judean & Jerusalem hills, Lower Galilee |
| 16 | `fig` | תאנה | Fig | *Ficus carica* | Jun–Oct | Aug–Sep | High | Upper Galilee, Lower Galilee, Carmel, Samaria, Judean & Jerusalem hills, Shfela, Jordan Valley | Golan, Sharon, Jezreel Valley, Judean Desert & Dead Sea |
| 17 | `jujube` | שיזף | Jujube | *Ziziphus spina-christi* | Apr–Nov | Aug–Oct | Low | Jordan Valley, Judean Desert & Dead Sea, Arava & Eilat, Sharon | Jezreel Valley, Shfela, Negev, Lower Galilee |
| 18 | `holy-bramble` | פטל קדוש | Holy bramble | *Rubus sanctus* | Jun–Oct | Aug–Sep | Medium | Upper Galilee, Golan, Lower Galilee, Carmel, Sharon, Jezreel Valley, Jordan Valley | Samaria, Shfela |
| 19 | `myrtle` | הדס | Myrtle | *Myrtus communis* | Oct–Dec | Oct–Nov | High | Carmel, Upper Galilee | Golan, Lower Galilee |
| 20 | `pine-nut` | צנוברים | Pine nuts (stone pine) | *Pinus pinea* | Jul–Dec | Aug–Oct | Low | Carmel, Lower Galilee | Upper Galilee, Sharon, Shfela, Judean & Jerusalem hills |

Region keys used in `data.js`: `ge` Upper Galilee, `go` Golan, `gt` Lower Galilee, `ca` Carmel, `jz` Jezreel Valley, `sp` Sharon, `sa` Samaria, `jv` Jordan Valley, `ju` Judean & Jerusalem hills, `sh` Shfela, `gz` Gaza Strip, `ds` Judean Desert & Dead Sea, `ng` Negev, `ar` Arava & Eilat. Regions `gz` (Gaza Strip) currently have no crop assigned.

## Known weak points

- **Jujube** (*Ziziphus spina-christi*): fruits in several cycles; sources report ripe fruit in April–May, in summer and in autumn. The cultivated Chinese jujube (*Z. jujuba*) ripens July–August and again in November.
- **Pine nuts**: the stone pine is planted, never wild, in Israel. Cones ripen in December–January and open in summer heat; sources disagree on when to collect.
- **Passion fruit**: a sweeter summer crop and a more sour winter crop, with no single clear season.
- **Black elder berries**: rare in Israel; in warm gardens often no fruit at all.
- **Green plum**: the observation query uses *Prunus cerasifera*, while the wild green plum in Israel is *Prunus ursina*, so iNaturalist counts may not match.
- **Katlav**: sources are split between September–November and November–January.

## Legal and safety notes

Several of these plants are protected in the wild in Israel (for example myrtle, wild almond, katlav trees, and carob in natural habitats). The app is an information tool and does not replace the law, the rules of a nature reserve, or the permission of a landowner. Do not eat any plant you cannot identify with certainty. Elderberries must be cooked, and fig sap irritates the skin.

## Per-crop details

### Green plum · שזיף ירוק

- **Season / peak:** Apr–Jun / Apr–May  ·  **Confidence:** Medium
- **Sources (as shown in the app):** כלכליסט, צמח השדה (קק״ל), iNaturalist ישראל
- **Note (shown in the app, Hebrew):** שזיפים ירוקים נקטפים בעודם בוסריים, בין פסח לשבועות. בר גדל שזיף הדוב בגליל העליון, בגולן ובחרמון, ובמאי הפרי שלו עדיין ירוק. שאר השזיפים בעיקר בעצי תרבות.

### Sumac · סומק

- **Season / peak:** Aug–Nov / Sep–Oct  ·  **Confidence:** High
- **Sources (as shown in the app):** צמח השדה (קק״ל), ויקיפדיה, נאות קדומים, זרעים מציון
- **Note (shown in the app, Hebrew):** גדל בחורש ובהרים, לא בעמקים ובמדבר. המקורות נותנים טווחים מעט שונים (יולי עד דצמבר), רובם אוגוסט עד נובמבר.

### Eastern strawberry tree (katlav) · קטלב

- **Season / peak:** Sep–Dec / Oct–Dec  ·  **Confidence:** Medium
- **Sources (as shown in the app):** Flora of Israel Online, צמח השדה (קק״ל), ויקיפדיה, שנה בגינה
- **Note (shown in the app, Hebrew):** המקורות חלוקים: ספטמבר עד נובמבר, או נובמבר עד ינואר. אוספים רק פרי רך ואדום כהה. גדל על קרקעות חוואר בהרים. כריתת העץ אסורה.

### Olive · זית

- **Season / peak:** Sep–Dec / Oct–Nov  ·  **Confidence:** High
- **Sources (as shown in the app):** ynet (ענף הזית), רשות הטבע והגנים, ויקיפדיה
- **Note (shown in the app, Hebrew):** מסיק זיתים לכבישה מתחיל בספטמבר, ומסיק זיתי שמן מסוף ספטמבר עד סוף דצמבר. רוב המטעים פרטיים, כדאי לבקש רשות.

### Carob · חרוב

- **Season / peak:** Jul–Oct / Aug–Sep  ·  **Confidence:** Medium
- **Sources (as shown in the app):** Flora of Israel Online, צמח השדה (קק״ל), כלנית, ויקיפדיה
- **Note (shown in the app, Hebrew):** הפרי מסיים להבשיל ביולי-אוגוסט, והתרמילים נאספים בעיקר עד נובמבר. החרוב מוגן בטבע (לא בעצים שניטעו).

### Green almond · שקד ירוק

- **Season / peak:** Mar–Jun / Apr–May  ·  **Confidence:** High
- **Sources (as shown in the app):** חומוס להמונים, ויקיפדיה, ד״ר רחלי עינב, ynet
- **Note (shown in the app, Hebrew):** עונה קצרה: מסוף מרץ עד יוני, ובתחילת אפריל הפרי רך ביותר. שקדי בר מוגנים בחוק, לכן עדיף ללקט במטעים או לקנות בשוק.

### Loquat · שסק

- **Season / peak:** Mar–Jun / Apr–May  ·  **Confidence:** High
- **Sources (as shown in the app):** מועצת הצמחים, ויקיפדיה
- **Note (shown in the app, Hebrew):** השיווק מתחיל במרץ ונמשך עד יוני, ורוב הפירות מבשילים מאפריל עד אמצע מאי. רוב העצים בגינות ובמטעים באזור החוף ובת שלמה.

### Mulberry · תות עץ

- **Season / peak:** Apr–Jun / Apr–May  ·  **Confidence:** High
- **Sources (as shown in the app):** ויקיפדיה, צמח השדה (קק״ל), ליקוט.co.il, נחלת התורה
- **Note (shown in the app, Hebrew):** עצי תות נפוצים בעיקר ביישובים ובגינות. באזורים קרירים, למשל גליל עליון, הפרי השחור מבשיל מאוחר יותר, עד יוני.

### Prickly pear (sabres) · סברס

- **Season / peak:** Jul–Oct / Aug–Sep  ·  **Confidence:** High
- **Sources (as shown in the app):** צמח השדה (קק״ל), פארמרים, ויקיפדיה
- **Note (shown in the app, Hebrew):** גדל כמעט בכל הארץ. עיקר העונה יולי עד ספטמבר, ובחלק מהמקורות עד נובמבר. יש קוצים זעירים בפרי, לכן כפפות. בחלק מהאתרים כנימה מזיקה פגעה בצמחים.

### Pomegranate · רימון

- **Season / peak:** Sep–Dec / Sep–Nov  ·  **Confidence:** High
- **Sources (as shown in the app):** ארגון מגדלי הפירות, אגרונט, ויקיפדיה, ynet
- **Note (shown in the app, Hebrew):** זנים מוקדמים מגיעים כבר באוגוסט ובדרום הבשלה מוקדמת בשבועיים-שלושה. הקטיף נמשך עד דצמבר. מטעים מסחריים בעיקר בדרום, בשומרון ובצפון.

### Black elder, flowers · סמבוק שחור – פרחים

- **Season / peak:** Mar–Jun / Apr–May  ·  **Confidence:** Medium
- **Sources (as shown in the app):** צמח השדה (קק״ל), ויקיפדיה, ליקוט.co.il
- **Note (shown in the app, Hebrew):** בר כמעט לא גדל בישראל (חרמון והגליל העליון). הוא נפוץ בגינות ובגינון ציבורי, ושם קל יותר למצוא פרחים מאשר פירות.

### Black elder, berries · סמבוק שחור – פירות

- **Season / peak:** Aug–Oct / Sep–Oct  ·  **Confidence:** Low
- **Sources (as shown in the app):** צמח השדה (קק״ל), ליקוט.co.il, אורגניקו
- **Note (shown in the app, Hebrew):** במקומות חמים בגינות הפרי נדיר או חסר. המקורות מציינים הבשלה בתחילת הסתיו. הפירות רעילים נאים ויש לבשל אותם.

### Pitanga (Surinam cherry) · פיטנגו

- **Season / peak:** Apr–Jul / May–Jun  ·  **Confidence:** Medium
- **Sources (as shown in the app):** ויקיפדיה, אורגניקו, משתלות מלצר
- **Note (shown in the app, Hebrew):** לא גדל בר בישראל. נפוץ כגדר חיה בגינות, בעיקר באזורים נטולי קרה. פורח באביב ונותן לעיתים 2–3 יבולים בשנה, העיקרי באביב ובתחילת הקיץ.

### Passion fruit · פסיפלורה

- **Season / peak:** Jun–Dec / Aug–Oct  ·  **Confidence:** Low
- **Sources (as shown in the app):** פרי התשוקה (passionfruitman), אורגניקו, ישראל היום
- **Note (shown in the app, Hebrew):** אין עונה אחת ברורה: יש יבול קיץ מתוק ויבול חורף חמוץ יותר, והמקורות לא מסכימים על החודשים. את הפרי אוספים מהקרקע כשהוא נושר. נפוץ בגינות.

### Pecan · פקאן

- **Season / peak:** Oct–Dec / Oct–Nov  ·  **Confidence:** High
- **Sources (as shown in the app):** כנס מדיה (מו״פ צפון), מלאו את הארץ, פקאן הצפון
- **Note (shown in the app, Hebrew):** גידול חקלאי: מטעים בעמק החולה, עמק יזרעאל, שפלת החוף וחבל יהודה. הבשלה באוקטובר-נובמבר. קטיף רק ברשות בעל המטע.

### Fig · תאנה

- **Season / peak:** Jun–Oct / Aug–Sep  ·  **Confidence:** High
- **Sources (as shown in the app):** ויקיפדיה, ליקוט.co.il, מלאו את הארץ, יוסף כרמין
- **Note (shown in the app, Hebrew):** יבול ראשון (בכורות) ביוני, והעיקרי מיולי עד ספטמבר, ובחלק מהזנים עד אמצע אוקטובר. ליד מעיינות בבקעת הירדן ובים המלח גדלה גם תאנת בר.

### Jujube · שיזף

- **Season / peak:** Apr–Nov / Aug–Oct  ·  **Confidence:** Low
- **Sources (as shown in the app):** ויקיפדיה, Flora of Israel Online, ד״ר רחלי עינב, נחלת התורה
- **Note (shown in the app, Hebrew):** הנתון הפחות מבוסס באפליקציה. השיזף המצוי פורח ומניב במחזורים, והמקורות מציינים פרי בשל מאפריל-מאי, בקיץ ובסתיו. גדל בעיקר מתחת ל-400 מ' בבקעה, בערבה ובשפלת החוף. שיזף תרבותי (סיני) מבשיל ביולי-אוגוסט ושוב בנובמבר.

### Holy bramble · פטל קדוש

- **Season / peak:** Jun–Oct / Aug–Sep  ·  **Confidence:** Medium
- **Sources (as shown in the app):** צמח השדה (קק״ל), Flora of Israel Online, ויקיפדיה, נאות קדומים
- **Note (shown in the app, Hebrew):** גדל לאורך נחלים ומעיינות. פורח מאפריל עד ספטמבר, והפרי מבשיל לפי צמח השדה באוגוסט-ספטמבר (פירות סגולים-שחורים ורכים). קוצני מאוד.

### Myrtle · הדס

- **Season / peak:** Oct–Dec / Oct–Nov  ·  **Confidence:** High
- **Sources (as shown in the app):** ויקיפדיה, Flora of Israel Online, כלכליסט, שרה גולד
- **Note (shown in the app, Hebrew):** ההדס מוגן בטבע בכל הארץ, ואסור לקטוף בר. הוא נפוץ בגינות, בשיחי גדר ובבתי כנסת, ושם אפשר ללקט פירות בהסכמת הבעלים. הפירות מבשילים באוקטובר-נובמבר ונשארים על הענפים זמן רב. טעמם עפיץ, לכן מכינים מהם ליקר.

### Pine nuts (stone pine) · צנוברים

- **Season / peak:** Jul–Dec / Aug–Oct  ·  **Confidence:** Low
- **Sources (as shown in the app):** קק״ל (אורן הצנובר), צמח השדה, שנה בגינה, אורגניקו
- **Note (shown in the app, Hebrew):** אורן הצנובר נטוע בלבד ולא בר: כרמל, גליל, גנים ופארקים. האצטרובלים בשלים בדצמבר-ינואר ונפתחים בחום הקיץ, והזרעים נושרים אל הקרקע. המקורות לא מסכימים על חודשי האיסוף. גם אורן ירושלים נותן צנוברים קטנים.

