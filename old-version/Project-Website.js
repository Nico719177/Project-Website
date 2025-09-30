document.querySelectorAll('.item').forEach(item => {
  const img = item.querySelector('.pic');
  if (!img) return;
  img.addEventListener('mouseenter', () => {
    item.classList.add('revealed');
  }, { once: true});
});

// Project-Website.js
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.item .pic').forEach(img => {
    if (img.closest('.media')) return;          // schon gewrappt
    const wrap = document.createElement('div'); // neuer Bild-Wrapper
    wrap.className = 'media';
    img.parentNode.insertBefore(wrap, img);
    wrap.appendChild(img);
  });
});





