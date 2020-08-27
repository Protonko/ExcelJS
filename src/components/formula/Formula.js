import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '@core/DOM';
import {ACTIONS} from '@/actions';

const ELEMENT_SELECTORS = {
  formula: '#formula',
};

export class Formula extends ExcelComponent {
  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      ...options,
    });
  }

  static className = 'excel-formula';

  init() {
    super.init();

    this.$formula = this.$root.findSingle(ELEMENT_SELECTORS.formula);

    this.$on(ACTIONS.tableSelect, $cell => {
      this.$formula.text($cell.text());
    });
    this.$on(ACTIONS.tableInput, $cell => {
      this.$formula.text($cell.text());
    });
  }

  onInput(event) {
    const $target = $(event.target);
    const text = $target.text();

    this.$observe(ACTIONS.formulaInput, text);
  }

  onKeydown(event) {
    const KEYS = ['Enter', 'Tab'];

    if (KEYS.includes(event.key)) {
      event.preventDefault();

      this.$observe(ACTIONS.formulaDone);
    }
  }

  toHTML() {
    return `
      <div class="container-excel">
          <div class="formula">
              <div class="excel-formula__info formula__info">
                  fx
              </div>
              <div id="formula" class="formula__entry-field" contenteditable spellcheck="false"></div>
          </div>
      </div>
    `;
  }
}
