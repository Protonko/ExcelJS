import {storage} from '@core/utils';
import {DEFAULT_STYLES} from '@static';

const defaultState = {
  rowState: {},
  colState: {},
  dataState: {}, // {'0:1': 'text'}
  stylesState: {}, // {'id': {}}
  currentText: '',
  currentStyles: DEFAULT_STYLES,
};

// function normalize(state) {
//   return {
//     ...state,
//     currentStyles: DEFAULT_STYLES,
//     currentText: '',
//   };
// }

export const initialState = storage('excel-state') ?? defaultState;
