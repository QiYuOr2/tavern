const swiperItems = [
  {
    image: 'https://cdn.jsdelivr.net/gh/xmy6364/blog-image/img/evening.JPG',
    content: { title: '这是图片的标题', desc: '这是图片的描述' },
  },
  {
    image: 'https://cdn.jsdelivr.net/gh/xmy6364/blog-image/img/branch.png',
    content: { title: 'Git分支管理策略', desc: 'Git分支管理策略' },
  },
  {
    image:
      'https://cdn.jsdelivr.net/gh/xmy6364/blog-image/img/20210206datacharts.png',
    content: { title: '就业信息展示', desc: '2020年就业信息展示图表' },
  },
];

const leftSvg = `<svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" fill="white" fill-opacity="0.01"/><path d="M31 36L19 24L31 12" stroke="#f3f3f3" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

const rightSvg = `<svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" fill="white" fill-opacity="0.01"/><path d="M19 12L31 24L19 36" stroke="#f3f3f3" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

const CSS_DISTANCE = '--distance';
const CSS_DURATION = '--swiper-duration';

let canPlay = true;

// 创建html标签
function createElement(tagName = 'div', options) {
  const tag = document.createElement(tagName);
  if (options) {
    options.className && (tag.className = options.className);
    options.html && (tag.innerHTML = options.html);
    options.text && (tag.innerText = options.text);
    options.id && (tag.id = options.id);
    options.click && tag.addEventListener('click', options.click);
    options.style &&
      Object.keys(options.style).forEach((key) => {
        tag.style[key] = options.style[key];
      });
    options.property &&
      Object.keys(options.property).forEach((key) => {
        tag.style.setProperty(key, options.property[key]);
      });
  }
  return tag;
}

function generateItem(item) {
  const image = `<img src="${item.image}" alt="${item.content.title || ''}" />`;

  const contentTitle = item.content.title
    ? `<h2>${item.content.title}</h2>`
    : '';
  const contentDesc = item.content.desc ? `<p>${item.content.desc}</p>` : '';
  const content = `<div class="swiper-item__content">${contentTitle}${contentDesc}</div>`;

  return `<div class="swiper-item">${image}${content}</div>`;
}

function generateArrow(leftClick, rightClick) {
  const leftArrow = createElement('div', {
    id: 'prev',
    html: leftSvg,
    click() {
      leftClick();
    },
  });
  const rightArrow = createElement('div', {
    id: 'next',
    html: rightSvg,
    click() {
      rightClick();
    },
  });

  return [leftArrow, rightArrow];
}

function handleArrowClick(target, len, delay) {
  return (direction) => () => {
    canPlay = false;
    target.style.removeProperty('transition');
    const step = target.querySelector('div').offsetWidth;
    const maxDistance = len * step;

    const currentDistance = parseFloat(
      target.style.getPropertyValue(CSS_DISTANCE)
    );

    let nextDistance =
      direction === 'left' ? currentDistance + step : currentDistance - step;

    if (direction === 'right' && Math.abs(nextDistance) > maxDistance) {
      nextDistance = 0;
    }

    if (direction === 'left' && nextDistance > 0) {
      nextDistance = -step * len;
    }

    target.style.setProperty(CSS_DISTANCE, nextDistance + 'px');
    setTimeout(() => {
      canPlay = true;
    }, delay);
  };
}

/**
 * 渲染轮播图
 * @param {Array} list 轮播图项目列表
 * @param {string} id 挂载轮播图的盒子id
 */
function renderSwiper(id, list, config) {
  const swiper = list.map((item) => generateItem(item)).join('');
  const container = document.getElementById(id);
  container.style.setProperty(CSS_DURATION, config.duration + 'ms');
  container.classList.add('swiper');
  const wrapper = createElement('div', {
    className: 'swiper-wrapper',
    style: {
      width: list.length * 100 + '%',
    },
    property: {
      [CSS_DISTANCE]: '0px',
    },
    html: swiper,
  });

  const move = handleArrowClick(wrapper, list.length - 1, config.delay);
  const [leftArrow, rightArrow] = generateArrow(move('left'), move('right'));

  setInterval(() => {
    if (canPlay) {
      rightArrow.click();
    }
  }, config.delay);

  container.append(wrapper, leftArrow, rightArrow);
}

renderSwiper('swiper', swiperItems, { duration: 300, delay: 3000 });
