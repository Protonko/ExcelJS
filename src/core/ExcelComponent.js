import {ListenerDOM} from '@core/ListenerDOM';

export class ExcelComponent extends ListenerDOM {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name;
  }
  // Return component template
  toHTML() {
    return '';
  }

  init() {
    this.initListenersDOM();
  }

  desctroy() {
    this.removeListenersDOM();
  }
}
