import {TABLE_RESIZE, CHANGE_TEXT, CHANGE_STYLES, APPLY_STYLE} from './types';
import {buildReducers} from '@core/utils';

const reducers = {
  [TABLE_RESIZE](state, action) {
    const {type, id, cellSize} = action.data;
    const field = type === 'column' ? 'colState' : 'rowState';

    return {
      ...state,
      [field]: getValue(state, field, id, cellSize),
    };
  },

  [CHANGE_TEXT](state, action) {
    const {id, text} = action.data;
    const field = 'dataState';

    return {
      ...state,
      currentText: text,
      [field]: getValue(state, field, id, text),
    };
  },

  [CHANGE_STYLES](state, action) {
    return {...state, currentStyles: action.data};
  },

  [APPLY_STYLE](state, action) {
    const {identifiers, value} = action.data;
    const field = 'stylesState';
    const val = state[field] ?? {};

    identifiers.forEach(id => {
      val[id] = {...val[id], ...value};
    });

    return {
      ...state,
      [field]: val,
      currentStyles: {...state.currentStyles, ...value},
    };
  },
};

function getValue(state, field, id, data) {
  const value = state[field] ?? {};
  value[id] = data;

  return value;
}

export const rootReducer = buildReducers(reducers);
