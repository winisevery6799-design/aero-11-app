if (window.navigator.userAgent.indexOf('MSIE ') > -1) {
  window.location.href = 'ub.html';
}

function updateClock() {
  const now = new Date();
  let hours = now.getHours();
  const ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12 || 12;
  const formattedHours = String(hours);
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  const clockTime = document.querySelector('#clock .clock-time');
  if (clockTime) {
    clockTime.textContent = ` ${formattedHours}:${minutes}:${seconds} ${ampm}`;
  }
}

updateClock();
setInterval(updateClock, 1000);
const items = Array.from(document.querySelectorAll('.carousel-item'));
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const dotsContainer = document.getElementById('dots');

if (items.length) {
  let currentIndex = 0;
  const autoplayInterval = 8000;
  let autoplayId = null;

  function createDots() {
    if (!dotsContainer) return;
    dotsContainer.innerHTML = '';
    items.forEach((_, i) => {
      const b = document.createElement('button');
      b.className = 'dot';
      b.setAttribute('aria-label', `Go to slide ${i + 1}`);
      b.addEventListener('click', () => goTo(i));
      dotsContainer.appendChild(b);
    });
  }

  function updateDots() {
    if (!dotsContainer) return;
    const dots = Array.from(dotsContainer.children);
    dots.forEach((d, i) => d.classList.toggle('active', i === currentIndex));
  }

  function updateCarousel() {
    const total = items.length;
    const leftIndex = (currentIndex - 1 + total) % total;
    const rightIndex = (currentIndex + 1) % total;

    items.forEach((item, i) => {
      item.className = 'carousel-item';
      item.style.visibility = 'hidden';
      item.style.pointerEvents = 'none';
      item.style.opacity = '0';
      item.style.transform = 'translate(-50%,-50%) translateX(0) scale(0.9)';

      if (i === currentIndex) {
        item.classList.add('center');
        item.style.visibility = 'visible';
        item.style.pointerEvents = 'auto';
        item.style.opacity = '1';
        item.style.transform = 'translate(-50%,-50%) translateX(0) scale(1)';
      } else if (i === leftIndex) {
        item.classList.add('left');
        item.style.visibility = 'visible';
        item.style.opacity = '0.6';
        item.style.transform = 'translate(-50%,-50%) translateX(-40%) scale(0.92)';
      } else if (i === rightIndex) {
        item.classList.add('right');
        item.style.visibility = 'visible';
        item.style.opacity = '0.6';
        item.style.transform = 'translate(-50%,-50%) translateX(40%) scale(0.92)';
      }
    });

    updateDots();
  }

  function goTo(index) {
    currentIndex = (index + items.length) % items.length;
    updateCarousel();
    resetAutoplay();
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => goTo(currentIndex + 1));
  }
  if (prevBtn) {
    prevBtn.addEventListener('click', () => goTo(currentIndex - 1));
  }

  function startAutoplay() {
    stopAutoplay();
    autoplayId = setInterval(() => goTo(currentIndex + 1), autoplayInterval);
  }

  function stopAutoplay() {
    if (autoplayId) {
      clearInterval(autoplayId);
      autoplayId = null;
    }
  }

  function resetAutoplay() {
    stopAutoplay();
    startAutoplay();
  }

  const carouselEl = document.querySelector('.carousel');
  if (carouselEl) {
    carouselEl.addEventListener('mouseenter', stopAutoplay);
    carouselEl.addEventListener('mouseleave', startAutoplay);
  }

  createDots();
  updateCarousel();
  startAutoplay();
}