const menuBtn = document.querySelector('.menu-btn');
const closeMenu = document.querySelector('.close-menu');
const menu = document.querySelector('.menu');
const goBack = document.querySelector('.go-back');

menuBtn.addEventListener('click', () => {
  menu.className = 'menu menu-open';
});

closeMenu.addEventListener('click', () => {
  menu.className = 'menu';
});

goBack.addEventListener('click', () => {
  window.history.back();
});
