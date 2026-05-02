

import { getFavorites, removeFavorite } from './favorites-storage.js';
import { EVENTS } from './constants.js';
import { createExerciseCardMarkup } from './exercise-card.js';

const favoritesList = document.querySelector('.favorites-list');
const emptyMessage = document.querySelector('.favorites-empty-text');
const paginationContainer = document.querySelector('.favorites-pagination');

let currentPage = 1;

function getItemsPerPage() {
  if (window.matchMedia('(min-width: 1280px)').matches) return Infinity;
  if (window.matchMedia('(min-width: 768px)').matches) return 10;
  return 8;
}

function renderPagination(totalItems, perPage) {
  if (!paginationContainer) return;
  if (perPage === Infinity || totalItems <= perPage) {
    paginationContainer.innerHTML = '';
    return;
  }

  const totalPages = Math.ceil(totalItems / perPage);
  let markup = '';
  for (let i = 1; i <= totalPages; i++) {
    const isActive = i === currentPage ? 'is-active' : '';
    markup += `<button class="favorites-pagination-btn ${isActive}" data-page="${i}">${i}</button>`;
  }
  paginationContainer.innerHTML = markup;
}



function renderFavorites() {
  if (!favoritesList || !emptyMessage) return;

  const savedExercises = getFavorites();

  if (savedExercises.length === 0) {
    emptyMessage.style.display = 'block';
    favoritesList.style.display = 'none';
    favoritesList.innerHTML = '';
    if (paginationContainer) paginationContainer.innerHTML = '';
    return;
  }

  emptyMessage.style.display = 'none';
  favoritesList.style.display = 'grid';

  const perPage = getItemsPerPage();
  
  const totalPages = Math.ceil(savedExercises.length / perPage);
  if (currentPage > totalPages && totalPages > 0) {
    currentPage = totalPages;
  }

  let visibleExercises = savedExercises;
  if (perPage !== Infinity) {
    const startIndex = (currentPage - 1) * perPage;
    visibleExercises = savedExercises.slice(startIndex, startIndex + perPage);
  }

  favoritesList.innerHTML = visibleExercises.map(ex => createExerciseCardMarkup(ex, true)).join('');
  renderPagination(savedExercises.length, perPage);
}

if (favoritesList) {
  renderFavorites();

  window.addEventListener(EVENTS.FAVORITES_CHANGED, renderFavorites);

  favoritesList.addEventListener('click', (e) => {
    const card = e.target.closest('.exercise-card');
    if (!card) return;

    const id = card.dataset.id;

    if (e.target.closest('.exercise-card-trash-btn')) {
      removeFavorite(id);
      return;
    }

    if (e.target.closest('.exercise-card-start-btn')) {
      document.dispatchEvent(
        new CustomEvent(EVENTS.EXERCISE_OPEN, { detail: { id } })
      );
      return;
    }
  });

  if (paginationContainer) {
    paginationContainer.addEventListener('click', (e) => {
      const btn = e.target.closest('.favorites-pagination-btn');
      if (!btn) return;
      
      currentPage = Number(btn.dataset.page);
      renderFavorites();
      
      document.querySelector('.favorites-section').scrollIntoView({ behavior: 'smooth' });
    });
  }
  
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(renderFavorites, 200);
  });
}
