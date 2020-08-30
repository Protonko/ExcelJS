import {ExcelStateComponent} from '@core/ExcelStateComponent';
import {OBSERVER_ACTIONS} from '@observer-actions';
import {DEFAULT_STYLES} from '@static';
import {createToolbar} from './modules/toolbar.template';
import {$} from '@core/DOM';

const ELEMENT_SELECTORS = {
  button: '[data-type="button"]',
};

export class Toolbar extends ExcelStateComponent {
  constructor($root, options) {
    super($root, {
      name: 'Toolbar',
      listeners: ['click'],
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

  onClick(event) {
    const button = event.target.closest(ELEMENT_SELECTORS.button);

    if (button) {
      const $button = $(button);

      const value = JSON.parse($button.data.value);
      const key = Object.keys(value)[0];

      this.$observe(OBSERVER_ACTIONS.toolbarApplyStyle, value);
      this.setState({[key]: value[key]});
    }
  }

  toHTML() {
    return this.template;
  }
}
