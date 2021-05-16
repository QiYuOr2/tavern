/**
 * @param {String} prefix
 * @returns {(classNames: string[]) => String}
 */
function createPrefix(prefix) {
  return (classNames) =>
    classNames.map((className) => prefix + className).join(' ');
}
const createClassNameWithVirtual = createPrefix('.virtual-');

function virtualData() {
  const data = [];
  for (let i = 0; i < 100; i++) {
    data.push({ id: i, value: `item${i}` });
  }
  return data;
}

function load(start, end) {
  const sliceData = virtualData().slice(start, end);
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < sliceData.length; i++) {
    const li = document.createElement('li');
    li.innerText = sliceData[i].value;
    li.className = `virtual-item item${sliceData[i].id}`;
    fragment.appendChild(li);
  }
  const content = document.querySelector(
    createClassNameWithVirtual(['container', 'list'])
  );
  content.innerHTML = '';
  content.appendChild(fragment);
}

const itemHeight = 65;

document.getElementById('placeholder').style.height = `${
  itemHeight * virtualData().length
}px`;

const container = document.querySelector('.virtual-container');
const count = Math.ceil(document.body.clientHeight / itemHeight);
let start = 0;
let end = count;
load(start, end);

function scrollHandler() {
  const scrollTop = container.scrollTop;
  start = Math.floor(scrollTop / itemHeight);
  end = start + count;
  load(start, end);
  document.querySelector('.virtual-list').style.transform = `translateY(${
    start * itemHeight
  }px)`;
}

container.addEventListener('scroll', scrollHandler);
