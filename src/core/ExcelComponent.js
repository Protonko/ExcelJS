import {ListenerDOM} from '@core/ListenerDOM';

export class ExcelComponent extends ListenerDOM {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name;

    this.prepare();
  }

  prepare() {}

  // Return component template
  toHTML() {
    return '';
  }

  init() {
    this.initListenersDOM();
  }

  destroy() {
    this.removeListenersDOM();
  }
}
