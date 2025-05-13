 // assets/js/script.js

const wrapper = document.querySelector('.carousel-wrapper');
const images  = document.querySelectorAll('.carousel img');
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');
const toggleBtn = document.querySelector('.autoplay-toggle');

let current = 0;
let autoplay = true;
let interval;
let resumeTimeout;

function updateCarousel() {
  const img = images[current];
  const left = img.offsetLeft;
  const centerOffset = (wrapper.clientWidth - img.clientWidth) / 2;
  wrapper.scrollTo({ left: left - centerOffset, behavior: 'smooth' });

  images.forEach((el, i) => el.classList.toggle('active', i === current));
}

function nextImage() {
  current = (current + 1) % images.length;
  updateCarousel();
}

function prevImage() {
  current = (current - 1 + images.length) % images.length;
  updateCarousel();
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

// Pause autoplay on manual interaction, resume after 5s
function userInteracted() {
  if (!autoplay) return;
  stopAutoplay();
  clearTimeout(resumeTimeout);
  resumeTimeout = setTimeout(startAutoplay, 5000);
}

// Initialize
window.addEventListener('load', () => {
  updateCarousel();
  nextBtn.addEventListener('click', () => { nextImage(); userInteracted(); });
  prevBtn.addEventListener('click', () => { prevImage(); userInteracted(); });
  toggleBtn.addEventListener('click', () => { toggleAutoplay(); });
  startAutoplay();
});
