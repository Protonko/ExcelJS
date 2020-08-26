import {ExcelComponent} from '@core/ExcelComponent';

export class Header extends ExcelComponent {
  constructor($root, options) {
    super($root, {
      name: 'Header',
      ...options,
    });
  }
  static className = 'excel-header';

  toHTML() {
    return `
      <div class="container-excel">
          <div class="excel-header__wrapper">
              <div class="logo excel-header__logo">
                  <span class="logo__icon excel-header__logo-icon">
                      <svg class="icon--logo">
                          <use xlink:href="/icons/icons.svg#icon-logo"></use>
                      </svg>
                  </span>
                  <span class="logo__text">
                      Excel
                  </span>
              </div>

              <input class="input excel-header__input" placeholder="new table" type="text">

              <div class="buttons excel-header__buttons">
                  <button class="excel-header__button button button--green button--tall">
                      Create
                  </button>
                  <button class="excel-header__button button button--red button--tall">
                      Delete
                  </button>
              </div>
          </div>
      </div>
    `;
  }
}
