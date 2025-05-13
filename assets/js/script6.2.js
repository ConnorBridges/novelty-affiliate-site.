const wrapper = document.querySelector('.carousel-wrapper');
const carousel = document.querySelector('.carousel');
const images = document.querySelectorAll('.carousel img');
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');
const toggleBtn = document.querySelector('.autoplay-toggle');

let current = 1; // Start at the first actual image
let autoplay = true;
let interval;
let resumeTimeout;

function cloneImages() {
  // Clone the first and last images
  const firstImage = images[0];
  const lastImage = images[images.length - 1];

  carousel.appendChild(firstImage.cloneNode(true));
  carousel.insertBefore(lastImage.cloneNode(true), images[0]);
}

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
  if (current === images.length - 1) { 
    // Reset to the first image after reaching the last one
    current = 1; // Skip over the cloned last image
    wrapper.scrollTo({ left: 0, behavior: 'smooth' });
  } else {
    current = (current + 1) % images.length;
  }
  centerImage(current);
}

function prevImage() {
  if (current === 0) { 
    // Reset to the last image after reaching the first one
    current = images.length - 2; // Skip over the cloned first image
    wrapper.scrollTo({ left: (images.length - 1) * images[0].offsetWidth, behavior: 'smooth' });
  } else {
    current = (current - 1 + images.length) % images.length;
  }
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
  cloneImages(); // Clone images initially
  centerImage(current);
  nextBtn.addEventListener('click', () => { nextImage(); userInteracted(); });
  prevBtn.addEventListener('click', () => { prevImage(); userInteracted(); });
  toggleBtn.addEventListener('click', () => { toggleAutoplay(); });
  startAutoplay();
});
