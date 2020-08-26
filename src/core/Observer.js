export class Observer {
  constructor() {
    this.listeners = {};
  }

  /*
  * USING
  * selector.dispatch('ACTION', {param: something})
  */
  dispatch(event, ...args) {
    if (!Array.isArray(this.listeners[event])) {
      return false;
    }

    this.listeners[event].forEach(listener => {
      listener(...args);
    });
  }

  /*
  * USING
  * selector.subscribe('ACTION', () => {})
  */
  subscribe(event, fn) {
    this.listeners[event] = this.listeners[event] ?? [];
    this.listeners[event].push(fn);

    // unsubscribe
    return () => {
      this.listeners[event] =
          this.listeners[event].filter(listener => listener !== fn);
    };
  }
}
