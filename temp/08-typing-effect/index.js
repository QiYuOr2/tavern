const h1 = document.querySelector('h1');
h1.innerHTML = h1.textContent.replace(/\w|\s/g, '<span>$&</span>');

let delay = 0;
document.querySelectorAll('span').forEach((span, index) => {
  delay += 0.1;

  if (index === 6) {
    delay += 0.3;
  }

  span.style.setProperty('--delay', `${delay}s`);
});

h1.addEventListener('animationend', (e) => {
  if (e.target === document.querySelector('h1 span:last-child')) {
    h1.classList.add('ended');
  }
});
