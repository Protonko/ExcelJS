import * as utils from './utils';
import {buildReducers} from './utils';

const TIME = 1000;
const WORD = 'string';
const PARSED_EXPRESSION = '=2 + 2';
const RESULT = 4;
const CAPITALISED_WORD = 'String';
const STYLES = {fontSize: 12, backgroundColor: 'rose'};
const CAMEL_CASE = 'fontSize: 12, backgroundColor: rose';
const DASH_CASE = 'font-size: 12, background-color: rose';
const INLINE_STYLE = 'font-size: 12;background-color: rose';
const ACTION = {type: 'ADD'};

const defaultState = {
  count: 0,
};

const newState = {
  count: 1,
};

const reducer = {
  [ACTION.type](state) {
    return {
      ...state,
      count: state.count + 1,
    };
  },
};

describe('utils', () => {
  test('Should be defined', () => {
    expect(utils.capitalize).toBeDefined();
    expect(utils.storage).toBeDefined();
    expect(utils.removeStorage).toBeDefined();
    expect(utils.buildReducers).toBeDefined();
    expect(utils.isEqual).toBeDefined();
    expect(utils.camelCaseToDash).toBeDefined();
    expect(utils.toInlineStyles).toBeDefined();
    expect(utils.debounce).toBeDefined();
    expect(utils.parse).toBeDefined();
    expect(utils.generateId).toBeDefined();
  });

  test('Should capitalise word', () => {
    expect(utils.capitalize(WORD)).toBe(CAPITALISED_WORD);
  });

  test('Should return function', () => {
    expect(buildReducers(reducer, defaultState)).toBeInstanceOf(Function);
  });

  test('Should return default state', () => {
    expect(buildReducers(reducer, defaultState)(defaultState, ACTION)).toEqual(newState);
  });

  test('Should return true because a === b', () => {
    expect(utils.isEqual(12, 12)).toBe(true);
  });

  test('Should return dash case', () => {
    expect(utils.camelCaseToDash(CAMEL_CASE)).toBe(DASH_CASE);
  });

  test('Should return string as inline css style', () => {
    expect(utils.toInlineStyles(STYLES)).toBe(INLINE_STYLE);
  });

  test('Should call function after 1 second', () => {
    const fn = jest.fn();
    const debounceFunc = utils.debounce(fn, TIME);

    return new Promise(resolve => {
      debounceFunc();
      expect(fn).not.toHaveBeenCalled();

      setTimeout(() => {
        expect(fn).toHaveBeenCalled();
        resolve();
      }, 1000);
    });
  });

  test('Should return value', () => {
    expect(utils.parse(WORD)).toBe(WORD);
  });

  test('Should return result of expression', () => {
    expect(utils.parse(PARSED_EXPRESSION)).toBe(RESULT);
  });

  test('Should start with _', () => {
    expect(utils.generateId().startsWith('_')).toBe(true);
  });

  test('Should start with _', () => {
    expect(utils.generateId().length).toBe(8);
  });
});
