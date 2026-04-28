// ============================================================
//  HEADER — відповідальний: [ПОСТАВ СВОЄ ІМ'Я]
//
//  Що реалізувати (ТЗ п.11-15):
//  - Mobile: логотип + бургер-меню з навігацією + соц-мережі
//  - Tablet/Desktop: логотип + навігація + соц-мережі
//  - Click по логотипу/Home → index.html
//  - Click по Favorites → favorites.html
//  - Бургер-меню розгортається на всю висоту viewport
//  - Соц-мережі списком <ul>, відкриваються в новій вкладці:
//      Facebook:  https://www.facebook.com/goITclub/
//      Instagram: https://www.instagram.com/goitclub/
//      YouTube:   https://www.youtube.com/c/GoIT
//  - Іконки у форматі SVG
//
//  Твоя розмітка: src/partials/header.html
//  Твої стилі:    src/css/components/header.css
// ============================================================

// TODO: toggle бургер-меню (відкрити/закрити)
// TODO: закривати меню по кліку на лінку або по ESC
// TODO: додати active стан на поточну сторінку (Home vs Favorites)

(() => {
  const refs = {
    openMenuBtn: document.querySelector("[data-menu-open]"),
    closeMenuBtn: document.querySelector("[data-menu-close]"),
    menu: document.querySelector("[data-menu]"),
  };

  refs.openMenuBtn.addEventListener("click", toggleMenu);
  refs.closeMenuBtn.addEventListener("click", toggleMenu);

  function toggleMenu() {
    refs.menu.classList.toggle("is-open");
    document.body.classList.toggle("no-scroll");
  }

  function setActiveMenu() {
    const currentFile = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

    navLinks.forEach(link => link.classList.remove('is-active'));

    navLinks.forEach(link => {
      const linkHref = link.getAttribute('href');
      if (linkHref && linkHref.split('/').pop() === currentFile) {
        link.classList.add('is-active');
      }
    });
  }

  setActiveMenu();
})();