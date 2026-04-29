function setupTextAdjustment() {
  const textElement = document.querySelector('.js-info-text-mobile');

  if (!textElement) {
    setTimeout(setupTextAdjustment, 100);
    return;
  }

  if (!textElement.dataset.originalText) {
    textElement.dataset.originalText = textElement.textContent.trim();
  }

  const originalText = textElement.dataset.originalText;

  function adjustText() {
    const width = window.innerWidth;
    let maxLength;

    if (width < 768) {
      maxLength = 185;
    } else if (width >= 768 && width < 1440) {
      maxLength = 195;
    } else {
      maxLength = originalText.length;
    }

    if (originalText.length > maxLength) {
      textElement.textContent =
        originalText.substring(0, maxLength).trim() + '...';
    } else {
      textElement.textContent = originalText;
    }
  }

  adjustText();
  window.addEventListener('resize', adjustText);
}

setupTextAdjustment();
