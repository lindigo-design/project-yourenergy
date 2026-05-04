/**
 * Returns the correct URL for sprite.svg, regardless of the build environment.
 * Vite hashes and bundles sprite.svg during build; this helper accesses it via
 * window.__SPRITE_URL__ which is set in main.js / favorites-main.js.
 */
export function spriteHref(iconId) {
  const base = window.__SPRITE_URL__ || '/images/sprite.svg';
  return `${base}#${iconId}`;
}
