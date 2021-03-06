import {range} from '@utils/utils';
import {ALPHABET_CODES, ROWS_COUNT} from '@static';

export function shouldResize(event) {
  return event.target.dataset.resize;
}

export function isCell(event) {
  return event.target.dataset.type === 'cell';
}

export function matrix($target, $current) {
  const target = $target.id(true); // id of clicked cell
  const current = $current.id(true); // id of selected cell
  const cols = range(current.col, target.col);
  const rows = range(current.row, target.row);

  return cols.reduce((acc, col) => {
    rows.forEach(row => acc.push(`${row}:${col}`));
    return acc;
  }, []);
}

export function nextSelector(key, {col, row}) {
  const MIN_VALUE = 0;

  switch (key) {
    case 'Enter':
    case 'ArrowDown':
      row = row + 1 > (ROWS_COUNT - 1) ? row : row + 1;
      break;
    case 'Tab':
    case 'ArrowRight':
      col = col + 1 > (ALPHABET_CODES.endZ - ALPHABET_CODES.startA) ? col : col + 1;
      break;
    case 'ArrowLeft':
      col = col - 1 < MIN_VALUE ? 0 : col - 1;
      break;
    case 'ArrowUp':
      row = row - 1 < MIN_VALUE ? 0 : row - 1;
      break;
  }

  return `[data-id="${row}:${col}`;
}
