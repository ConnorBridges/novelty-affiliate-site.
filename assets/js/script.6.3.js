const wrapper = document.querySelector('.carousel-wrapper');
const carousel = document.querySelector('.carousel');
let images;
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');
const toggleBtn = document.querySelector('.autoplay-toggle');

let current = 1;
let autoplay = true;
let interval;
let resumeTimeout;

function cloneImages() {
  const originalImages = carousel.querySelectorAll('img');
  const first = originalImages[0];
  const last = originalImages[originalImages.length - 1];

  carousel.appendChild(first.cloneNode(true));
  carousel.insertBefore(last.cloneNode(true), first);

  // Update global reference to include clones
  images = carousel.querySelectorAll('img');
}

function centerImage(index, behavior = 'smooth') {
  const img = images[index];
  const scrollTo = img.offsetLeft - (wrapper.offsetWidth - img.offsetWidth) / 2;

  wrapper.scrollTo({
    left: scrollTo,
    behavior
  });

  images.forEach((img, i) => img.classList.toggle('active', i === index));
}

function nextImage() {
  if (current >= images.length - 1) return;
  current++;
  centerImage(current);

  if (current === images.length - 1) {
    setTimeout(() => {
      current = 1;
      centerImage(current, 'auto');
    }, 500);
  }
}

function prevImage() {
  if (current <= 0) return;
  current--;
  centerImage(current);

  if (current === 0) {
    setTimeout(() => {
      current = images.length - 2;
      centerImage(current, 'auto');
    }, 500);
  }
}

function startAutoplay() {
  autoplay = true;
  interval = setInterval(nextImage, 3000);
}

function stopAutoplay() {
  autoplay = false;
  clearInterval(interval);
}

function toggleAutoplay() {
  autoplay ? stopAutoplay() : startAutoplay();
}

function userInteracted() {
  if (!autoplay) return;
  stopAutoplay();
  clearTimeout(resumeTimeout);
  resumeTimeout = setTimeout(startAutoplay, 5000);
}

window.addEventListener('load', () => {
  cloneImages();
  centerImage(current, 'auto');
  nextBtn.addEventListener('click', () => { nextImage(); userInteracted(); });
  prevBtn.addEventListener('click', () => { prevImage(); userInteracted(); });
  toggleBtn.addEventListener('click', toggleAutoplay);
  startAutoplay();
});
