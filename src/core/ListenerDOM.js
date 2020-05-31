import {capitalize} from '@core/utils';

export class ListenerDOM {
  constructor($root, listeners = []) {
    if (!$root) throw new Error(`No $root provided for ListenerDOM!`);
    this.$root = $root;
    this.listeners = listeners;
  }

  initListenersDOM() {
    this.listeners.forEach(listener => {
      const method = getMethodName(listener);

      if (!this[method]) {
        const name = this.name || '';
        throw new Error(`Method ${method} is not implemented in ${name} Component`);
      }
      this[method] = this[method].bind(this);
      this.$root.on(listener, this[method]);
    });
  }

  removeListenersDOM() {
    this.listeners.forEach(listener => {
      const method = getMethodName(listener);

      this.$root.off(listener, this[method]);
    });
  }
}

// event => onEvent
function getMethodName(eventName) {
  return 'on' + capitalize(eventName);
}
