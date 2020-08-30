const ACTION_STYLE = 'font-weight: 700; color: #19D1FF';
const NEXT_STATE_STYLE = 'font-weight: 700; color: #32A852';

export function createStore(rootReducer, initialState = {}) {
  let state = rootReducer({...initialState}, {type: '__INIT__'});
  let listeners = [];

  return {
    subscribe(fn) {
      listeners.push(fn);

      return {
        unsubscribe() {
          listeners = listeners.filter(listener => listener !== fn);
        },
      };
    },

    dispatch(action) {
      if (process.env.NODE_ENV === 'development') {
        this.logger(action, state);
      }

      state = rootReducer(state, action);
      listeners.forEach(listener => listener(state));
    },

    getState() {
      // Avoiding mutation
      return JSON.parse(JSON.stringify(state));
    },

    logger(action, state) {
      console.log('%c action', ACTION_STYLE, action);
      console.log('%c next state:', NEXT_STATE_STYLE, state);
    },
  };
}
