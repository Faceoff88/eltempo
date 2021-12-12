var menuButton= document.querySelector('.menu__toggle-nav');
var menu = document.querySelector('.nav');
var main = document.querySelector('.main');
var footer = document.querySelector('.footer');
var menuBurger = document.querySelector('.menu-burger');
var closeCross = document.querySelector('.close-cross');

menuButton.addEventListener('click', function(evt) {
    menu.classList.toggle('nav-active');
    main.classList.toggle('main-active');
    footer.classList.toggle('main-active');
    menuBurger.classList.toggle('visually-hidden');
    closeCross.classList.toggle('visually-hidden');
})

var prevScrollpos = window.pageYOffset;
window.onscroll = function() {
    menu.classList.remove('nav-active');
    main.classList.remove('main-active');
    footer.classList.remove('main-active');
    menuBurger.classList.remove('visually-hidden');
    closeCross.classList.add('visually-hidden');
}