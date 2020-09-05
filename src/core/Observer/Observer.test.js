import {Observer} from './Observer';

const EVENT = 'test:event';
const NAME = 'Egor';

describe('Observer:', () => {
  let observer;
  let fn;

  beforeEach(() => {
    observer = new Observer();
    fn = jest.fn(name => `Hello, ${name}`);
  });

  test('Should be defined', () => {
    expect(observer).toBeDefined();
    expect(observer.dispatch).toBeDefined();
    expect(observer.subscribe).toBeDefined();
  });

  test('Should call callback', () => {
    observer.subscribe(EVENT, fn);
    observer.dispatch(EVENT);

    expect(fn).toBeCalled();
  });

  test('Should return callback message', () => {
    observer.subscribe(EVENT, fn);
    observer.dispatch(EVENT, NAME);

    expect(fn.mock.results[0].value).toBe(`Hello, ${NAME}`);
  });
});
