import { getQuote } from './api.js';
import { LS_KEYS } from './constants.js';

function getTodayString() {
  return new Date().toISOString().slice(0, 10);
}

function getCachedQuote() {
  const savedDate = localStorage.getItem(LS_KEYS.QUOTE_DATE);
  const savedQuote = localStorage.getItem(LS_KEYS.QUOTE);
  if (savedDate === getTodayString() && savedQuote) {
    return JSON.parse(savedQuote);
  }
  return null;
}

function saveQuoteToCache(data) {
  localStorage.setItem(LS_KEYS.QUOTE, JSON.stringify(data));
  localStorage.setItem(LS_KEYS.QUOTE_DATE, getTodayString());
}

function renderQuote({ quote, author }) {
  const textEl = document.getElementById('js-quote-text');
  const authorEl = document.getElementById('js-quote-author');
  if (textEl) textEl.textContent = quote;
  if (authorEl) authorEl.textContent = author;
}

function setupTextAdjustment() {
  const textEl = document.querySelector('.js-info-text-mobile');

  if (!textEl) {
    setTimeout(setupTextAdjustment, 100);
    return;
  }

  if (!textEl.dataset.originalText) {
    textEl.dataset.originalText = textEl.textContent.trim();
  }

  const original = textEl.dataset.originalText;

  function adjustText() {
    const w = window.innerWidth;
    const maxLen = w < 768 ? 185 : w < 1440 ? 195 : original.length;
    textEl.textContent =
      original.length > maxLen
        ? original.substring(0, maxLen).trim() + '...'
        : original;
  }

  adjustText();
  window.addEventListener('resize', adjustText);
}

export async function initQuoteSection() {
  try {
    let data = getCachedQuote();
    if (!data) {
      data = await getQuote();
      saveQuoteToCache(data);
    }
    renderQuote(data);
    setupTextAdjustment();
  } catch (err) {
    console.error('initQuoteSection error:', err);
  }
}

initQuoteSection();
