/**
 * @param {Array} data
 */
function createItems(data) {
  return data.map((item) => {
    const li = document.createElement('li');
    li.classList.add('item');
    li.innerHTML = item;
    return li;
  });
}

/**
 * @param {HTMLElement} container
 */
function renderItems(container, data) {
  const fragment = document.createDocumentFragment();
  const items = createItems(data);
  fragment.append(...items);
  container.appendChild(fragment);
}

function createData(startNum, count) {
  const data = [];
  for (let i = 0; i < count; i++) {
    data.push(++startNum);
  }
  return data;
}

const container = document.querySelector('.container');
const content = document.querySelector('.list');
let data = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let isLoading = false;
renderItems(content, data);

function scrollHander() {
  const maxScrollDis = content.clientHeight - container.clientHeight;

  if (!isLoading) {
    if (Math.ceil(container.scrollTop) >= maxScrollDis) {
      const loading = document.createElement('li');
      loading.classList.add('loading');
      loading.innerText = 'loading...';
      content.appendChild(loading);
      isLoading = true;

      setTimeout(() => {
        content.removeChild(loading);
        data = createData(data[data.length - 1], 10);
        renderItems(content, data);
        isLoading = false;
      }, 1000);
    }
  }
}

container.addEventListener('scroll', scrollHander);
