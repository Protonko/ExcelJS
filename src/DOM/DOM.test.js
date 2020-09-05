import {$, DOM} from './DOM';

const event = new CustomEvent('test-event');
const CALLBACK_MESSAGE = 'Success!';
const DEFAULT_TEXT_CONTENT = 'Test text';
const TEXT_CONTENT = 'Hello test!';
const DATA_ATTR = {name: 'data-id', value: '0:0'};
const PARSED_ID = {col: 0, row: 0};
const DEFAULT_CLASSNAME = 'test';
const CLASSNAME = 'test--modifier';
const STYLES = {color: 'red', position: 'relative'};

describe('DOM:', () => {
  let dom;
  let $elem;
  let elem;
  let fn;

  beforeEach(() => {
    dom = new $();
    $elem = $.create('div', DEFAULT_CLASSNAME);
    elem = $elem.elem;
    fn = jest.fn(() => CALLBACK_MESSAGE);


    $elem.text(DEFAULT_TEXT_CONTENT);
    $elem.attr(DATA_ATTR.name, DATA_ATTR.value);
  });

  test('Should be defined', () => {
    expect($).toBeDefined();
    expect($.create).toBeDefined();
    expect(dom.html).toBeDefined();
    expect(dom.text).toBeDefined();
    expect(dom.clear).toBeDefined();
    expect(dom.addClass).toBeDefined();
    expect(dom.removeClass).toBeDefined();
    expect(dom.append).toBeDefined();
    expect(dom.on).toBeDefined();
    expect(dom.off).toBeDefined();
    expect(dom.closest).toBeDefined();
    expect(dom.find).toBeDefined();
    expect(dom.findSingle).toBeDefined();
    expect(dom.getCoords).toBeDefined();
    expect(dom.id).toBeDefined();
    expect(dom.focus).toBeDefined();
    expect(dom.css).toBeDefined();
    expect(dom.getStyles).toBeDefined();
    expect(dom.attr).toBeDefined();
  });

  test('Should get html code of $elem', () => {
    expect($elem.html())
      .toBe(`<div class="test" data-id="${DATA_ATTR.value}">${DEFAULT_TEXT_CONTENT}</div>`);
  });

  test('Should get text content of $elem', () => {
    expect($elem.text()).toBe(DEFAULT_TEXT_CONTENT);
  });

  test('Should return instance of DOM', () => {
    expect($elem.text('Hello')).toBeInstanceOf(DOM);
  });

  test('Should change text content', () => {
    $elem.text(TEXT_CONTENT);

    expect(elem.textContent).toBe(TEXT_CONTENT);
  });

  test('Should clear text content', () => {
    $elem.clear();

    expect(elem.textContent).toBe('');
  });

  test('Should add class to html element', () => {
    $elem.addClass(CLASSNAME);

    expect(elem.className).toBe(`${DEFAULT_CLASSNAME} ${CLASSNAME}`);
  });

  test('Should remove class of html element', () => {
    $elem.removeClass(DEFAULT_CLASSNAME);

    expect(elem.className).toBe('');
  });

  test('Should call callback', () => {
    $elem.on('test-event', fn);
    elem.dispatchEvent(event);

    expect(fn).toBeCalled();
  });

  test('Should return "Success!"', () => {
    $elem.on('test-event', fn);
    elem.dispatchEvent(event);

    expect(fn.mock.results[0].value).toBe(CALLBACK_MESSAGE);
  });

  test('Should NOT call callback', () => {
    $elem.on('test-event', fn);
    $elem.off('test-event', fn);
    elem.dispatchEvent(event);

    expect(fn).not.toBeCalled();
  });

  test('Should return data attribute of $elem', () => {
    expect($elem.attr(DATA_ATTR.name)).toBe(DATA_ATTR.value);
  });

  test('Should return data-id of $elem', () => {
    expect($elem.id()).toBe(DATA_ATTR.value);
  });

  test('Should return array from data-id $elem in format {col: name, row: value}', () => {
    expect($elem.id(true)).toEqual(PARSED_ID);
  });

  test('Should return style of element', () => {
    $elem.css(STYLES);
    expect(elem.style.color).toEqual(STYLES.color);
    expect(elem.style.position).toEqual(STYLES.position);
  });
});
