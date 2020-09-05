import {$} from '@DOM/DOM';
import {ExcelComponent} from '@core/ExcelComponent';
import {OBSERVER_ACTIONS} from '@observer-actions';

const ELEMENT_SELECTORS = {
  formula: '#formula',
};

export class Formula extends ExcelComponent {
  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      subscribe: ['currentText'],
      ...options,
    });
  }

  static className = 'excel-formula';

  init() {
    super.init();

    this.$formula = this.$root.findSingle(ELEMENT_SELECTORS.formula);

    this.$on(OBSERVER_ACTIONS.tableSelect, $cell => {
      this.$formula.text($cell.data.value);
    });
  }

  storeChanged({currentText}) {
    this.$formula.text(currentText);
  }

  onInput(event) {
    const $target = $(event.target);
    const text = $target.text();

    this.$observe(OBSERVER_ACTIONS.formulaInput, text);
  }

  onKeydown(event) {
    const KEYS = ['Enter', 'Tab'];

    if (KEYS.includes(event.key)) {
      event.preventDefault();

      this.$observe(OBSERVER_ACTIONS.formulaDone);
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
