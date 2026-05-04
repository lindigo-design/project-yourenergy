// Глобальні стилі
import './css/styles.css';

// Import sprite URL so Vite bundles and hashes it correctly
import spriteUrl from './images/sprite.svg';
window.__SPRITE_URL__ = spriteUrl;

// Секції (імпортуйте в міру готовності):
import './js/header.js';
import './js/hero.js';
import './js/filters.js';
import './js/categories.js';
import './js/exercises.js';
import './js/exercise-modal.js';
import './js/quote.js';
import './js/footer.js';
import './js/scroll-up.js';

console.log('[YourEnergy] Home page loaded');
