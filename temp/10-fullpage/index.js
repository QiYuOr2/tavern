const DIRECTION = {
  UP: 0,
  DOWN: 1,
};

function typeOfBrowser(browserName) {
  return navigator.userAgent.toLowerCase().indexOf(browserName) !== -1;
}

function throttle(func, delay, context) {
  let wait = false;
  return function () {
    if (!wait) {
      func.apply(context, arguments);
      wait = true;
      setTimeout(() => {
        wait = false;
      }, delay);
    }
  };
}

class FullPage {
  static create(selector, options) {
    return new FullPage({
      selector,
      ...options,
    });
  }

  constructor(options) {
    this.delay = options.delay ?? 500;
    this.container = document.querySelector(options.selector);
    this.viewHeight = document.documentElement.clientHeight;
    this.pages = document.querySelectorAll('.page');
    this.pagesCount = this.pages.length;
    this.currentPosition = 0;
    this.navDots = [];

    this.container.style.height = `${this.viewHeight}px`;

    this.addListener();
    this.createNav();
  }

  handleScroll(e) {
    this.turnPage(this.getNextPageDirection(e));
  }

  addListener() {
    const handle = throttle(this.handleScroll, this.delay, this);
    if (typeOfBrowser('firefox')) {
      document.addEventListener('DOMMouseScroll', handle);
    } else {
      document.addEventListener('mousewheel', handle);
    }
  }

  isScrollUp(event) {
    if (event.wheelDelta) {
      return event.wheelDelta > 0;
    }
    // Firefox
    return -event.detail > 0;
  }

  getNextPageDirection(event) {
    return this.isScrollUp(event) ? DIRECTION.UP : DIRECTION.DOWN;
  }

  calcNextPositionWhenUp() {
    if (-this.container.offsetTop >= this.viewHeight) {
      this.currentPosition += this.viewHeight;
    }
  }

  calcNextPositionWhenDown() {
    // offsetTop 0              1
    // offsetTop -viewHeight    2
    // offsetTop -2viewHeight   3
    // offsetTop -3viewHeight   4
    if (-this.container.offsetTop < this.viewHeight * (this.pagesCount - 1)) {
      this.currentPosition -= this.viewHeight;
    }
  }

  turnPage(direction) {
    switch (direction) {
      case DIRECTION.UP:
        this.calcNextPositionWhenUp();
        break;
      case DIRECTION.DOWN:
        this.calcNextPositionWhenDown();
        break;
    }
    this.turnPageTo(this.currentPosition);
  }

  turnPageTo(currentPosition) {
    this.container.style.top = `${currentPosition}px`;
    this.changeActiveNav();
  }

  createNav() {
    const nav = document.createElement('div');
    nav.classList.add('nav');
    this.container.appendChild(nav);

    for (let i = 0; i < this.pagesCount; i++) {
      nav.innerHTML += '<p class="nav-dot"><span></span></p>';
    }
    const navDots = document.querySelectorAll('.nav-dot');
    this.navDots = Array.from(navDots);
    this.navDots[0].classList.add('active');
    this.navDots.forEach((dot, i) => {
      dot.addEventListener('click', (event) => {
        this.currentPosition = -(i * this.viewHeight);
        this.turnPageTo(this.currentPosition);
        this.changeActiveNav();
      });
    });
  }

  changeActiveNav() {
    this.navDots.forEach((dot) => {
      dot.classList.remove('active');
    });

    const index = -(this.currentPosition / this.viewHeight);
    this.navDots[index].classList.add('active');
  }
}

FullPage.create('#fullpage', {});
