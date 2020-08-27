import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '@core/DOM';
import {ACTIONS} from '@/actions';
import {TableSelection} from './TableSelection';
import {createTable} from './modules/table.template';
import {resizeHandler} from './modules/table.resize';
import {shouldResize, isCell, matrix, nextSelector} from './modules/table.functions';

const ELEMENT_SELECTORS = {
  cellFirst: '[data-id="0:0"]',
};

export class Table extends ExcelComponent {
  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options,
    });
  }
  static className = 'excel-table';

  prepare() {
    this.selection = new TableSelection();
  }

  init() {
    super.init();

    const $cellFirst = this.$root.findSingle(ELEMENT_SELECTORS.cellFirst);

    this.selection.select($cellFirst);

    // add cell data to formula on initialise
    this.selectCell($cellFirst);

    this.$on(ACTIONS.formulaInput, text => {
      this.selection.current.text(text);
    });
    this.$on(ACTIONS.formulaDone, () => {
      this.selection.current.focus();
    });
  }

  selectCell($cell) {
    this.selection.select($cell);
    this.$observe(ACTIONS.tableSelect, $cell);
  }

  onInput(event) {
    this.$observe(ACTIONS.tableInput, $(event.target));
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(this.$root, event);
    } else if (isCell(event)) {
      const $target = $(event.target);

      if (event.shiftKey) { // get selected group
        const $cells = matrix($target, this.selection.current)
            .map(id => this.$root.findSingle(`[data-id="${id}"]`));

        this.selection.selectGroup($cells);
      } else {
        this.selection.select($target);
      }
    }
  }

  onKeydown(event) {
    const KEYS = [
      'Enter',
      'Tab',
      'ArrowUp',
      'ArrowRight',
      'ArrowDown',
      'ArrowLeft',
    ];

    const {key} = event;

    if (KEYS.includes(key) && !event.shiftKey) {
      event.preventDefault();

      const id = this.selection.current.id(true);
      const $nextCell = this.$root.findSingle(nextSelector(key, id));

      this.selectCell($nextCell);
      this.$observe(ACTIONS.tableSelect, $nextCell);
    }
  }

  toHTML() {
    return createTable();
  }
}
