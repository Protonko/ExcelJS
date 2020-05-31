class DOM {
  constructor(selector) { // '' || {}
    this.elem = typeof selector === 'string'
      ? document.querySelector(selector)
      : selector;
  }

  html(html) {
    if (typeof html === 'string') {
      this.elem.innerHTML = html;
      return this;
    } else {
      return this.elem.outerHTML.trim();
    }
  }

  clear() {
    this.html('');
    return this;
  }

  append(node) {
    if (node instanceof DOM) node = node.elem;
    this.elem.append(node);
    return this;
  }

  on(eventType, callback) {
    this.elem.addEventListener(eventType, callback);
  }

  off(eventType, callback) {
    this.elem.removeEventListener(eventType, callback);
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
