import{a as N,i as p}from"./vendor-DT-nbzqF.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function n(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(s){if(s.ep)return;s.ep=!0;const o=n(s);fetch(s.href,o)}})();const re="/project-yourenergy/assets/sprite-CoNrl85I.svg";(()=>{const e={openMenuBtn:document.querySelector("[data-menu-open]"),closeMenuBtn:document.querySelector("[data-menu-close]"),menu:document.querySelector("[data-menu]"),menuLinks:document.querySelectorAll(".nav-link, .mobile-nav-link")};e.openMenuBtn&&e.openMenuBtn.addEventListener("click",t),e.closeMenuBtn&&e.closeMenuBtn.addEventListener("click",t),e.menuLinks.forEach(s=>{s.addEventListener("click",()=>{e.menu&&e.menu.classList.contains("is-open")&&t()})}),document.addEventListener("keydown",s=>{s.key==="Escape"&&e.menu&&e.menu.classList.contains("is-open")&&t()});function t(){e.menu&&(e.menu.classList.toggle("is-open"),document.body.classList.toggle("no-scroll"))}function n(s){const a=s.replace(/\\/g,"/").split("/").filter(Boolean);return a.length?a[a.length-1]:"index.html"}function i(){const s=n(window.location.pathname),o=document.querySelectorAll(".nav-link, .mobile-nav-link");o.forEach(a=>a.classList.remove("is-active")),o.forEach(a=>{const u=a.getAttribute("href");if(!u)return;n(u)===s&&a.classList.add("is-active")})}i()})();const g={FAVORITES:"yourenergy:favorites",QUOTE:"yourenergy:quote",QUOTE_DATE:"yourenergy:quote-date"},S={FILTER_CHANGED:"yourenergy:filter-changed",CATEGORY_SELECTED:"yourenergy:category-selected",SEARCH_SUBMITTED:"yourenergy:search-submitted",EXERCISE_OPEN:"yourenergy:exercise-open",FAVORITES_CHANGED:"yourenergy:favorites-changed"},ce={CATEGORIES_DESKTOP:12,CATEGORIES_MOBILE:9,EXERCISES_DESKTOP:10,EXERCISES_MOBILE:8},P=/^\w+(\.\w+)?@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,F="https://your-energy.b.goit.study/api",v=N.create({baseURL:F,timeout:1e4});async function le({filter:e,page:t=1,limit:n=12}){const{data:i}=await v.get("/filters",{params:{filter:e,page:t,limit:n}});return i}async function de(e={}){const{page:t=1,limit:n=10,...i}=e,{data:s}=await v.get("/exercises",{params:{...i,page:t,limit:n}});return s}async function D(e){const{data:t}=await v.get(`/exercises/${e}`);return t}async function H(){const{data:e}=await v.get("/quote");return e}async function U(e){const{data:t}=await v.post("/subscription",{email:e});return t}let f=0;function A(){let e=document.querySelector(".js-loader");return e||(e=document.createElement("div"),e.className="js-loader loader",e.innerHTML='<div class="loader__spinner"></div>',e.style.display="none",document.body.appendChild(e)),e}function Q(){f++,A().style.display="flex"}function z(){f=Math.max(0,f-1),f===0&&(A().style.display="none")}const V="/project-yourenergy/".replace(/\/$/,"");function r(e){return`${V}/images/sprite.svg#${e}`}function L(){try{const e=localStorage.getItem(g.FAVORITES);return e?JSON.parse(e):[]}catch{return[]}}function h(e){return L().some(t=>t._id===e)}function G(e){const t=L();t.some(n=>n._id===e._id)||(t.push(e),localStorage.setItem(g.FAVORITES,JSON.stringify(t)),window.dispatchEvent(new CustomEvent(S.FAVORITES_CHANGED)))}function j(e){const t=L().filter(n=>n._id!==e);localStorage.setItem(g.FAVORITES,JSON.stringify(t)),window.dispatchEvent(new CustomEvent(S.FAVORITES_CHANGED))}function J(e){return h(e._id)?(j(e._id),!1):(G(e),!0)}const l=document.querySelector("#exercise-modal-backdrop"),d=document.querySelector("#rating-modal-backdrop");let m=null;function w(e){return typeof e!="string"?"":e.charAt(0).toUpperCase()+e.slice(1)}function T(e,t){const n=e.querySelector("span"),i=e.querySelector("use");t?(n.textContent="Remove from favorites",i.setAttribute("href",r("icon-trash"))):(n.textContent="Add to favorites",i.setAttribute("href",r("icon-heart")))}function W(e){const t=Math.round(e||0);let n="";for(let i=1;i<=5;i++)n+=`
      <svg class="star ${i<=t?"active":""}" width="18" height="18">
        <use href="${r("icon-star")}"></use>
      </svg>
    `;return n}document.addEventListener(S.EXERCISE_OPEN,async e=>{const t=e.detail.id;try{Q();const n=await D(t);m=n,Y(n),K()}catch(n){console.error("Помилка при завантаженні вправи:",n)}finally{z()}});function Y(e){const{_id:t,name:n,rating:i,gifUrl:s,target:o,bodyPart:a,equipment:u,popularity:x,burnedCalories:I,description:M}=e,B=h(t)?"Remove from favorites":"Add to favorites";l.innerHTML=`
    <div class="modal-window">
      <button class="close-btn" id="modal-close">
        <svg class="icon-close" width="14" height="14"><use href="${r("icon-close")}"></use></svg>
      </button>
      <div class="modal-layout">
        <img src="${s}" alt="${n}" class="modal-img">
        <div class="modal-info">
          <h2 class="modal-title">${n}</h2>
          <div class="modal-rating">
            <span>${i.toFixed(1)}</span>
            <span class="stars">${W(i)}</span>
          </div>
          <div class="divider divider-top"></div>
          <ul class="modal-stats">
            <li><span>Target</span><span>${w(o)}</span></li>
            <li><span>Body Part</span><span>${w(a)}</span></li>
            <li><span>Equipment</span><span>${w(u)}</span></li>
            <li><span>Popular</span><span>${x}</span></li>
          </ul>
          <div class="modal-calories"><span>Burned calories</span> ${I}/3 min</div>
          <div class="divider divider-bottom"></div>
          <p class="modal-description">${M}</p>
          <div class="modal-buttons">
            <button class="fav-btn modal-exercise-btn" id="fav-btn" data-id="${t}">
              <span>${B}</span>
              <svg class="icon-heart" width="18" height="18"><use href="${r("icon-heart")}"></use></svg>
            </button>
            <button class="rating-btn modal-exercise-btn">Give a rating</button>
          </div>
        </div>
      </div>
    </div>
  `}function K(){l.classList.remove("is-hidden"),document.body.style.overflow="hidden",document.querySelector("#modal-close").addEventListener("click",q),l.addEventListener("click",C),window.addEventListener("keydown",y);const e=document.querySelector("#fav-btn");T(e,h(m._id)),e.addEventListener("click",()=>{J(m);const n=h(m._id);T(e,n)});const t=document.querySelector(".rating-btn");t&&t.addEventListener("click",ee)}function q(){l.classList.add("is-hidden"),document.body.style.overflow="",window.removeEventListener("keydown",y),l.removeEventListener("click",C),l.innerHTML="",m=null}function C(e){e.target===l&&q()}function y(e){e.code==="Escape"&&q()}let c=0;function X(){d.innerHTML=`
    <div class="rating-modal-window">
      <button type="button" class="close-btn" id="rating-modal-close">
        <svg class="icon-close" width="16" height="16"><use href="${r("icon-close")}"></use></svg>
      </button>
      
      <form class="rating-form" id="rating-form">
        <div class="rating-container">
          <span class="rating-label">Rating</span>
          <div class="rating-stars-block">
            <span class="rating-value" id="rating-value-display">0.0</span>
            <div class="stars-group">
              <svg class="star-icon" data-value="1"><use href="${r("icon-star")}"></use></svg>
              <svg class="star-icon" data-value="2"><use href="${r("icon-star")}"></use></svg>
              <svg class="star-icon" data-value="3"><use href="${r("icon-star")}"></use></svg>
              <svg class="star-icon" data-value="4"><use href="${r("icon-star")}"></use></svg>
              <svg class="star-icon" data-value="5"><use href="${r("icon-star")}"></use></svg>
            </div>
          </div>
        </div>
        
        <input type="email" name="email" class="rating-input" placeholder="Email" required />
        <textarea name="comment" class="rating-textarea" placeholder="Your comment"></textarea>
        
        <button type="submit" class="rating-send-btn">Send</button>
      </form>
    </div>
  `}function Z(){const e=document.querySelectorAll(".star-icon"),t=document.querySelector("#rating-value-display"),n=document.querySelector("#rating-form"),i=s=>{e.forEach((o,a)=>{a<s?o.classList.add("active"):o.classList.remove("active")})};e.forEach(s=>{s.addEventListener("mouseenter",function(){const o=this.dataset.value;i(o)}),s.addEventListener("mouseleave",function(){i(c)}),s.addEventListener("click",function(){c=Number(this.dataset.value),t.textContent=c.toFixed(1),i(c)})}),n.addEventListener("submit",s=>{if(s.preventDefault(),c===0){p.warning({title:"Увага",message:"Будь ласка, оберіть оцінку від 1 до 5 зірочок!",position:"topCenter",timeout:5e3,backgroundColor:"#eea10c",titleColor:"#242424",messageColor:"#242424",iconColor:"#242424",progressBarColor:"#242424",titleSize:"16px",messageSize:"16px"});return}const o=n.elements.email.value.trim(),a=n.elements.comment.value.trim();console.log("Дані готові до відправки на бекенд:",{rate:c,email:o,review:a}),n.reset(),c=0,E()})}function ee(){X(),d.classList.remove("is-hidden"),document.querySelector("#rating-modal-close").addEventListener("click",E),d.addEventListener("click",R),window.removeEventListener("keydown",y),window.addEventListener("keydown",O),Z()}function E(){d.classList.add("is-hidden"),window.removeEventListener("keydown",O),d.removeEventListener("click",R),window.addEventListener("keydown",y),d.innerHTML="",c=0}function R(e){e.target===d&&E()}function O(e){e.code==="Escape"&&E()}const k="/project-yourenergy/assets/women-sportswear-taking-break-from-workout_1_mob@2x-ByRx5w-t.png";function $(){return new Date().toISOString().slice(0,10)}function te(){const e=localStorage.getItem(g.QUOTE);if(!e)return null;const t=JSON.parse(e);return t.date===$()?t:null}function ne(e){localStorage.setItem(g.QUOTE,JSON.stringify({...e,date:$()}))}function se(){const e=document.querySelector(".quote-wrapper");!e||e.innerHTML.trim()||(e.innerHTML=`
    <div class="quote-card">
      <div class="quote-card-top">
        <div class="quote-card-icon-wrap">
          <svg width="18" height="18" aria-hidden="true"><use href="${r("icon-run")}"></use></svg>
        </div>
        <p class="quote-card-title">Quote of the day</p>
        <svg class="quote-mark" width="24" height="24" aria-hidden="true"><use href="${r("icon-quote")}"></use></svg>
      </div>
      <blockquote class="quote-text"></blockquote>
      <p class="quote-author"></p>
    </div>
    <div class="quote-photo-wrap">
      <img
        src="${k}"
        srcset="${k} 2x"
        alt="Women working out"
        class="quote-photo"
        width="290"
        height="242"
      />
    </div>
    <div class="daily-norm-card">
      <div class="daily-norm-header">
        <div class="daily-norm-icon-wrap">
          <svg width="20" height="20" aria-hidden="true"><use href="${r("icon-dumbbell")}"></use></svg>
        </div>
        <div>
          <p class="daily-norm-time">110 min</p>
          <p class="daily-norm-subtitle">Daily norm of sports</p>
        </div>
      </div>
      <p class="daily-norm-text">The World Health Organization recommends at least 150 minutes of moderate-intensity aerobic physical activity throughout the week for adults aged 18-64. However, what happens if we adjust that number to 110 minutes every day? While it might seem like a high number to hit, dedicating 110 minutes daily to sporting activities may offer unparalleled benefits to physical health, mental well-being, and overall quality of life.</p>
    </div>
  `)}function ie({quote:e,author:t}){document.querySelectorAll(".quote-text").forEach(n=>{n.textContent=e}),document.querySelectorAll(".quote-author").forEach(n=>{n.textContent=t})}function _(){const e=document.querySelector(".daily-norm-text");if(!e){setTimeout(_,100);return}e.dataset.originalText||(e.dataset.originalText=e.textContent.trim());const t=e.dataset.originalText;function n(){const i=window.innerWidth,s=i<768?169:i<1280?179:t.length;e.textContent=t.length>s?t.substring(0,s).trim()+"...":t}n(),window.addEventListener("resize",n)}async function oe(){try{let e=te();e||(e=await H(),ne(e)),se(),ie(e),_()}catch(e){console.error("initQuoteSection error:",e)}}oe();document.addEventListener("submit",async e=>{var i,s;if(!e.target.matches("#subscribe-form"))return;e.preventDefault();const n=e.target.elements.email.value.trim();if(!P.test(n)){p.error({message:"Please enter a valid email address.",position:"topRight"});return}try{await U(n),p.success({message:"You have successfully subscribed!",position:"topRight"}),e.target.reset()}catch(o){const a=((s=(i=o.response)==null?void 0:i.data)==null?void 0:s.message)??"Subscription failed. Please try again.";p.error({message:a,position:"topRight"})}});const b=document.querySelector(".scroll-up");if(b){let e=function(){b.hidden=window.scrollY<=300};e(),window.addEventListener("scroll",e,{passive:!0}),b.addEventListener("click",()=>{window.scrollTo({top:0,behavior:"smooth"})})}export{S as E,ce as P,de as a,r as b,re as c,L as d,le as g,z as h,j as r,Q as s};
//# sourceMappingURL=scroll-up-4LmJLyM1.js.map
