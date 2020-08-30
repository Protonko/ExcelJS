import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '@core/DOM';
import {changeTitle} from '@store/actions';
import {DEFAULT_TITLE} from '@static';

export class Header extends ExcelComponent {
  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input'],
      ...options,
    });
  }

  static className = 'excel-header';

  onInput(event) {
    const $input = $(event.target);
    this.$dispatch(changeTitle($input.text()));
  }

  toHTML() {
    const title = this.store.getState().title ?? DEFAULT_TITLE;

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

              <div class="excel-header__title" type="text" contenteditable>
                ${title}
              </div>

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
