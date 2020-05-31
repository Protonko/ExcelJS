import {ExcelComponent} from '@core/ExcelComponent';

export class Toolbar extends ExcelComponent {
  constructor($root) {
    super($root, {
      name: 'Toolbar',
      listeners: ['click'],
    });
  }

  static className = 'excel-toolbar';

  onClick(event) {
    console.log(event.target);
  }

  toHTML() {
    return `
      <div class="container-excel">
          <div class="toolbar">
              <button class="button button--icon">
                  <svg class="icon--toolbar">
                      <use xlink:href="/icons/icons.svg#icon-align-left"></use>
                  </svg>
              </button>
  
              <button class="button button--icon">
                  <svg class="icon--toolbar">
                      <use xlink:href="/icons/icons.svg#icon-align-center"></use>
                  </svg>
              </button>
  
              <button class="button button--icon">
                  <svg class="icon--toolbar">
                      <use xlink:href="/icons/icons.svg#icon-align-right"></use>
                  </svg>
              </button>
  
              <button class="button button--icon">
                  <svg class="icon--toolbar">
                      <use xlink:href="/icons/icons.svg#icon-bold"></use>
                  </svg>
              </button>
  
              <button class="button button--icon">
                  <svg class="icon--toolbar">
                      <use xlink:href="/icons/icons.svg#icon-italic"></use>
                  </svg>
              </button>
  
              <button class="button button--icon">
                  <svg class="icon--toolbar">
                      <use xlink:href="/icons/icons.svg#icon-underlined"></use>
                  </svg>
              </button>
          </div>
      </div>
    `;
  }
}
