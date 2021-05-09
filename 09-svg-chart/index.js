let padding = 15;
let start_x = padding;
let svg_width = document.querySelector('#chart').viewBox.baseVal.width;

function loadData() {
  const data = {
    stock_name: 'Apple Inc. (AAPL)',
    data: [
      { date: 'Apr 01', index: 240.91, normalized: 27.08 },
      { date: 'Apr 02', index: 244.93, normalized: 36.11 },
      { date: 'Apr 03', index: 241.41, normalized: 28.2 },
      { date: 'Apr 06', index: 262.47, normalized: 75.54 },
      { date: 'Apr 07', index: 259.43, normalized: 68.71 },
      { date: 'Apr 08', index: 266.07, normalized: 83.64 },
      { date: 'Apr 09', index: 267.99, normalized: 87.95 },
    ],
  };
  drawChart(data);
}

setTimeout(() => {
  loadData();
}, 1000);

function drawChart(api_data) {
  const name = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  name.setAttribute('text-anchor', 'middle');
  name.setAttribute('alignment-baseline', 'middle');
  name.setAttribute('x', svg_width / 2);
  name.setAttribute('y', 6);
  name.classList.add('name');
  name.appendChild(document.createTextNode(api_data['stock_name']));
  document.querySelector('#chart').appendChild(name);

  const stock_data = api_data['data'];
  const path_data = [];

  for (let i in stock_data) {
    path_data.push(`${start_x}, ${stock_data[i]['normalized']}`);

    const caption = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'text'
    );
    caption.setAttribute('text-anchor', 'middle');
    caption.setAttribute('alignment-baseline', 'middle');
    caption.setAttribute('x', start_x);
    caption.setAttribute('y', 96);
    caption.classList.add('caption');
    caption.appendChild(document.createTextNode(stock_data[i]['date']));
    document.querySelector('#chart').appendChild(caption);

    const circle = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'circle'
    );
    circle.setAttribute('cx', start_x);
    circle.setAttribute('cy', stock_data[i]['normalized']);
    circle.setAttribute('r', 3);
    circle.setAttribute('stroke', '#9f3af0');
    circle.setAttribute('stroke-width', 2);
    circle.setAttribute('fill', 'white');
    circle.setAttribute(
      'transform-origin',
      `${start_x} ${stock_data[i]['normalized']}`
    );
    circle.style.setProperty(
      '--delay',
      `${(3 * parseInt(i)) / stock_data.length}s`
    );
    circle.classList.add('point');
    document.querySelector('#path-container').appendChild(circle);

    const value = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'text'
    );
    value.setAttribute('text-anchor', 'middle');
    value.setAttribute('alignment-baseline', 'middle');
    value.setAttribute('x', start_x);
    value.setAttribute('y', stock_data[i]['normalized']);
    value.setAttribute(
      'transform',
      `translate(0, ${stock_data[i]['normalized'] * 2 - 8}) scale(1, -1)`
    );
    value.style.setProperty(
      '--delay',
      `${(3 * parseInt(i)) / stock_data.length}s`
    );
    value.classList.add('values');
    value.appendChild(document.createTextNode(stock_data[i]['index']));
    document.querySelector('#path-container').appendChild(value);

    start_x += (svg_width - padding * 2) / (stock_data.length - 1);
  }

  const line = document.querySelector('#line');
  line.setAttribute('d', `M${path_data.join(' ')}`);
  let strokeLength = Math.ceil(line.getTotalLength());
  document
    .querySelector('#chart')
    .style.setProperty('--stroke-length', strokeLength);

  document.querySelector('#chart').classList.add('animate');
}
