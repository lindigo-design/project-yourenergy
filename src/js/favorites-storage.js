
import { LS_KEYS, EVENTS } from './constants.js';


export function getFavorites() {
  try {
    const raw = localStorage.getItem(LS_KEYS.FAVORITES);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function isFavorite(exerciseId) {
  return getFavorites().some(ex => ex._id === exerciseId);
}

export function addFavorite(exercise) {
  const favs = getFavorites();
  if (favs.some(ex => ex._id === exercise._id)) return;
  favs.push(exercise);
  localStorage.setItem(LS_KEYS.FAVORITES, JSON.stringify(favs));
  window.dispatchEvent(new CustomEvent(EVENTS.FAVORITES_CHANGED));
}

export function removeFavorite(exerciseId) {
  const favs = getFavorites().filter(ex => ex._id !== exerciseId);
  localStorage.setItem(LS_KEYS.FAVORITES, JSON.stringify(favs));
  window.dispatchEvent(new CustomEvent(EVENTS.FAVORITES_CHANGED));
}

/**
 * Toggle favorite. Повертає true якщо додано, false якщо видалено.
 */
export function toggleFavorite(exercise) {
  if (isFavorite(exercise._id)) {
    removeFavorite(exercise._id);
    return false;
  }
  addFavorite(exercise);
  return true;
}
