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
    menuLinks: document.querySelectorAll('.nav-link, .mobile-nav-link'),
  };

  if (refs.openMenuBtn) {
    refs.openMenuBtn.addEventListener("click", toggleMenu);
  }

  if (refs.closeMenuBtn) {
    refs.closeMenuBtn.addEventListener("click", toggleMenu);
  }

  refs.menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (refs.menu && refs.menu.classList.contains('is-open')) {
        toggleMenu();
      }
    });
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && refs.menu && refs.menu.classList.contains('is-open')) {
      toggleMenu();
    }
  });

  function toggleMenu() {
    if (!refs.menu) return;
    refs.menu.classList.toggle("is-open");
    document.body.classList.toggle("no-scroll");
  }

  function getPageName(path) {
    const normalized = path.replace(/\\/g, '/');
    const segments = normalized.split('/').filter(Boolean);
    return segments.length ? segments[segments.length - 1] : 'index.html';
  }

  function setActiveMenu() {
    const currentPage = getPageName(window.location.pathname);
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

    navLinks.forEach(link => link.classList.remove('is-active'));

    navLinks.forEach(link => {
      const linkHref = link.getAttribute('href');
      if (!linkHref) return;

      const linkPage = getPageName(linkHref);
      if (linkPage === currentPage) {
        link.classList.add('is-active');
      }
    });
  }

  setActiveMenu();
})();