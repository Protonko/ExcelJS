// Pure functions
export function capitalize(string) {
  if (typeof string !== 'string') return '';

  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function range(start, end) { // (0, 3) -> [0, 1, 2, 3]
  if (start > end) {
    [end, start] = [start, end];
  }

  return new Array(end - start + 1)
      .fill('')
      .map((_, index) => start + index);
}

export function storage(key, data) {
  if (data) {
    localStorage.setItem(key, JSON.stringify(data));
  } else {
    return JSON.parse(localStorage.getItem(key));
  }
}

export function removeStorage(key) {
  localStorage.removeItem(key);
}

export function buildReducers(reducers, defaultState = {}) {
  return function(state = defaultState, action) {
    return reducers[action.type] ? reducers[action.type](state, action) : state;
  };
}

export function isEqual(a, b) {
  if (typeof a === 'object' && typeof b === 'object') {
    return JSON.stringify(a) === JSON.stringify(b);
  }
  return a === b;
}

export function camelCaseToDash(string) {
  return string.replace(/([A-Z])/g, g => `-${g[0].toLowerCase()}`);
}

export function toInlineStyles(styles = {}) {
  return Object.keys(styles)
      .map(key => `${camelCaseToDash(key)}: ${styles[key]}`)
      .join(';');
}

export function debounce(fn, wait) {
  let timeout;

  return function(...args) {
    const later = () => {
      clearTimeout(timeout);
      fn(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export function parse(value = '') {
  if (value.startsWith('=')) {
    try {
      return eval(value.slice(1));
    } catch (error) {
      console.warn(error.message);
      return value;
    }
  }

  return value;
}

export function generateId() {
  const id = `_${Math.random()
    .toString(36)
    .substring(2, 9)}`;

  return id;
}

export function rgbToHex(color) {
  const matchColors = /rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)/;
  const match = matchColors.exec(color);

  if (match) {
    return '#' + componentToHex(match[1]) + componentToHex(match[2]) + componentToHex(match[3]);
  } else {
    return '#FFFFFF'; // default color
  }
}

function componentToHex(color) {
  const hex = Number(color).toString(16) ?? '';

  return hex.length === 1 ? '0' + hex : hex;
}
