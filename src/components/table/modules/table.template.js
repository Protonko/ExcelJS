import {toInlineStyles, parse} from '@utils/utils';
import {DEFAULT_STYLES, ALPHABET_CODES} from '@static';

const DEFAULT_WIDTH = '120px';
const DEFAULT_HEIGHT = '24px';

function createCell(row, state) {
  return function(_, column) {
    const width = getWidth(state.colState, column);
    const id = `${row}:${column}`;
    const content = state.dataState[id] ?? '';
    const styles = toInlineStyles({
      ...DEFAULT_STYLES,
      ...state.stylesState[id],
    });

    return `
        <div 
          class="cell" 
          data-column-id="${column}"
          data-id="${id}"
          data-type="cell"
          data-value="${content}"
          contenteditable
          style="${styles}; width: ${width}"
        >
            ${parse(content)}
        </div>
    `;
  };
}

function createCol({content, index, width}) {
  return `
        <div 
          class="column" 
          data-type="resizable" 
          data-column-id="${index}" 
          style="width: ${width}"
        >
            ${content}
            <div class="column__resize" data-resize="column"></div>
        </div>
    `;
}

function createRow(content, index, state) {
  const resize = index ? `<div class="row__resize" data-resize="row"></div>` : '';
  const height = getHeight(state, index);

  return `
        <div 
          class="row" 
          data-type="resizable" 
          data-row-id="${index}"
          style="height: ${height}"
        >
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
  return String.fromCharCode(letterCode);
}

function getWidth(state, index) {
  return state[index] ?? DEFAULT_WIDTH;
}

function getHeight(state, index) {
  return state[index] ?? DEFAULT_HEIGHT;
}

function withWidthFrom(state) {
  return function(content, index) {
    return {
      content,
      index,
      width: getWidth(state.colState, index),
    };
  };
}

export function createTable(rowsCount = 10, state = {}) {
  const columnsCount = ALPHABET_CODES.endZ - ALPHABET_CODES.startA + 1;
  const rows = [];
  const columns = new Array(columnsCount)
      .fill('')
      .map(toChar)
      .map(withWidthFrom(state))
      .map(createCol)
      .join('');

  rows.push(createRow(columns, null, {}));

  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(columnsCount)
        .fill('')
        .map(createCell(row, state))
        .join('');

    rows.push(createRow(cells, row + 1, state.rowState));
  }

  return rows.join('');
}
