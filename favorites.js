import{b as o,E as v,r as m,d as x,c as b}from"./assets/scroll-up-yDhhfrJE.js";import"./assets/vendor-DT-nbzqF.js";function w(t,e=!0){const{_id:s,name:r,burnedCalories:i,time:u,bodyPart:p,target:g,rating:f}=t,h=e?`<button class="exercise-card-trash-btn" type="button" aria-label="Remove from favorites">
         <svg width="16" height="16">
           <use href="${o("icon-trash")}"></use>
         </svg>
       </button>`:`<div class="exercise-card-rating">
         <span class="exercise-card-rating-value">${f?Math.round(f*10)/10:"0.0"}</span>
         <svg class="exercise-card-rating-icon" width="13" height="13">
           <use href="${o("icon-star")}"></use>
         </svg>
       </div>`;return`
    <li class="exercise-card" data-id="${s}">
      <div class="exercise-card-header">
        <div class="exercise-card-badge-wrap">
          <span class="exercise-card-badge">WORKOUT</span>
          ${h}
        </div>
        <button class="exercise-card-start-btn" type="button">
          Start
          <svg width="16" height="16">
            <use href="${o("icon-arrow-right")}"></use>
          </svg>
        </button>
      </div>
      
      <div class="exercise-card-title-wrap">
        <div class="exercise-card-icon-wrap">
          <svg class="exercise-card-icon" width="24" height="24">
            <use href="${o("icon-run")}"></use>
          </svg>
        </div>
        <h3 class="exercise-card-title">${r}</h3>
      </div>
      
      <ul class="exercise-card-info-list">
        <li class="exercise-card-info-item">
          <span class="exercise-card-info-label">Burned calories:</span>
          <span class="exercise-card-info-value">${i} / ${u} min</span>
        </li>
        <li class="exercise-card-info-item">
          <span class="exercise-card-info-label">Body part:</span>
          <span class="exercise-card-info-value">${p}</span>
        </li>
        <li class="exercise-card-info-item">
          <span class="exercise-card-info-label">Target:</span>
          <span class="exercise-card-info-value">${g}</span>
        </li>
      </ul>
    </li>
  `}const a=document.querySelector(".favorites-list"),l=document.querySelector(".favorites-empty-text"),n=document.querySelector(".favorites-pagination");let c=1;function y(){return window.matchMedia("(min-width: 1280px)").matches?1/0:window.matchMedia("(min-width: 768px)").matches?10:8}function E(t,e){if(!n)return;if(e===1/0||t<=e){n.innerHTML="";return}const s=Math.ceil(t/e);let r="";for(let i=1;i<=s;i++)r+=`<button class="favorites-pagination-btn ${i===c?"is-active":""}" data-page="${i}">${i}</button>`;n.innerHTML=r}function d(){if(!a||!l)return;const t=x();if(t.length===0){l.style.display="block",a.style.display="none",a.innerHTML="",n&&(n.innerHTML="");return}l.style.display="none",a.style.display="grid";const e=y(),s=Math.ceil(t.length/e);c>s&&s>0&&(c=s);let r=t;if(e!==1/0){const i=(c-1)*e;r=t.slice(i,i+e)}a.innerHTML=r.map(i=>w(i,!0)).join(""),E(t.length,e)}if(a){d(),window.addEventListener(v.FAVORITES_CHANGED,d),a.addEventListener("click",e=>{const s=e.target.closest(".exercise-card");if(!s)return;const r=s.dataset.id;if(e.target.closest(".exercise-card-trash-btn")){m(r);return}if(e.target.closest(".exercise-card-start-btn")){document.dispatchEvent(new CustomEvent(v.EXERCISE_OPEN,{detail:{id:r}}));return}}),n&&n.addEventListener("click",e=>{const s=e.target.closest(".favorites-pagination-btn");s&&(c=Number(s.dataset.page),d(),document.querySelector(".favorites-section").scrollIntoView({behavior:"smooth"}))});let t;window.addEventListener("resize",()=>{clearTimeout(t),t=setTimeout(d,200)})}window.__SPRITE_URL__=b;console.log("[YourEnergy] Favorites page loaded");
//# sourceMappingURL=favorites.js.map
