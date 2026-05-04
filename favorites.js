import"./assets/api-DAy8TE4Z.js";import"./assets/vendor-BDZUw2d6.js";const n={FAVORITES:"yourenergy:favorites",QUOTE:"yourenergy:quote",QUOTE_DATE:"yourenergy:quote-date"},r={FILTER_CHANGED:"yourenergy:filter-changed",CATEGORY_SELECTED:"yourenergy:category-selected",SEARCH_SUBMITTED:"yourenergy:search-submitted",EXERCISE_OPEN:"yourenergy:exercise-open",FAVORITES_CHANGED:"yourenergy:favorites-changed"};function l(){try{const e=localStorage.getItem(n.FAVORITES);return e?JSON.parse(e):[]}catch{return[]}}function u(e){const i=l().filter(s=>s._id!==e);localStorage.setItem(n.FAVORITES,JSON.stringify(i)),window.dispatchEvent(new CustomEvent(r.FAVORITES_CHANGED))}const t=document.querySelector(".favorites-list"),a=document.querySelector(".favorites-empty-text");function m(e){const{_id:i,name:s,burnedCalories:c,time:v,bodyPart:f,target:d}=e;return`
    <li class="favorite-item" data-id="${i}">
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
        <h3 class="favorite-item-title">${s}</h3>
      </div>
      
      <ul class="favorite-item-info-list">
        <li class="favorite-item-info-item">
          <span class="favorite-item-info-label">Burned calories:</span>
          <span class="favorite-item-info-value">${c} / ${v} min</span>
        </li>
        <li class="favorite-item-info-item">
          <span class="favorite-item-info-label">Body part:</span>
          <span class="favorite-item-info-value">${f}</span>
        </li>
        <li class="favorite-item-info-item">
          <span class="favorite-item-info-label">Target:</span>
          <span class="favorite-item-info-value">${d}</span>
        </li>
      </ul>
    </li>
  `}function o(){if(!t||!a)return;const e=l();e.length===0?(a.style.display="block",t.style.display="none",t.innerHTML=""):(a.style.display="none",t.style.display="",t.innerHTML=e.map(m).join(""))}t&&(o(),window.addEventListener(r.FAVORITES_CHANGED,o),t.addEventListener("click",e=>{const i=e.target.closest(".favorite-item");if(!i)return;const s=i.dataset.id;if(e.target.closest(".favorite-item-trash-btn")){u(s);return}if(e.target.closest(".favorite-item-start-btn")){window.dispatchEvent(new CustomEvent(r.EXERCISE_OPEN,{detail:{exerciseId:s}}));return}}));console.log("[YourEnergy] Favorites page loaded");
//# sourceMappingURL=favorites.js.map
