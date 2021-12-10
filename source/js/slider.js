function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}window.$ = document.querySelector.bind(document);
window.$$ = document.querySelectorAll.bind(document);

Node.prototype.on = window.on = function (eventsString, fn, config = false) {
  let supportsPassive = false;

  try {
    document.addEventListener('test', null, {
      get passive() {supportsPassive = true;} });

  } catch (e) {}

  if (typeof config === 'object' && config.hasOwnProperty('passive')) {
    config = supportsPassive ? config : false;
  }

  eventsString.
  trim().split(', ').
  forEach(eventDeclaration => {
    const [event, key] = eventDeclaration.trim().split(':');

    if (key) {
      this._listeners = this._listeners || {};
      this._listeners[key] = { event, fn, config };
    }

    this.addEventListener(event, fn, config);
  });
};

Node.prototype.off = window.off = function (eventsString, fn, config = false) {
  if (fn) {
    eventsString.
    trim().split(', ').
    forEach(event => this.removeEventListener(event, fn, config));
  } else {
    if (!this._listeners) return;

    const listenerKeys = String(eventsString).trim().split(', ');

    listenerKeys.forEach(key => {
      if (!this._listeners[key]) return;

      const { event, fn, config } = this._listeners[key];
      this.removeEventListener(event, fn, config);
      delete this._listeners[key];
    });
  }
};

Node.prototype.once = window.once = function (events, fn, config = false) {
  const listener = function (e) {
    fn.call(this, e);
    this.off(events, listener);
  };
  this.on(events, listener, config);
};

NodeList.prototype.__proto__ = Array.prototype;

NodeList.prototype.on = NodeList.prototype.addEventListener = function (events, fn, config = false) {
  this.forEach(el => el.on(events, fn, config));
};

NodeList.prototype.off = NodeList.prototype.removeEventListener = function (events, fn) {
  this.forEach(el => el.off(events, fn));
};

