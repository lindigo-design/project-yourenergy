// ============================================================
//  ФІЛЬТРИ (кнопки Muscles / Body parts / Equipment)
//  Відповідальний: Andrii Marchenko
//
//  Що реалізовано (ТЗ п.19):
//  - 3 кнопки-фільтри
//  - Клік → активний стиль + кидаю EVENTS.FILTER_CHANGED
//  - За замовчуванням активна "Muscles"
//
//  ⚠️ Тільки цей файл кидає FILTER_CHANGED.
//  Файл categories.js його СЛУХАЄ і перемальовує себе.
// ============================================================

import { FILTERS, EVENTS } from './constants.js';

const filtersList = document.querySelector('.filters[role="tablist"]');
const filterButtons = document.querySelectorAll(
  '.filters[role="tablist"] .filters__btn'
);

const setActiveButton = clickedBtn => {
  filterButtons.forEach(btn => btn.classList.remove('is-active'));
  clickedBtn.classList.add('is-active');
};

const dispatchFilterChange = filter => {
  window.dispatchEvent(
    new CustomEvent(EVENTS.FILTER_CHANGED, {
      detail: { filter },
    })
  );
};

const handleFilterClick = e => {
  const btn = e.target.closest('.filters__btn');
  if (!btn) return;
  if (btn.classList.contains('is-active')) return;

  const filter = btn.dataset.filter;
  if (!Object.values(FILTERS).includes(filter)) {
    console.warn(`Filters: невалідне значення data-filter="${filter}"`);
    return;
  }

  setActiveButton(btn);
  dispatchFilterChange(filter);
};

const initFilters = () => {
  if (!filtersList) {
    console.warn('Filters: контейнер .filters не знайдено в DOM');
    return;
  }

  filtersList.addEventListener('click', handleFilterClick);
  dispatchFilterChange(FILTERS.MUSCLES);
};

initFilters();
