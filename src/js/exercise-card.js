import { spriteHref } from './sprite.js';
export function createExerciseCardMarkup(exercise, isFavoritePage = true) {
  const { _id, name, burnedCalories, time, bodyPart, target, rating } =
    exercise;

  const topActionMarkup = isFavoritePage
    ? `<button class="exercise-card-trash-btn" type="button" aria-label="Remove from favorites">
         <svg width="16" height="16">
           <use href="${spriteHref('icon-trash')}"></use>
         </svg>
       </button>`
    : `<div class="exercise-card-rating">
         <span class="exercise-card-rating-value">${rating ? Math.round(rating * 10) / 10 : '0.0'}</span>
         <svg class="exercise-card-rating-icon" width="13" height="13">
           <use href="${spriteHref('icon-star')}"></use>
         </svg>
       </div>`;

  return `
    <li class="exercise-card" data-id="${_id}">
      <div class="exercise-card-header">
        <div class="exercise-card-badge-wrap">
          <span class="exercise-card-badge">WORKOUT</span>
          ${topActionMarkup}
        </div>
        <button class="exercise-card-start-btn" type="button">
          Start
          <svg width="16" height="16">
            <use href="${spriteHref('icon-arrow-right')}"></use>
          </svg>
        </button>
      </div>
      
      <div class="exercise-card-title-wrap">
        <div class="exercise-card-icon-wrap">
          <svg class="exercise-card-icon" width="24" height="24">
            <use href="${spriteHref('icon-run')}"></use>
          </svg>
        </div>
        <h3 class="exercise-card-title">${name}</h3>
      </div>
      
      <ul class="exercise-card-info-list">
        <li class="exercise-card-info-item">
          <span class="exercise-card-info-label">Burned calories:</span>
          <span class="exercise-card-info-value">${burnedCalories} / ${time} min</span>
        </li>
        <li class="exercise-card-info-item">
          <span class="exercise-card-info-label">Body part:</span>
          <span class="exercise-card-info-value">${bodyPart}</span>
        </li>
        <li class="exercise-card-info-item">
          <span class="exercise-card-info-label">Target:</span>
          <span class="exercise-card-info-value">${target}</span>
        </li>
      </ul>
    </li>
  `;
}