NodeList.prototype.once = function (events, fn) {
  this.forEach(el => el.once(events, fn));
};
class Slider {
  constructor(options) {_defineProperty(this, "slidePrev",


































































    () => {
      requestAnimationFrame(() => this.slideTo(this.currentSlide - 1));
    });_defineProperty(this, "slideNext",

    () => {
      requestAnimationFrame(() => this.slideTo(this.currentSlide + 1));
    });_defineProperty(this, "_onWindowResize",

































































    () => {
      this.slideWidth = this.options.slider.offsetWidth;

      this.translateX = -this.currentSlide * this.slideWidth;
      this.options.list.style.transform = `translateX(${this.translateX}px)`;

      this.posX = this.translateX;
    });_defineProperty(this, "_onKeyDown",

    ({ keyCode }) => {
      switch (keyCode) {
        case 37:
          this.slidePrev();
          break;
        case 39:
          this.slideNext();
          break;}

    });_defineProperty(this, "_getX",



    e => e.touches ? e.touches[0].pageX : e.pageX);_defineProperty(this, "_getY",
    e => e.touches ? e.touches[0].pageY : e.pageY);_defineProperty(this, "_onPointerStart",

    e => {
      this.touching = true;

      this._startX = this._getX(e);
      this._currentX = this._startX;

      this._testX = this._getX(e);
      this._testY = this._getY(e);

      if (!e.touches) {
        this.swiping = true;
        requestAnimationFrame(this._update);
      }
    });_defineProperty(this, "_onPointerMove",

    e => {
      if (!this.touching) return;

      this._currentX = this._getX(e);
      this._currentY = this._getY(e);

      if (e.touches && this._testX && this._testY) {
        const xDiff = this._testX - this._currentX;
        const yDiff = this._testY - this._currentY;

        // Is swiping horizontal
        if (Math.abs(xDiff) > Math.abs(yDiff)) {
          e.preventDefault();
          this.swiping = true;
          requestAnimationFrame(this._update);
        }

        this._testX = null;
        this._testY = null;
      }
    });_defineProperty(this, "_onPointerEnd",

    () => {
      if (!this.touching) return;

      this.touching = false;
      this.posX = this.translateX;

      const progress = Math.abs(this._shiftX) / this.slideWidth;
      const minShift = progress >= 0.1;
      const direction = this._shiftX < 0 ? 1 : -1;
      let index = this.currentSlide;

      if (this.swiping && minShift) {
        index += direction;
      }

      requestAnimationFrame(() => this.slideTo(index));

      this.swiping = false;
      this.swipeProgress = 0;
    });_defineProperty(this, "_update",

    () => {
      if (!this.touching) return;

      requestAnimationFrame(this._update);

      this._shiftX = this._currentX - this._startX;
      this.translateX = this.posX + this._shiftX;

      this.options.list.style.transform = `translateX(${this.translateX}px)`;

      if (this.options.onSwipe) {
        this.swipeProgress = Math.abs(this._shiftX) / this.slideWidth;
        this.options.onSwipe && this.options.onSwipe(this);
      }
    });this.options = { slider: null, list: null, prevBtn: null, nextBtn: null, speed: 600, initialSlide: 0, keyboardControll: false, runCallbacks: true, onSlideChangeStart: null, onSlideChangeEnd: null, onSwipe: null, ...options };this.prevSlide = null;this.currentSlide = this.options.initialSlide;this.slidesCount = this.options.list.children.length;this.slideWidth = this.options.slider.offsetWidth;this.posX = 0;this.translateX = 0;this.swipeProgress = 0;this.touching = false;this.swiping = false;this._startX = 0;this._currentX = 0;this._shiftX = 0;this._testX = null;this._testY = null;this._runCallbacks = this.options.runCallbacks;this.init();}init() {this._setInitialSlide();this._addEventListeners();}destroy() {this._removeEventListeners();}slideTo(index, runCallbacks = this.options.runCallbacks, slow = true) {this.prevSlide = this.currentSlide;this._runCallbacks = runCallbacks;this.currentSlide = Math.max(0, index);this.currentSlide = Math.min(this.slidesCount - 1, this.currentSlide);this._onSlideChangeStart();this.translateX = -this.currentSlide * this.slideWidth;if (this.posX === this.translateX) return;this._setAnimatable(slow);this.options.list.style.transform = `translateX(${this.translateX}px)`;this.posX = this.translateX;}_setInitialSlide() {if (this.currentSlide === 0) return;this.translateX = -this.currentSlide * this.slideWidth;this.posX = this.translateX;this.options.list.style.transform = `translateX(${this.translateX}px)`;}_onSlideChangeStart() {if (this.prevSlide !== this.currentSlide && this._runCallbacks && this.options.onSlideChangeStart) {this.options.onSlideChangeStart(this);}}_onSlideChangeEnd() {if (this.prevSlide !== this.currentSlide && this._runCallbacks && this.options.onSlideChangeStart) {this.options.onSlideChangeEnd(this);}}_addEventListeners() {this.options.slider.on("touchstart", this._onPointerStart, { passive: true });this.options.slider.on("mousedown", this._onPointerStart);this.options.slider.on("touchmove", this._onPointerMove);this.options.slider.on("mousemove", this._onPointerMove);this.options.slider.on("touchend, mouseup, mouseleave", this._onPointerEnd);this.options.keyboardControll && document.on("keydown", this._onKeyDown);this.options.prevBtn && this.options.prevBtn.on("click", this.slidePrev);this.options.nextBtn && this.options.nextBtn.on("click", this.slideNext);window.on("resize", this._onWindowResize);}_removeEventListeners() {this.options.slider.off("touchstart", this._onPointerStart, { passive: true });this.options.slider.off("mousedown", this._onPointerStart);this.options.slider.off("touchmove", this._onPointerMove);this.options.slider.off("mousemove", this._onPointerMove);this.options.slider.off("touchend, mouseup, mouseleave", this._onPointerEnd);this.options.keyboardControll && document.off("keydown", this._onKeyDown);this.options.prevBtn && this.options.prevBtn.off("click", this.slidePrev);this.options.nextBtn && this.options.nextBtn.off("click", this.slideNext);window.off("resize", this._onWindowResize);}

  _setAnimatable(slow = false) {
    const transition = slow ?
    `transform ${this.options.speed}ms cubic-bezier(0.6, 0.6, 0.2, 1)` :
    `transform ${
    this.options.speed * 0.75
    }ms cubic-bezier(0.3, 0.4, 0.6, 1)`;

    this.options.list.style.transition = transition;
    this.options.list.once("transitionend", () => {
      this.options.list.style.transition = "";

      this._onSlideChangeEnd();
    });
  }}


const mySlider = new Slider({
  slider: document.querySelector(".c-slider"),
  list: document.querySelector(".c-slider__list"),
  prevBtn: document.querySelector(".c-slider__prev"),
  nextBtn: document.querySelector(".c-slider__next"),

  speed: 400,
  initialSlide: 1,
  keyboardControll: true,
  runCallbacks: true,

  onSlideChangeStart(slider) {
    console.log("onSlideChangeStart");
  },
  onSlideChangeEnd(slider) {
    console.log("onSlideChangeEnd");
  },
  onSwipe({ swipeProgress }) {
    console.log("swipeProgress: " + swipeProgress);
  } });


// API:

// mySlider.options (all specified above)

// mySlider.prevSlide
// mySlider.currentSlide
// mySlider.slidesCount
// mySlider.slideWidth
// mySlider.posX
// mySlider.translateX
// mySlider.swipeProgress
// mySlider.touching
// mySlider.swiping

// mySlider.destroy()
// mySlider.init()

// mySlider.slidePrev()
// mySlider.slideNext()
// mySlider.slideTo(
//   3, // index
//   false, // runCallbacks (default: true)
//   false // slow (default: true)
// )