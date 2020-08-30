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
