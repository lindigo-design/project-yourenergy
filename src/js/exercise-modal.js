import { getExerciseById } from './api.js';
import { EVENTS } from './constants.js';
import { isFavorite, toggleFavorite } from './favorites-storage.js';
import { showLoader, hideLoader } from './loader.js';
function capitalizeFirst(str) {
  if (typeof str !== 'string') return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}



const backdrop = document.querySelector('#exercise-modal-backdrop');

let currentExerciseData = null;
function updateFavButton(btn, isFav) {
  const textSpan = btn.querySelector('span');
  const iconUse = btn.querySelector('use');

  if (isFav) {
    textSpan.textContent = 'Remove from favorites';
    iconUse.setAttribute('href', './images/sprite.svg#icon-trash');
  } else {
    textSpan.textContent = 'Add to favorites';
    iconUse.setAttribute('href', './images/sprite.svg#icon-heart');
  }
}

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

function renderStars() {
  return `
    <svg class="star active" width="18" height="18" style="width:18px;height:18px">
      <use href="./images/sprite.svg#icon-star"></use>
    </svg>
    <svg class="star active" width="18" height="18" style="width:18px;height:18px">
      <use href="./images/sprite.svg#icon-star"></use>
    </svg>
    <svg class="star active" width="18" height="18" style="width:18px;height:18px">
      <use href="./images/sprite.svg#icon-star"></use>
    </svg>
    <svg class="star active" width="18" height="18" style="width:18px;height:18px">
      <use href="./images/sprite.svg#icon-star"></use>
    </svg>
    <svg class="star" width="18" height="18" style="width:18px;height:18px">
      <use href="./images/sprite.svg#icon-star"></use>
    </svg>
  `;
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
          <div class="modal-rating">
          <span>${rating.toFixed(1)}</span>
          <span class="stars">${renderStars()}</span>
          </div>
          <div class="divider divider-top"></div>
          <ul class="modal-stats">
          <li>
          <span>Target</span>
         <span>${capitalizeFirst(target)}</span>
         </li>
         <li>
         <span>Body Part</span>
         <span>${capitalizeFirst(bodyPart)}</span>
         </li>
         <li>
         <span>Equipment</span>
         <span>${capitalizeFirst(equipment)}</span>
        </li>
         <li>
        <span>Popular</span>
        <span>${popularity}</span>
        </li>
       </ul>
          <div class="modal-calories"><span>Burned calories</span> ${burnedCalories}/3 min</div>
          <div class="divider divider-bottom"></div>
          <p class="modal-description">${description}</p>
          <div class="modal-buttons">
            <button class="fav-btn modal-exercise-btn" id="fav-btn" data-id="${_id}">
              <span>${favBtnText}</span>
              <svg class="icon-heart" width="18" height="18"><use href="./images/sprite.svg#icon-heart"></use></svg>
            </button>
            <button class="rating-btn modal-exercise-btn">Give a rating</button>
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

  // стартовое состояние
  updateFavButton(favBtn, isFavorite(currentExerciseData._id));

  favBtn.addEventListener('click', () => {
    toggleFavorite(currentExerciseData);

    const isNowFav = isFavorite(currentExerciseData._id);
    updateFavButton(favBtn, isNowFav);
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