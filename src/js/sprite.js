/**
 * Returns the correct URL for sprite.svg, regardless of the build environment.
 * Vite hashes and bundles sprite.svg during build; this helper accesses it via
 * window.__SPRITE_URL__ which is set in main.js / favorites-main.js.
 */
const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');
 
export function spriteHref(iconId) {
  return `${BASE}/images/sprite.svg#${iconId}`;
}
