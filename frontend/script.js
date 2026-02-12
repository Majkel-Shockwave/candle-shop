const menu = document.querySelector('.social-menu');
const toggle = document.querySelector('.social-menu .toggle');

toggle.addEventListener('mouseenter', () => {
    menu.classList.add('open');
});

menu.addEventListener('mouseleave', () => {
    menu.classList.remove('open');
});