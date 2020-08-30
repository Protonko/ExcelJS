import {ListenerDOM} from '@core/ListenerDOM';

export class ExcelComponent extends ListenerDOM {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name;
    this.store = options.store;
    this.observer = options.observer;
    this.subscribe = options.subscribe ?? [];
    this.unsubscribers = [];

    this.prepare();
  }

  // actions before initialization
  prepare() {}

  // Return component template
  toHTML() {
    return '';
  }

  storeChanged() {}

  isWatching(key) {
    return this.subscribe.includes(key);
  }

  // Facade pattern
  $observe(event, ...args) {
    const unsubscribe = this.observer.dispatch(event, ...args);
    this.unsubscribers.push(unsubscribe);
  }

  $on(event, fn) {
    const unsubscribe = this.observer.subscribe(event, fn);
    this.unsubscribers.push(unsubscribe);
  }

  $dispatch(action) {
    this.store.dispatch(action);
  }

  // initialization & add DOM listeners
  init() {
    this.initListenersDOM();
  }

  // remove component & clear DOM listeners
  destroy() {
    this.removeListenersDOM();
    this.unsubscribers.forEach(unsubscribe => unsubscribe());
  }
}
