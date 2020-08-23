class DOM {
  constructor(selector) { // '' || {}
    this.elem = typeof selector === 'string'
      ? document.querySelector(selector)
      : selector;
  }

  get data() {
    return this.elem.dataset;
  }

  html(html) {
    if (typeof html === 'string') {
      this.elem.innerHTML = html;
      return this;
    }
    return this.elem.outerHTML.trim();
  }

  clear() {
    this.html('');
    return this;
  }

  append(node) {
    node = (node instanceof DOM) ? node.elem : node;

    this.elem.append(node);
    return this;
  }

  on(eventType, callback) {
    this.elem.addEventListener(eventType, callback);
  }

  off(eventType, callback) {
    this.elem.removeEventListener(eventType, callback);
  }

  closest(selector) {
    return $(this.elem.closest(selector));
  }

  find(selector) {
    return this.elem.querySelectorAll(selector);
  }

  getCoords() {
    return this.elem.getBoundingClientRect();
  }

  css(styles = {}) {
    const stylesKeys = Object.keys(styles);

    stylesKeys.forEach(key => (
        this.elem.style[key] = styles[key]
    ));
  }
}

export function $(selector) {
  return new DOM(selector);
}

$.create = (tagName, classNames = '') => {
  const element = document.createElement(tagName);

  if (classNames) element.classList.add(classNames);

  return $(element);
};
