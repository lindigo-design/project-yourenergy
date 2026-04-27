// ============================================================
//  СТОРІНКА FAVORITES — відповідальний: [ПОСТАВ ІМ'Я]
//
//  Що реалізувати (ТЗ п.32-34):
//  - Працює на favorites.html
//  - Блок цитати дня (викликаємо з quote.js)
//  - Блок списку улюблених вправ з localStorage
//  - Картка: назва, калорії, частина тіла, мета + Start + "видалити"
//  - Клік по Start → dispatchEvent EXERCISE_OPEN
//  - Клік по "видалити" → removeFavorite(id) → перерендер
//  - Якщо нема улюблених — повідомлення
//  - Слухати FAVORITES_CHANGED → перерендер
//
//  Твоя розмітка: src/partials/favorites-list.html
//  Твої стилі:    src/css/components/favorites-page.css
// ============================================================

import { getFavorites, removeFavorite } from './favorites-storage.js';
import { EVENTS } from './constants.js';

const favoritesList = document.querySelector('.favorites-list');
const emptyMessage = document.querySelector('.favorites-empty-text');

function createFavoriteCardMarkup(exercise) {
  const { _id, name, burnedCalories, time, bodyPart, target } = exercise;

  return `
    <li class="favorite-item" data-id="${_id}">
      <div class="favorite-item-header">
        <div class="favorite-item-badge-wrap">
          <span class="favorite-item-badge">WORKOUT</span>
          <button class="favorite-item-trash-btn" type="button" aria-label="Remove from favorites">
            <svg width="16" height="16">
              <use href="./img/sprite.svg#icon-trash"></use>
            </svg>
          </button>
        </div>
        <button class="favorite-item-start-btn" type="button">
          Start
          <svg width="16" height="16">
            <use href="./img/sprite.svg#icon-arrow"></use>
          </svg>
        </button>
      </div>
      
      <div class="favorite-item-title-wrap">
        <div class="favorite-item-icon-wrap">
          <svg class="favorite-item-icon" width="24" height="24">
            <use href="./img/sprite.svg#icon-running-man"></use>
          </svg>
        </div>
        <h3 class="favorite-item-title">${name}</h3>
      </div>
      
      <ul class="favorite-item-info-list">
        <li class="favorite-item-info-item">
          <span class="favorite-item-info-label">Burned calories:</span>
          <span class="favorite-item-info-value">${burnedCalories} / ${time} min</span>
        </li>
        <li class="favorite-item-info-item">
          <span class="favorite-item-info-label">Body part:</span>
          <span class="favorite-item-info-value">${bodyPart}</span>
        </li>
        <li class="favorite-item-info-item">
          <span class="favorite-item-info-label">Target:</span>
          <span class="favorite-item-info-value">${target}</span>
        </li>
      </ul>
    </li>
  `;
}

function renderFavorites() {
  if (!favoritesList || !emptyMessage) return;

  const savedExercises = getFavorites();

  if (savedExercises.length === 0) {
    emptyMessage.style.display = 'block';
    favoritesList.style.display = 'none';
    favoritesList.innerHTML = '';
  } else {
    emptyMessage.style.display = 'none';
    favoritesList.style.display = '';
    favoritesList.innerHTML = savedExercises.map(createFavoriteCardMarkup).join('');
  }
}

if (favoritesList) {
  // Initial render
  renderFavorites();

  // Re-render when favorites change (e.g., deleted from this page, or changed in another tab)
  window.addEventListener(EVENTS.FAVORITES_CHANGED, renderFavorites);

  // Event delegation for buttons
  favoritesList.addEventListener('click', (e) => {
    const card = e.target.closest('.favorite-item');
    if (!card) return;

    const id = card.dataset.id;

    // Check if the trash button was clicked
    if (e.target.closest('.favorite-item-trash-btn')) {
      removeFavorite(id);
      return;
    }

    // Check if the start button was clicked
    if (e.target.closest('.favorite-item-start-btn')) {
      window.dispatchEvent(
        new CustomEvent(EVENTS.EXERCISE_OPEN, { detail: { exerciseId: id } })
      );
      return;
    }
  });
}
