export const DESKTOP_QUERY = "(min-width: 1024px) and (pointer: fine)";
export const IMMERSIVE_QUERY =
  "(min-width: 1024px) and (min-height: 700px) and (pointer: fine)";

export function routeScrollIntent({ kind, saved, hash, samePath }) {
  if (kind === "POP" && Number.isFinite(saved))
    return { type: "position", value: saved, immediate: true };
  if (hash) {
    let value = hash.slice(1);
    try {
      value = decodeURIComponent(value);
    } catch {}
    return { type: "anchor", value, immediate: !samePath || kind === "POP" };
  }
  return { type: "position", value: 0, immediate: true };
}

export function stageFits(contentHeight, viewportHeight, headerHeight) {
  return contentHeight <= viewportHeight - headerHeight - 32;
}
