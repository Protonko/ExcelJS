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

  text(text) {
    this.elem.textContent = text;
  }

  clear() {
    this.html('');
    return this;
  }

  addClass(className) {
    this.elem.classList.add(className);
  }

  removeClass(className) {
    this.elem.classList.remove(className);
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

  findSingle(selector) {
    return $(this.elem.querySelector(selector));
  }

  getCoords() {
    return this.elem.getBoundingClientRect();
  }

  id(parse) {
    if (parse) {
      const parsed = this.id().split(':'); // '0:0' -> ['0', '0']

      return {
        row: +parsed[0],
        col: +parsed[1],
      };
    }
    return this.data.id;
  }

  focus() {
    this.elem.focus();
    return this;
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
