import {$} from '@DOM/DOM';
import {ExcelStateComponent} from '@core/ExcelStateComponent/ExcelStateComponent';
import {OBSERVER_ACTIONS} from '@observer-actions';
import {DEFAULT_STYLES} from '@static';
import {createToolbar} from './modules/toolbar.template';

const ELEMENT_SELECTORS = {
  button: '[data-type="button"]',
};

export class Toolbar extends ExcelStateComponent {
  constructor($root, options) {
    super($root, {
      name: 'Toolbar',
      listeners: ['click'],
      subscribe: ['currentStyles'],
      ...options,
    });
  }

  static className = 'excel-toolbar';

  get template() {
    return createToolbar(this.state);
  }

  prepare() {
    this.initState(DEFAULT_STYLES);
  }

  storeChanged(changes) {
    this.setState(changes.currentStyles);
  }

  onClick(event) {
    const button = event.target.closest(ELEMENT_SELECTORS.button);

    if (button) {
      const $button = $(button);
      const value = JSON.parse($button.data.value);

      this.$observe(OBSERVER_ACTIONS.toolbarApplyStyle, value);
    }
  }

  toHTML() {
    return this.template;
  }
}
