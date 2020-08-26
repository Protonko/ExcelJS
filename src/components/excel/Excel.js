import {$} from '@core/DOM';
import {Observer} from '@core/Observer';

export class Excel {
  constructor(selector, options) { // ('', {})
    this.$elem = $(selector);
    this.components = options.components || [];
    this.observer = new Observer();
  }

  getRoot() {
    const $root = $.create('div', 'excel');

    const componentOptions = {
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

  render() {
    this.$elem.append(this.getRoot());

    this.components.forEach(component => component.init());
  }
}
