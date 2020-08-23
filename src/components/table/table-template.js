const ALPHABET_CODES = {
  startA: 65,
  endZ: 90,
};

function createCell(content, index) {
  return `
        <div class="cell" data-column-id="${index}" contenteditable>${content}</div>
    `;
}

function createCol(content, index) {
  return `
        <div class="column" data-type="resizable" data-column-id="${index}">
            ${content}
            <div class="column__resize" data-resize="column"></div>
        </div>
    `;
}

function createRow(content, index) {
  const resize = index
      ? '<div class="row__resize" data-resize="row"></div>'
      : '';

  return `
        <div class="row" data-type="resizable">
            <div class="row__info">
                ${index ? index : ''}
                ${resize}
            </div>
            <div class="row__data">${content}</div>
        </div>
    `;
}

function toChar(_, index) { // _ - is placeholder for unused parameter
  const letterCode = ALPHABET_CODES.startA + index;
  const letter = String.fromCharCode(letterCode);

  return letter;
}

export function createTable(rowsCount = 10) {
  const columnsCount = ALPHABET_CODES.endZ - ALPHABET_CODES.startA + 1;
  const rows = [];
  const columns = new Array(columnsCount)
      .fill('')
      .map(toChar)
      .map(createCol)
      .join('');

  const cells = new Array(columnsCount)
      .fill('')
      .map(createCell)
      .join('');

  rows.push(createRow(columns));

  for (let i = 0; i < rowsCount; i++) {
    rows.push(createRow(cells, i + 1));
  }

  return rows.join('');
}
