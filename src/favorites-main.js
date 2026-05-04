import './css/styles.css';

// Import sprite URL so Vite bundles and hashes it correctly
import spriteUrl from './images/sprite.svg';
window.__SPRITE_URL__ = spriteUrl;

import './js/header.js';
import './js/quote.js';
import './js/favorites-page.js';
import './js/exercise-modal.js';
import './js/footer.js';
import './js/scroll-up.js';

console.log('[YourEnergy] Favorites page loaded');
