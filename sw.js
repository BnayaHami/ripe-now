/* Service worker, "עכשיו בעונה" (Ripe Now). Version 1.0.0
   Bump VERSION on every release so that old caches are removed.
   Strategy:
   - index.html and data.js: network first, cache as offline fallback (updates arrive immediately when online).
   - other same-origin files (images, icons): cache first, refreshed in the background.
   - CDN libraries and fonts: stale-while-revalidate.
   - map tiles (Esri): cache first, capped at 400 tiles.
   - iNaturalist and Nominatim APIs: never cached by the worker (the page handles failures). */
const VERSION = "1.0.0";
const CORE = "ripe-now-core-" + VERSION;
const RUNTIME = "ripe-now-runtime-" + VERSION;
const TILES = "ripe-now-tiles";
const TILE_LIMIT = 400;
const CORE_FILES = [
  "./",
  "index.html",
  "data.js",
  "manifest.webmanifest",
  "icons/icon-192.png",
  "icons/icon-512.png",
  "icons/apple-touch-icon.png",
  "painterly_green_plum_cluster.png",
  "watercolor_red_berry_botanical_sprig.png",
  "watercolor_strawberry_tree_branch.png",
  "painterly_olive_branch_with_three_olives.png",
  "botanical_carob_branch_illustration.png",
  "botanical_almond_branch_illustration.png",
  "painterly_loquat_branch_botanical_illustration.png",
  "mulberry_sprig_in_bloom.png",
  "Prickly_Pear_Botanical_Still_Life.png",
  "watercolor_pomegranate_branch_still_life.png",
  "watercolor_elderflower_botanical_branch.png",
  "botanical_elderberry_sprig_watercolor.png",
  "Watercolor_Pitanga_Branch_with_Glossy_Fruits.png",
  "passion_fruit_botanical_still_life.png",
  "painterly_pecan_branch_illustration.png",
  "botanical_fig_branch_still_life.png",
  "watercolor_jujube_branch_with_cut_fruit.png",
  "botanical_raspberry_branch_study.png",
  "Myrtle_Branch_with_Blossoms_and_Berries.png",
  "botanical_pine_cone_still_life.png"
];
const CDN_HOSTS = ["cdnjs.cloudflare.com", "cdn.jsdelivr.net", "fonts.googleapis.com", "fonts.gstatic.com"];
const TILE_HOST = "server.arcgisonline.com";

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CORE).then((c) =>
      // one by one, so a single missing image does not fail the whole install
      Promise.allSettled(CORE_FILES.map((f) => c.add(new Request(f, { cache: "reload" }))))
    ).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k.startsWith("ripe-now-") && ![CORE, RUNTIME, TILES].includes(k)).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

const okToCache = (r) => r && (r.ok || r.type === "opaque");

async function networkFirst(req, cacheName) {
  const cache = await caches.open(cacheName);
  try {
    const res = await fetch(req);
    if (okToCache(res)) cache.put(req, res.clone());
    return res;
  } catch (err) {
    const hit = await cache.match(req, { ignoreSearch: true });
    if (hit) return hit;
    if (req.mode === "navigate") {
      const page = await cache.match("index.html");
      if (page) return page;
    }
    throw err;
  }
}

async function staleWhileRevalidate(req, cacheName, ignoreSearch) {
  const cache = await caches.open(cacheName);
  const hit = await cache.match(req, { ignoreSearch });
  const fresh = fetch(req).then((res) => { if (okToCache(res)) cache.put(req, res.clone()); return res; }).catch(() => null);
  return hit || (await fresh) || Response.error();
}

async function tileFetch(req) {
  const cache = await caches.open(TILES);
  const hit = await cache.match(req);
  if (hit) return hit;
  const res = await fetch(req);
  if (okToCache(res)) {
    cache.put(req, res.clone());
    cache.keys().then((ks) => { if (ks.length > TILE_LIMIT) ks.slice(0, ks.length - TILE_LIMIT).forEach((k) => cache.delete(k)); });
  }
  return res;
}

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin === self.location.origin) {
    const path = url.pathname;
    const isShell = req.mode === "navigate" || path.endsWith("/") || path.endsWith("index.html") || path.endsWith("data.js") || path.endsWith("sw.js") || path.endsWith(".webmanifest");
    e.respondWith(isShell ? networkFirst(req, CORE) : staleWhileRevalidate(req, CORE, true));
  } else if (CDN_HOSTS.includes(url.hostname)) {
    e.respondWith(staleWhileRevalidate(req, RUNTIME, false));
  } else if (url.hostname === TILE_HOST) {
    e.respondWith(tileFetch(req));
  }
  // everything else (iNaturalist, Nominatim): not handled, goes straight to the network
});
