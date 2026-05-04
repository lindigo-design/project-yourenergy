import { spriteHref } from './sprite.js';
import { getExerciseById } from './api.js';
import { EVENTS } from './constants.js';
import { isFavorite, toggleFavorite } from './favorites-storage.js';
import { showLoader, hideLoader } from './loader.js';

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css"; 

// --- ЕЛЕМЕНТИ ДОМ ТА ЗМІННІ ---
const exerciseBackdrop = document.querySelector('#exercise-modal-backdrop');
const ratingBackdrop = document.querySelector('#rating-modal-backdrop'); 
let currentExerciseData = null;

// --- ДОПОМІЖНІ ФУНКЦІЇ ---
function capitalizeFirst(str) {
  if (typeof str !== 'string') return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function updateFavButton(btn, isFav) {
  const textSpan = btn.querySelector('span');
  const iconUse = btn.querySelector('use');

  if (isFav) {
    textSpan.textContent = 'Remove from favorites';
    iconUse.setAttribute('href', spriteHref('icon-trash'));
  } else {
    textSpan.textContent = 'Add to favorites';
    iconUse.setAttribute('href', spriteHref('icon-heart'));
  }
}

function renderStars(rating) {
  const rounded = Math.round(rating || 0);
  let stars = '';

  for (let i = 1; i <= 5; i++) {
    stars += `
      <svg class="star ${i <= rounded ? 'active' : ''}" width="18" height="18">
        <use href="${spriteHref('icon-star')}"></use>
      </svg>
    `;
  }

  return stars;
}

// --- СЛУХАЧ ВІДКРИТТЯ ГОЛОВНОЇ МОДАЛКИ ---
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

// =======================================================
// МОДАЛКА 1: ДЕТАЛІ ВПРАВИ
// =======================================================

function renderModal(data) {
  const { _id, name, rating, gifUrl, target, bodyPart, equipment, popularity, burnedCalories, description } = data;
  const favBtnText = isFavorite(_id) ? 'Remove from favorites' : 'Add to favorites';

  exerciseBackdrop.innerHTML = `
    <div class="modal-window">
      <button class="close-btn" id="modal-close">
        <svg class="icon-close" width="14" height="14"><use href="${spriteHref('icon-close')}"></use></svg>
      </button>
      <div class="modal-layout">
        <img src="${gifUrl}" alt="${name}" class="modal-img">
        <div class="modal-info">
          <h2 class="modal-title">${name}</h2>
          <div class="modal-rating">
            <span>${rating.toFixed(1)}</span>
            <span class="stars">${renderStars(rating)}</span>
          </div>
          <div class="divider divider-top"></div>
          <ul class="modal-stats">
            <li><span>Target</span><span>${capitalizeFirst(target)}</span></li>
            <li><span>Body Part</span><span>${capitalizeFirst(bodyPart)}</span></li>
            <li><span>Equipment</span><span>${capitalizeFirst(equipment)}</span></li>
            <li><span>Popular</span><span>${popularity}</span></li>
          </ul>
          <div class="modal-calories"><span>Burned calories</span> ${burnedCalories}/3 min</div>
          <div class="divider divider-bottom"></div>
          <p class="modal-description">${description}</p>
          <div class="modal-buttons">
            <button class="fav-btn modal-exercise-btn" id="fav-btn" data-id="${_id}">
              <span>${favBtnText}</span>
              <svg class="icon-heart" width="18" height="18"><use href="${spriteHref('icon-heart')}"></use></svg>
            </button>
            <button class="rating-btn modal-exercise-btn">Give a rating</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

function openModal() {
  exerciseBackdrop.classList.remove('is-hidden');
  document.body.style.overflow = 'hidden';

  // Слухачі для першої модалки
  document.querySelector('#modal-close').addEventListener('click', closeExerciseModal);
  exerciseBackdrop.addEventListener('click', onExerciseBackdropClick);
  window.addEventListener('keydown', onExerciseEscPress);

  // Логіка кнопки Favorites
  const favBtn = document.querySelector('#fav-btn');
  updateFavButton(favBtn, isFavorite(currentExerciseData._id));

  favBtn.addEventListener('click', () => {
    toggleFavorite(currentExerciseData);
    const isNowFav = isFavorite(currentExerciseData._id);
    updateFavButton(favBtn, isNowFav);
  });

  // Логіка кнопки "Give a rating"
  const giveRatingBtn = document.querySelector('.rating-btn');
  if (giveRatingBtn) {
    giveRatingBtn.addEventListener('click', openRatingModal);
  }
}

function closeExerciseModal() {
  exerciseBackdrop.classList.add('is-hidden');
  document.body.style.overflow = '';
  
  window.removeEventListener('keydown', onExerciseEscPress);
  exerciseBackdrop.removeEventListener('click', onExerciseBackdropClick);
  
  exerciseBackdrop.innerHTML = '';
  currentExerciseData = null;
}

function onExerciseBackdropClick(e) {
  if (e.target === exerciseBackdrop) closeExerciseModal();
}

function onExerciseEscPress(e) {
  if (e.code === 'Escape') closeExerciseModal();
}

// =======================================================
// МОДАЛКА 2: RATING
// =======================================================

// Змінна для зберігання обраної оцінки користувачем
let currentRatingValue = 0; 

function renderRatingModal() {
  // Зверни увагу: з textarea я прибрав атрибут required
  ratingBackdrop.innerHTML = `
    <div class="rating-modal-window">
      <button type="button" class="close-btn" id="rating-modal-close">
        <svg class="icon-close" width="16" height="16"><use href="${spriteHref('icon-close')}"></use></svg>
      </button>
      
      <form class="rating-form" id="rating-form">
        <div class="rating-container">
          <span class="rating-label">Rating</span>
          <div class="rating-stars-block">
            <span class="rating-value" id="rating-value-display">0.0</span>
            <div class="stars-group">
              <svg class="star-icon" data-value="1"><use href="${spriteHref('icon-star')}"></use></svg>
              <svg class="star-icon" data-value="2"><use href="${spriteHref('icon-star')}"></use></svg>
              <svg class="star-icon" data-value="3"><use href="${spriteHref('icon-star')}"></use></svg>
              <svg class="star-icon" data-value="4"><use href="${spriteHref('icon-star')}"></use></svg>
              <svg class="star-icon" data-value="5"><use href="${spriteHref('icon-star')}"></use></svg>
            </div>
          </div>
        </div>
        
        <input type="email" name="email" class="rating-input" placeholder="Email" required />
        <textarea name="comment" class="rating-textarea" placeholder="Your comment"></textarea>
        
        <button type="submit" class="rating-send-btn">Send</button>
      </form>
    </div>
  `;
}

function initRatingLogic() {
  const stars = document.querySelectorAll('.star-icon');
  const ratingDisplay = document.querySelector('#rating-value-display');
  const form = document.querySelector('#rating-form');

  // Функція для зафарбовування зірок до певного індексу
  const fillStars = (value) => {
    stars.forEach((star, index) => {
      if (index < value) {
        star.classList.add('active');
      } else {
        star.classList.remove('active');
      }
    });
  };

  // 1. Логіка наведення та кліку по зірках
  stars.forEach((star) => {
    // Коли мишка заходить на зірку
    star.addEventListener('mouseenter', function () {
      const hoverValue = this.dataset.value;
      fillStars(hoverValue);
    });

    // Коли мишка йде з зірки (повертаємо до обраного значення)
    star.addEventListener('mouseleave', function () {
      fillStars(currentRatingValue);
    });

    // Коли клікаємо (фіксуємо значення)
    star.addEventListener('click', function () {
      currentRatingValue = Number(this.dataset.value);
      ratingDisplay.textContent = currentRatingValue.toFixed(1); // Робимо 4.0 замість 4
      fillStars(currentRatingValue);
    });
  });

  // 2. Логіка відправки форми
  form.addEventListener('submit', (e) => {
    e.preventDefault(); // Зупиняємо стандартну перезавантаження сторінки

    // Перевіряємо, чи поставили оцінку
   // Перевіряємо, чи поставили оцінку
    if (currentRatingValue === 0) {
      iziToast.warning({
        title: 'Увага',
        message: 'Будь ласка, оберіть оцінку від 1 до 5 зірочок!',
        position: 'topCenter', // По центру зверху — найпомітніше місце
        timeout: 5000,         // Зникатиме повільніше (5 секунд)
        backgroundColor: '#eea10c', // Жовтий колір, як ваші зірочки
        titleColor: '#242424',
        messageColor: '#242424', 
        iconColor: '#242424',  
        progressBarColor: '#242424', 
        titleSize: '16px',    
        messageSize: '16px'    
      });
      return; 
    }

    // Збираємо дані
    const userEmail = form.elements.email.value.trim();
    const userComment = form.elements.comment.value.trim();

    const requestData = {
      rate: currentRatingValue,
      email: userEmail,
      review: userComment,
    };

    console.log('Дані готові до відправки на бекенд:', requestData);
    
    // ТУТ БУДЕ ВАШ ПАТЧ-ЗАПИТ НА СЕРВЕР 
    // наприклад: await patchExerciseRating(currentExerciseData._id, requestData);

    // Після успішної відправки очищаємо форму і закриваємо модалку
    form.reset();
    currentRatingValue = 0;
    closeRatingModal();
  });
}

function openRatingModal() {
  renderRatingModal();
  ratingBackdrop.classList.remove('is-hidden');
  
  // Додаємо слухачі закриття
  document.querySelector('#rating-modal-close').addEventListener('click', closeRatingModal);
  ratingBackdrop.addEventListener('click', onRatingBackdropClick);
  window.removeEventListener('keydown', onExerciseEscPress);
  window.addEventListener('keydown', onRatingEscPress);

  // ІНІЦІАЛІЗУЄМО ЛОГІКУ ФОРМИ ТА ЗІРОК
  initRatingLogic();
}

function closeRatingModal() {
  ratingBackdrop.classList.add('is-hidden');
  window.removeEventListener('keydown', onRatingEscPress);
  ratingBackdrop.removeEventListener('click', onRatingBackdropClick);
  window.addEventListener('keydown', onExerciseEscPress);
  
  ratingBackdrop.innerHTML = '';
  currentRatingValue = 0; // Скидаємо оцінку при закритті
}

function onRatingBackdropClick(e) {
  if (e.target === ratingBackdrop) closeRatingModal();
}

function onRatingEscPress(e) {
  if (e.code === 'Escape') closeRatingModal();
}