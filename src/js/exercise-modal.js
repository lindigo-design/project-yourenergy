import { getExerciseById } from './api.js';
import { EVENTS } from './constants.js';
import { isFavorite, toggleFavorite } from './favorites-storage.js';
import { showLoader, hideLoader } from './loader.js';

const backdrop = document.querySelector('#exercise-modal-backdrop');

let currentExerciseData = null;

document.addEventListener(EVENTS.EXERCISE_OPEN, async (event) => {
  const id = event.detail.id;
  
  try {
    showLoader();
    const exercise = await getExerciseById(id);
    currentExerciseData = exercise;
    renderModal(exercise);
    openModal();
  } catch (error) {
    console.error('Помилка при завантаженні вправи:', error);
  } finally {
    hideLoader();
  }
});

function renderStars(rating) {
  const filled = Math.round(rating);
  return '★'.repeat(filled) + '☆'.repeat(5 - filled);
}

function renderModal(data) {
  const { _id, name, rating, gifUrl, target, bodyPart, equipment, popularity, burnedCalories, description } = data;
  const favBtnText = isFavorite(_id) ? 'Remove from favorites' : 'Add to favorites';

  backdrop.innerHTML = `
    <div class="modal-window">
      <button class="close-btn" id="modal-close">
        <svg class="icon-close" width="14" height="14"><use href="./images/sprite.svg#icon-close"></use></svg>
      </button>
      <div class="modal-layout">
        <img src="${gifUrl}" alt="${name}" class="modal-img">
        <div class="modal-info">
          <h2 class="modal-title">${name}</h2>
          <div class="modal-rating">${rating.toFixed(1)} ${renderStars(rating)}</div>
          <ul class="modal-stats">
            <li><span>Target</span> ${target}</li>
            <li><span>Body Part</span> ${bodyPart}</li>
            <li><span>Equipment</span> ${equipment}</li>
            <li><span>Popular</span> ${popularity}</li>
          </ul>
          <div class="modal-calories"><span>Burned calories</span> ${burnedCalories}/3 min</div>
          <p class="modal-description">${description}</p>
          <div class="modal-buttons">
            <button class="fav-btn" id="fav-btn" data-id="${_id}">
              <span>${favBtnText}</span>
              <svg class="icon-heart" width="18" height="18"><use href="./images/sprite.svg#icon-heart"></use></svg>
            </button>
            <button class="rating-btn">Give a rating</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

function openModal() {
  backdrop.classList.remove('is-hidden');
  document.body.style.overflow = 'hidden';
  document.querySelector('#modal-close').addEventListener('click', closeModal);
  backdrop.addEventListener('click', onBackdropClick);
  window.addEventListener('keydown', onEscPress);

  const favBtn = document.querySelector('#fav-btn');
  favBtn.addEventListener('click', () => {
    toggleFavorite(currentExerciseData);
    const isNowFav = isFavorite(currentExerciseData._id);
    const textSpan = favBtn.querySelector('span');
    textSpan.textContent = isNowFav ? 'Remove from favorites' : 'Add to favorites';
  });
}

function closeModal() {
  backdrop.classList.add('is-hidden');
  document.body.style.overflow = '';
  window.removeEventListener('keydown', onEscPress);
  backdrop.removeEventListener('click', onBackdropClick);
  backdrop.innerHTML = '';
  currentExerciseData = null;
}

function onBackdropClick(e) {
  if (e.target === backdrop) closeModal();
}

function onEscPress(e) {
  if (e.code === 'Escape') closeModal();
}