/** Aceita só http(s) — o valor vira `url("…")` no CSS, então aspas quebrariam a declaração. */
export function parseImageUrl(raw: string) {
  let url: URL;
  try {
    url = new URL(raw.trim());
  } catch {
    return null;
  }
  if (url.protocol !== "https:" && url.protocol !== "http:") return null;
  if (url.href.includes('"')) return null;
  return url.href;
}
