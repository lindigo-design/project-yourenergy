// ============================================================
//  МОДАЛКА ВПРАВИ — відповідальний: [Анастасія Потоцька]
//
//  Що реалізувати (ТЗ п.27-30):
//  - Слухати EXERCISE_OPEN → getExerciseById(id) → показати модалку
//  - Вміст: відео (якщо є), назва, рейтинг, мета, частина тіла,
//    популярність, калорії, опис
//  - Кнопка Add to Favorites / Remove from Favorites
//    (використовуй toggleFavorite з favorites-storage.js)
//  - Кнопка Give a rating (ДОДАТКОВО — якщо команда встигне)
//  - Закриття: клік по backdrop, клік по хрестику, ESC
//  - ВАЖЛИВО: removeEventListener при закритті!
//
//  СЛУХАЄ: EVENTS.EXERCISE_OPEN
//  КИДАЄ:  FAVORITES_CHANGED (через toggleFavorite, автоматом)
//
//  Твоя розмітка: src/partials/modal-exercise.html
//  Твої стилі:    src/css/components/modal-exercise.css
// ============================================================

import { getExerciseById } from './api.js';
import { EVENTS } from './constants.js';
import { isFavorite, toggleFavorite } from './favorites-storage.js';
import { showLoader, hideLoader } from './loader.js';

// TODO: слухати EXERCISE_OPEN
// TODO: запит getExerciseById, рендер
// TODO: toggle Favorites + оновлення UI кнопки
// TODO: закриття (backdrop, хрестик, ESC) + removeEventListener

const backdrop = document.querySelector('#exercise-modal-backdrop');

// Глобальна змінна для цього файлу, щоб мати доступ до даних вправи при кліку на "Favorites"
let currentExerciseData = null; 

// 1. Чекаємо на команду "Відкрийся"
document.addEventListener(EVENTS.EXERCISE_OPEN, async (event) => {
  const id = event.detail.id; // отримуємо ID вправи
  
  try {
    showLoader(); // Показуємо лоадер, поки чекаємо дані
    const exercise = await getExerciseById(id); // Тягнемо дані з API
    
    currentExerciseData = exercise; // Зберігаємо дані
    
    renderModal(exercise); // Створюємо HTML
    openModal(); // Показуємо модалку і вішаємо слухачі
  } catch (error) {
    console.error('Помилка при завантаженні вправи:', error);
  } finally {
    hideLoader(); // Ховаємо лоадер у будь-якому випадку
  }
});

// 2. Рендеримо вміст (HTML)
function renderModal(data) {
  const { _id, name, rating, gifUrl, target, bodyPart, equipment, popularity, burnedCalories, description } = data;

  const favBtnText = isFavorite(_id) ? 'Remove from favorites' : 'Add to favorites';

  backdrop.innerHTML = `
    <div class="modal-window">
      <button class="close-btn" id="modal-close">
        <svg class="icon-close" width="14" height="14"><use href="./img/icons.svg#icon-close"></use></svg>
      </button>
      
      <div class="modal-layout">
        <img src="${gifUrl}" alt="${name}" class="modal-img">
        
        <div class="modal-info">
          <h2 class="modal-title">${name}</h2>
          <div class="modal-rating">${rating} ★★★★☆</div>
          
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
              <svg class="icon-heart" width="18" height="18"><use href="./img/icons.svg#icon-heart"></use></svg>
            </button>
            <button class="rating-btn">Give a rating</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

// 3. Управління станом (Відкриття/Закриття)
function openModal() {
  backdrop.classList.remove('is-hidden');
  document.body.style.overflow = 'hidden'; // Блокуємо скрол сайту

  // Вішаємо слухачі на закриття
  document.querySelector('#modal-close').addEventListener('click', closeModal);
  backdrop.addEventListener('click', onBackdropClick);
  window.addEventListener('keydown', onEscPress);

  // Слухач на кнопку Фаворитів
  const favBtn = document.querySelector('#fav-btn');
  favBtn.addEventListener('click', () => {
    // Функція твоєї напарниці оновлює localStorage
    toggleFavorite(currentExerciseData); 
    
    // Оновлюємо текст кнопки на льоту
    const isNowFav = isFavorite(currentExerciseData._id);
    const textSpan = favBtn.querySelector('span');
    textSpan.textContent = isNowFav ? 'Remove from favorites' : 'Add to favorites';
  });
}

function closeModal() {
  backdrop.classList.add('is-hidden');
  document.body.style.overflow = ''; // Повертаємо скрол
  
  // ВАЖЛИВО: знімаємо глобальні слухачі
  window.removeEventListener('keydown', onEscPress);
  backdrop.removeEventListener('click', onBackdropClick);
  
  // Очищаємо вміст (це автоматично видалить слухачі з кнопок всередині модалки)
  backdrop.innerHTML = ''; 
  currentExerciseData = null; // Очищаємо збережені дані
}

function onBackdropClick(e) {
  // Закриваємо тільки якщо клік був по сірому фону, а не по самому вікну
  if (e.target === backdrop) closeModal();
}

function onEscPress(e) {
  if (e.code === 'Escape') closeModal();
}