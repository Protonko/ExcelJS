import {TABLE_RESIZE, CHANGE_TEXT} from './types';
import {buildReducers} from '@core/utils';

const reducers = {
  [TABLE_RESIZE](state, action) {
    const {type, id, cellSize} = action.data;
    const field = type === 'column' ? 'colState' : 'rowState';
    const prevState = state[field] ?? {};

    prevState[id] = cellSize;

    return {...state, [field]: prevState}; // id, value
  },

  [CHANGE_TEXT](state, action) {
    const {id, text} = action.data;
    const prevState = state['dataState'] ?? {};

    prevState[id] = action.data.text;

    return {...state, currentText: text, dataState: prevState};
  },
};

  export const rootReducer = buildReducers(reducers);
