const btn = document.querySelector('.scroll-up');

if (btn) {
  function updateBtn() {
    btn.hidden = window.scrollY <= 300;
  }

  updateBtn();
  window.addEventListener('scroll', updateBtn, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
