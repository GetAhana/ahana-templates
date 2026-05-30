/**
 * Build a static OpenStreetMap image URL (no Leaflet, no API key).
 * Used in token maps as LOCATION_n_MAP_IMG_URL and for local previews.
 */
export function osmStaticMapUrl(lat, lng, options = {}) {
  const la = Number(lat);
  const ln = Number(lng);
  if (!Number.isFinite(la) || !Number.isFinite(ln)) return "";
  const zoom = Math.min(16, Math.max(8, Number(options.zoom) || 11));
  const w = Math.min(1200, Math.max(400, Number(options.width) || 800));
  const h = Math.min(800, Math.max(240, Number(options.height) || 420));
  const marker = `${la},${ln},red-pushpin`;
  const q = new URLSearchParams({
    center: `${la},${ln}`,
    zoom: String(zoom),
    size: `${w}x${h}`,
    markers: marker,
  });
  return `https://staticmap.openstreetmap.de/staticmap.php?${q.toString()}`;
}
