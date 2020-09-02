import {$} from '@core/DOM';
import {Observer} from '@core/Observer';
import {StoreSubscriber} from '@core/StoreSubscriber';
import {updateDate} from '@store/actions';

export class Excel {
  constructor(options) { // ('', {})
    this.components = options.components ?? [];
    this.store = options.store;
    this.observer = new Observer();
    this.subscriber = new StoreSubscriber(this.store);
  }

  getRoot() {
    const $root = $.create('div', 'excel');

    const componentOptions = {
      store: this.store,
      observer: this.observer,
    };

    this.components = this.components.map(Component => { // get each component
      const $element = $.create('div', Component.className);
      const component = new Component($element, componentOptions); // create instance class

      $element.html(component.toHTML());
      $root.append($element);

      return component;
    });

    return $root;
  }

  init() {
    this.store.dispatch(updateDate());
    this.subscriber.subscribeComponents(this.components);
    this.components.forEach(component => component.init());
  }

  destroy() {
    this.subscriber.unsubscribeFromStore();
    this.components.forEach(component => component.destroy());
  }
}
