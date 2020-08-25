import {ExcelComponent} from '@core/ExcelComponent';

export class Formula extends ExcelComponent {
  constructor($root) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'click'],
    });
  }

  static className = 'excel-formula';

  onInput(event) {
    console.log('onInput', this.$root);
  }

  onClick(event) {
    console.log(event);
  }

  toHTML() {
    return `
      <div class="container-excel">
          <div class="formula">
              <div class="excel-formula__info formula__info">
                  fx
              </div>
              <div class="formula__entry-field" contenteditable spellcheck="false"></div>
          </div>
      </div>
    `;
  }
}