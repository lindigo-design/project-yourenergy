import { getQuote } from './api.js';
import { LS_KEYS } from './constants.js';

async function loadQuote() {
  const today = new Date().toISOString().slice(0, 10);
  const cachedDate = localStorage.getItem(LS_KEYS.QUOTE_DATE);
  let quote;

  if (cachedDate === today) {
    try {
      quote = JSON.parse(localStorage.getItem(LS_KEYS.QUOTE));
    } catch {
      quote = null;
    }
  }

  if (!quote) {
    try {
      quote = await getQuote();
      localStorage.setItem(LS_KEYS.QUOTE, JSON.stringify(quote));
      localStorage.setItem(LS_KEYS.QUOTE_DATE, today);
    } catch {
      return;
    }
  }

  renderQuote(quote);
}

function renderQuote({ quote, author }) {
  const wrapper = document.querySelector('.quote-wrapper');
  if (!wrapper) return;

  wrapper.innerHTML = `
    <svg class="quote-icon" width="24" height="24" aria-hidden="true">
      <use href="./images/sprite.svg#icon-quote"></use>
    </svg>
    <blockquote class="quote-text">${quote}</blockquote>
    <p class="quote-author">${author}</p>
  `;
}

loadQuote();
