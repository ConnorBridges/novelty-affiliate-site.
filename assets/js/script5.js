 // assets/js/script.js

const carousel = document.querySelector('.carousel');
const images = document.querySelectorAll('.carousel img');
let current = 0;
let autoplay = true;
let interval;

function updateCarousel() {
  const offset = -current * (images[0].clientWidth + 20); // account for side margin
  carousel.style.transform = `translateX(${offset}px)`;

  images.forEach((img, i) => {
    img.classList.toggle('active', i === current);
  });
}

function nextImage() {
  current = (current + 1) % images.length;
  updateCarousel();
}

function prevImage() {
  current = (current - 1 + images.length) % images.length;
  updateCarousel();
}

function toggleAutoplay() {
  autoplay = !autoplay;
  if (autoplay) {
    interval = setInterval(nextImage, 3000);
  } else {
    clearInterval(interval);
  }
}

// initialize
window.addEventListener('load', () => {
  updateCarousel();
  document.getElementById('next').addEventListener('click', nextImage);
  document.getElementById('prev').addEventListener('click', prevImage);
  document.querySelector('.autoplay-toggle').addEventListener('click', toggleAutoplay);
  interval = setInterval(nextImage, 3000);
});
