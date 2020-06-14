const ALPHABET_CODES = {
    startA: 65,
    endZ: 90,
};

function createCell(content) {
    return `
        <div class="cell" contenteditable>${content}</div>
    `;
}

function createCol(content) {
    return `
        <div class="column">${content}</div>
    `;
}

function createRow(content, index) {
    index = index ? index : '';

    return `
        <div class="row">
            <div class="row__info">${index}</div>
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
