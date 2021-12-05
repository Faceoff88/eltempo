var menuButton= document.querySelector('.menu__toggle-nav');
var menu = document.querySelector('.nav');
var main = document.querySelector('.main');
var menuBurger = document.querySelector('.menu-burger');
var closeCross = document.querySelector('.close-cross');

menuButton.addEventListener('click', function(evt) {
    menu.classList.toggle('nav-active');
    main.classList.toggle('main-active');
    menuBurger.classList.toggle('visually-hidden');
    closeCross.classList.toggle('visually-hidden');
})