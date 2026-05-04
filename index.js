import{E as d,s as B,g as R,h as N,a as k,b as $,P as w,c as O}from"./assets/scroll-up-4LmJLyM1.js";import"./assets/vendor-DT-nbzqF.js";const H=document.querySelectorAll(".filter-btn");function _(e){H.forEach(t=>{t.classList.remove("active"),t.setAttribute("aria-pressed","false")}),e.classList.add("active"),e.setAttribute("aria-pressed","true")}H.forEach(e=>{e.addEventListener("click",()=>{_(e),document.dispatchEvent(new CustomEvent(d.FILTER_CHANGED,{detail:{filter:e.dataset.filter}}))})});const x=document.querySelector('.filter-btn[data-filter="Muscles"]');x&&(_(x),setTimeout(()=>{document.dispatchEvent(new CustomEvent(d.FILTER_CHANGED,{detail:{filter:"Muscles"}}))},0));const E=document.getElementById("categories-container"),f=document.querySelector(".categories-wrapper"),T=document.querySelector(".exercises-wrapper"),C=document.getElementById("search-form"),m=document.getElementById("pagination-container");let q="Muscles",o=1;document.addEventListener(d.FILTER_CHANGED,async e=>{q=e.detail.filter,o=1,T&&T.classList.add("visually-hidden"),f&&f.classList.remove("visually-hidden"),C&&C.classList.add("visually-hidden");const t=document.getElementById("category-slash"),a=document.getElementById("selected-category-name");t&&t.classList.add("visually-hidden"),a&&(a.textContent=""),await h()});async function h(){try{B();const t=window.innerWidth<768?9:12,a=await R({filter:q,page:o,limit:t});if(!a||a.results.length===0){E.innerHTML='<p class="no-results">No categories found.</p>',m.innerHTML="";return}P(a.results),W(a.totalPages)}catch(e){console.error(e)}finally{N()}}function P(e){E.innerHTML=e.map(({filter:t,name:a,imgURL:s})=>`
            <li class="category-item">
                <button class="category-card-btn" data-filter="${t}" data-name="${a}">
                    <img src="${s}" alt="${a}" class="category-img" loading="lazy" />
                    <div class="category-content">
                        <h3 class="category-name">${a}</h3>
                        <p class="category-label">${t}</p>
                    </div>
                </button>
            </li>
        `).join(""),E.querySelectorAll(".category-card-btn").forEach(t=>{t.addEventListener("click",()=>{document.dispatchEvent(new CustomEvent(d.CATEGORY_SELECTED,{detail:{filter:t.dataset.filter,category:t.dataset.name}}))})})}function D(e,t){if(t<=4)return Array.from({length:t},(i,u)=>u+1);let a=Math.max(1,e-1),s=Math.min(t,a+2);a=Math.max(1,s-2);const n=[];a>1&&n.push("...");for(let i=a;i<=s;i++)n.push(i);return s<t&&n.push("..."),n}function W(e){if(!e||e<=1){m.innerHTML="";return}const t=o===1,a=o===e,s=D(o,e);m.innerHTML=`
        <button class="pagination-nav-btn" type="button" data-action="first" ${t?"disabled":""} aria-label="First page">«</button>
        <button class="pagination-nav-btn" type="button" data-action="prev" ${t?"disabled":""} aria-label="Previous page">‹</button>
        ${s.map(n=>n==="..."?'<span class="pagination-ellipsis">...</span>':`<button class="pagination-btn ${n===o?"active":""}" type="button" data-page="${n}">${n}</button>`).join("")}
        <button class="pagination-nav-btn" type="button" data-action="next" ${a?"disabled":""} aria-label="Next page">›</button>
        <button class="pagination-nav-btn" type="button" data-action="last" ${a?"disabled":""} aria-label="Last page">»</button>
    `,m.querySelectorAll(".pagination-btn").forEach(n=>{n.addEventListener("click",async()=>{o=Number(n.dataset.page),await h()})}),m.querySelectorAll(".pagination-nav-btn:not([disabled])").forEach(n=>{n.addEventListener("click",async()=>{const i=n.dataset.action;i==="first"?o=1:i==="prev"?o=Math.max(1,o-1):i==="next"?o=Math.min(e,o+1):i==="last"&&(o=e),await h()})})}let M;window.addEventListener("resize",()=>{clearTimeout(M),M=setTimeout(()=>{f&&!f.classList.contains("visually-hidden")&&(o=1,h())},300)});const v=document.getElementById("exercises-container"),S=document.querySelector(".exercises-wrapper"),I=document.querySelector(".categories-wrapper"),y=document.getElementById("search-form"),p=document.getElementById("search-input"),c=document.getElementById("search-clear-btn"),G=document.getElementById("selected-category-name"),z=document.getElementById("category-slash"),g=document.getElementById("pagination-container");let F="",L="",b="",r=1;const j=()=>window.innerWidth>=768?w.EXERCISES_DESKTOP:w.EXERCISES_MOBILE;document.addEventListener(d.CATEGORY_SELECTED,async e=>{const{filter:t,category:a}=e.detail;F=t,L=a,r=1,b="",G.textContent=a,z.classList.remove("visually-hidden"),I&&I.classList.add("visually-hidden"),S&&S.classList.remove("visually-hidden"),y&&(y.classList.remove("visually-hidden"),y.reset(),c&&(c.hidden=!0)),await l()});async function l(){try{B();const e=F.toLowerCase().replace(/\s+/g,""),a={[e==="bodyparts"?"bodypart":e]:L,keyword:b,page:r,limit:j()},s=await k(a);if(!s||s.results.length===0){v.innerHTML='<p class="no-results">Sorry, no exercises found.</p>',g.innerHTML="";return}K(s.results),X(s.totalPages)}catch(e){console.error(e)}finally{N()}}function K(e){v.innerHTML=e.map(({_id:t,name:a,burnedCalories:s,bodyPart:n,target:i,rating:u})=>`
            <li class="exercise-card">
                <div class="ex-card-header">
                    <div class="ex-badge">WORKOUT</div>
                    <div class="ex-rating">
                        ${u.toFixed(1)}
                        <svg width="14" height="14" aria-hidden="true"><use href="${$("icon-star")}"></use></svg>
                    </div>
                    <button class="ex-start-btn" data-id="${t}">
                        Start →
                    </button>
                </div>
                <h3 class="ex-title">
                    <span class="ex-icon-wrap">
                        <svg class="ex-icon" width="14" height="16" aria-hidden="true"><use href="${$("icon-run")}"></use></svg>
                    </span>
                    ${a}
                </h3>
                <div class="ex-info">
                    <p>Burned calories: <span>${s} / 3 min</span></p>
                    <p>Body part: <span>${n}</span></p>
                    <p>Target: <span>${i}</span></p>
                </div>
            </li>
        `).join(""),v.querySelectorAll(".ex-start-btn").forEach(t=>{t.addEventListener("click",()=>{document.dispatchEvent(new CustomEvent(d.EXERCISE_OPEN,{detail:{id:t.dataset.id}}))})})}function U(e,t){if(t<=4)return Array.from({length:t},(i,u)=>u+1);let a=Math.max(1,e-1),s=Math.min(t,a+2);a=Math.max(1,s-2);const n=[];a>1&&n.push("...");for(let i=a;i<=s;i++)n.push(i);return s<t&&n.push("..."),n}function X(e){if(!e||e<=1){g.innerHTML="";return}const t=r===1,a=r===e,s=U(r,e);g.innerHTML=`
        <button class="pagination-nav-btn" type="button" data-action="first" ${t?"disabled":""} aria-label="First page">«</button>
        <button class="pagination-nav-btn" type="button" data-action="prev" ${t?"disabled":""} aria-label="Previous page">‹</button>
        ${s.map(n=>n==="..."?'<span class="pagination-ellipsis">...</span>':`<button class="pagination-btn ${n===r?"active":""}" type="button" data-page="${n}">${n}</button>`).join("")}
        <button class="pagination-nav-btn" type="button" data-action="next" ${a?"disabled":""} aria-label="Next page">›</button>
        <button class="pagination-nav-btn" type="button" data-action="last" ${a?"disabled":""} aria-label="Last page">»</button>
    `,g.querySelectorAll(".pagination-btn").forEach(n=>{n.addEventListener("click",async()=>{r=Number(n.dataset.page),await l()})}),g.querySelectorAll(".pagination-nav-btn:not([disabled])").forEach(n=>{n.addEventListener("click",async()=>{const i=n.dataset.action;i==="first"?r=1:i==="prev"?r=Math.max(1,r-1):i==="next"?r=Math.min(e,r+1):i==="last"&&(r=e),await l()})})}let A;window.addEventListener("resize",()=>{clearTimeout(A),A=setTimeout(()=>{L&&(r=1,l())},300)});p&&c&&(p.addEventListener("input",()=>{c.hidden=!p.value.trim()}),c.addEventListener("click",async()=>{p.value="",c.hidden=!0,b="",r=1,await l(),p.focus()}));y&&y.addEventListener("submit",async e=>{e.preventDefault(),b=e.target.elements.query.value.trim().toLowerCase(),r=1,await l()});window.__SPRITE_URL__=O;console.log("[YourEnergy] Home page loaded");
//# sourceMappingURL=index.js.map
