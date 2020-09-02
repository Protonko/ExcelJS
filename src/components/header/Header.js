import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '@core/DOM';
import {changeTitle} from '@store/actions';
import {DEFAULT_TITLE} from '@static';
import {debounce, removeStorage} from '@core/utils';
import {ActiveRoute} from '@core/routes/ActiveRoute';

const DELAY = 300;
const DATA_ATTRS = {
  delete: 'delete',
  menu: 'menu',
};

export class Header extends ExcelComponent {
  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input', 'click'],
      ...options,
    });
  }

  static className = 'excel-header';

  prepare() {
    this.onInput = debounce(this.onInput.bind(this), DELAY);
  }

  onInput(event) {
    const $input = $(event.target);
    this.$dispatch(changeTitle($input.text()));
  }

  onClick(event) {
    const $target = $(event.target);

    if ($target.data.button === DATA_ATTRS.delete) {
      const decision = confirm('Are you sure you want to delete the table?');

      if (decision) {
        console.log(ActiveRoute.param);
        removeStorage(`excel:${ActiveRoute.param[1]}`);
        ActiveRoute.navigate('');
      }
    } else if ($target.data.button === DATA_ATTRS.menu) {
      ActiveRoute.navigate('');
    }
  }

  toHTML() {
    const title = this.store.getState().title ?? DEFAULT_TITLE;

    return `
      <div class="container-excel">
          <div class="excel-header__wrapper">
              <div class="logo excel-header__logo">
                  <span class="logo__icon excel-header__logo-icon">
                      <svg class="icon--logo">
                          <use xlink:href="icons/icons.svg#icon-logo"></use>
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
                  <button class="excel-header__button button button--green button--tall" data-button="menu">
                      Main menu
                  </button>
                  <button class="excel-header__button button button--red button--tall" data-button="delete">
                      Delete
                  </button>
              </div>
          </div>
      </div>
    `;
  }
}
