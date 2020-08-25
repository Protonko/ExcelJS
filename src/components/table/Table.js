import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '@core/DOM';
import {TableSelection} from './TableSelection';
import {createTable} from './modules/table.template';
import {resizeHandler} from './modules/table.resize';
import {shouldResize, isCell, matrix} from './modules/table.functions';

const ELEMENT_SELECTORS = {
  cellFirst: '[data-id="0:0"]',
};

export class Table extends ExcelComponent {
  constructor($root) {
    super($root, {
      listeners: ['mousedown'],
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
  }

  toHTML() {
    return createTable();
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
}
