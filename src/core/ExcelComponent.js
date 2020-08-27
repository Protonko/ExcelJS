import {ListenerDOM} from '@core/ListenerDOM';

export class ExcelComponent extends ListenerDOM {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name;
    this.observer = options.observer;
    this.unsubscibers = [];

    this.prepare();
  }

  // actions before initialization
  prepare() {}

  // Return component template
  toHTML() {
    return '';
  }

  // Facade pattern
  $observe(event, ...args) {
    const unsubscribe = this.observer.dispatch(event, ...args);
    this.unsubscibers.push(unsubscribe);
  }

  $on(event, fn) {
    this.observer.subscribe(event, fn);
    this.unsubscibers.forEach(unsubscribe => unsubscribe());
  }

  // initialization & add DOM listeners
  init() {
    this.initListenersDOM();
  }

  // remove component & clear DOM listeners
  destroy() {
    this.removeListenersDOM();
  }
}
