// ============================================================
//  МОДАЛКА ВПРАВИ — відповідальний: [ПОСТАВ ІМ'Я]
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
// TODO: закриття (backdrop, хрести, ESC) + removeEventListener
