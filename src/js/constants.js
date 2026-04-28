// ============================================================
//  Константи проєкту.
//  Завжди імпортуйте звідси, НЕ пишіть ці рядки вручну
//  у своїх файлах — інакше буде 5 варіантів ключа localStorage
//  і купа важких для дебагу багів.
// ============================================================

// Ключі для localStorage
export const LS_KEYS = {
  FAVORITES: 'yourenergy:favorites',
  QUOTE: 'yourenergy:quote',
  QUOTE_DATE: 'yourenergy:quote-date',
};

// Назви фільтрів (регістр важливий — так вимагає бекенд!)
export const FILTERS = {
  MUSCLES: 'Muscles',
  BODY_PARTS: 'Body parts',
  EQUIPMENT: 'Equipment',
};

// Кастомні події для спілкування між модулями.
// Приклад: блок фільтрів кидає FILTER_CHANGED,
// блок категорій його слухає і перемальовує себе.
export const EVENTS = {
  FILTER_CHANGED: 'yourenergy:filter-changed',        // detail: { filter: 'Muscles' }
  CATEGORY_SELECTED: 'yourenergy:category-selected',  // detail: { filter, category }
  SEARCH_SUBMITTED: 'yourenergy:search-submitted',    // detail: { keyword }
  EXERCISE_OPEN: 'yourenergy:exercise-open',          // detail: { id }
  FAVORITES_CHANGED: 'yourenergy:favorites-changed',  // без detail
};

// Пагінація — скільки елементів на сторінці
export const PAGINATION = {
  CATEGORIES_DESKTOP: 12,
  CATEGORIES_MOBILE: 9,
  EXERCISES_DESKTOP: 10,
  EXERCISES_MOBILE: 8,
};

// Регулярка email з ТЗ
export const EMAIL_PATTERN = /^\w+(\.\w+)?@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
