import {createStore} from './createStore';

const TYPE = 'ADD';
const NOT_EXISTING_ACTION = 'NOT_EXISTING_ACTION';
const initialState = {
  count: 0,
};

const reducer = (state = initialState, action) => {
  if (action.type === TYPE) {
    return {
      ...state,
      count: state.count + 1,
    };
  } else {
    return state;
  }
};

describe('createStore:', () => {
  let store;
  let handler;

  beforeEach(() => {
    store = createStore(reducer, initialState);
    handler = jest.fn();
    console.log = jest.fn();
  });

  test('Should be defined', () => {
    expect(store).toBeDefined();
    expect(store.dispatch).toBeDefined();
    expect(store.subscribe).toBeDefined();
    expect(store.getState).toBeDefined();
    expect(store.logger).toBeDefined();
  });

  test('Should return object as a state', () => {
    expect(store.getState()).toBeInstanceOf(Object);
  });

  test('Should return default state', () => {
    expect(store.getState()).toEqual(initialState);
  });

  test('Should change state if action exists', () => {
    store.dispatch({type: TYPE});

    expect(store.getState().count).toBe(1);
  });

  test('Should NOT change state if action don`t exists', () => {
    store.dispatch({type: NOT_EXISTING_ACTION});

    expect(store.getState().count).toBe(0);
  });

  test('Should call subscriber function', () => {
    store.subscribe(handler);
    store.dispatch({type: TYPE});

    expect(handler).toHaveBeenCalled();
    expect(handler).toHaveBeenCalledWith(store.getState());
  });

  test('Should NOT call subscriber function if unsubscribe', () => {
    const subscription = store.subscribe(handler);

    subscription.unsubscribe();
    store.dispatch({type: TYPE});

    expect(handler).not.toHaveBeenCalled();
  });

  test('Should console.log two times', () => {
    store.logger(2, 'State');
    expect(console.log.mock.calls.length).toBe(2);
  });

  test('Should dispatch in async way', () => {
    return new Promise(resolve => {
      setTimeout(() => {
        store.dispatch({type: TYPE});
      }, 500);

      setTimeout(() => {
        expect(store.getState().count).toBe(1);
        resolve();
      }, 1000);
    });
  });
});
