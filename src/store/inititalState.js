import {DEFAULT_STYLES, DEFAULT_TITLE} from '@static';

const defaultState = {
  rowState: {},
  colState: {},
  dataState: {}, // {'0:1': 'text'}
  stylesState: {}, // {'id': {}}
  currentText: '',
  title: DEFAULT_TITLE,
  currentStyles: DEFAULT_STYLES,
  date: new Date().toJSON(),
};

const normalize = state => ({
  ...state,
  currentStyles: DEFAULT_STYLES,
  currentText: '',
});

export function normalizeInitialState(state) {
  return state ? normalize(state) : defaultState;
}
