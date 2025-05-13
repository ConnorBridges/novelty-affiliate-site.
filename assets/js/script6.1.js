const wrapper = document.querySelector('.carousel-wrapper');
const carousel = document.querySelector('.carousel');
const images = document.querySelectorAll('.carousel img');
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');
const toggleBtn = document.querySelector('.autoplay-toggle');

let current = 0;
let autoplay = true;
let interval;
let resumeTimeout;

function centerImage(index) {
  const img = images[index];
  const imgOffsetLeft = img.offsetLeft;
  const scrollTo = imgOffsetLeft - (wrapper.offsetWidth - img.offsetWidth) / 2;

  wrapper.scrollTo({
    left: scrollTo,
    behavior: 'smooth'
  });

  images.forEach((el, i) => el.classList.toggle('active', i === index));
}

function nextImage() {
  current = (current + 1) % images.length;
  centerImage(current);
}

function prevImage() {
  current = (current - 1 + images.length) % images.length;
  centerImage(current);
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
  centerImage(current);
  nextBtn.addEventListener('click', () => { nextImage(); userInteracted(); });
  prevBtn.addEventListener('click', () => { prevImage(); userInteracted(); });
  toggleBtn.addEventListener('click', () => { toggleAutoplay(); });
  startAutoplay();
});
