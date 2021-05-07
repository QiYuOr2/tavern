const app = document.getElementById('app');

const examples = [
  { href: '01-swiper', label: '图片轮播组件' },
  { href: '02-profile-card', label: '个人资料卡片' },
  { href: '03-login-glass', label: '毛玻璃登陆页' },
  { href: '04-word-float-up', label: '文字上浮动画' },
  { href: '05-three-column', label: '三栏布局' },
  { href: '06-two-column', label: '两栏布局' },
  { href: '06-skeleton-loader', label: '骨架屏加载' },
];

/**
 * 生成示例索引列表
 * @param {Array} links 链接
 */
function generateList(links) {
  return links.map(
    (link) => `<li><a href="${link.href}">${link.label}</a></li>`
  );
}

/**
 * 渲染列表
 * @param {Array} list 列表
 */
function renderList(list) {
  app.innerHTML = `<ul>${list.join('')}</ul>`;
}

renderList(generateList(examples));
