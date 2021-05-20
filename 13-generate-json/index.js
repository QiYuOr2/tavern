const addBtn = document.getElementById('add');
const saveBtn = document.getElementById('save');
const table = document.getElementById('table');
const screen = document.getElementById('screen');

let jsonData = {
  name: 'xmy',
  age: 12,
  skills: {
    frontEnd: ['JavaScript', 'Vue', 'React'],
    backEnd: ['C#', 'Node.js', 'Go'],
  },
};

function addRow(initial) {
  const f = document.createDocumentFragment();
  const tr = document.createElement('tr');

  // key
  const keyTd = document.createElement('td');
  const keyInput = document.createElement('input');
  keyInput.name = 'key';
  keyInput.placeholder = 'key';
  keyInput.value = initial.key ?? '';
  keyTd.appendChild(keyInput);
  tr.appendChild(keyTd);

  // value
  const valueTd = document.createElement('td');
  const valueInput = document.createElement('input');
  valueInput.name = 'value';
  valueInput.placeholder = 'value';
  valueInput.value = initial.value ?? '';
  valueTd.appendChild(valueInput);
  tr.appendChild(valueTd);

  f.appendChild(tr);
  table.appendChild(f);
}

function saveJSON() {
  const trs = document.querySelectorAll('#table tr');
  trs.forEach((tr) => {
    const key = tr.querySelector('input[name="key"]').value;
    const rawValue = tr.querySelector('input[name="value"]').value;
    let value;
    try {
      value = JSON.parse(rawValue);
    } catch (error) {
      value = rawValue;
    }
    jsonData[String(key)] = value;
  });

  screen.innerHTML = JSON.stringify(jsonData, null, 2)
    .replaceAll(' ', '<i class="space"></i>')
    .replaceAll('\n', '<i class="enter"></i>');
}

function initial() {
  Object.keys(jsonData).forEach((key) => {
    addRow({
      key,
      value:
        typeof jsonData[key] === 'object'
          ? JSON.stringify(jsonData[key])
          : jsonData[key],
    });
  });

  saveJSON();
}

function setup() {
  addBtn.onclick = addRow;
  saveBtn.onclick = () => {
    jsonData = {};
    saveJSON();
  };
  initial();
}

setup();
