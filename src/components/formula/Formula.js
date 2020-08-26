import {ExcelComponent} from '@core/ExcelComponent';

export class Formula extends ExcelComponent {
  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input'],
      ...options,
    });
  }

  static className = 'excel-formula';

  onInput(event) {
    const text = event.target.textContent.trim();
    this.observer.dispatch('ACTION_TMP', text);
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
