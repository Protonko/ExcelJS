import {TABLE_RESIZE} from './types';

export function rootReducer(state, action) {
  let prevState;
  let field;

  switch (action.type) {
    case TABLE_RESIZE:
      // eslint-disable-next-line no-case-declarations
      const {type, id, cellSize} = action.data;

      console.log(action.data);

      field = type === 'column' ? 'colState' : 'rowState';
      prevState = state[field] ?? {};
      prevState[id] = cellSize;
      return {...state, [field]: prevState}; // id, value
    default: return state;
  }
}
