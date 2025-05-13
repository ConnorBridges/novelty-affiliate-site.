const images = document.querySelectorAll('.carousel img');
let current = 0;

function nextImage() {
  images[current].classList.remove('active');
  current = (current + 1) % images.length;
  images[current].classList.add('active');
}

function prevImage() {
  images[current].classList.remove('active');
  current = (current - 1 + images.length) % images.length;
  images[current].classList.add('active');
}

document.getElementById('next').addEventListener('click', nextImage);
document.getElementById('prev').addEventListener('click', prevImage);

// Auto-rotate images every 3 seconds
setInterval(nextImage, 3000);
