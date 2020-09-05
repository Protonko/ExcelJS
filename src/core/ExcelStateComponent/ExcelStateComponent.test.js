import {ExcelStateComponent} from './ExcelStateComponent';
import {$} from '../../DOM/DOM';

const initialState = {
  backgroundColor: 'blue',
};
const newState = {
  color: 'green',
};
const changedState = {
  backgroundColor: 'blue',
  color: 'green',
};

class ComponentMock extends ExcelStateComponent {
  constructor($root, options) {
    super($root, {...options});
  }

  prepare() {
    this.initState(initialState);
  }
}

describe('ExcelStateComponent:', () => {
  let excelState;
  let root;

  beforeEach(() => {
    root = $.create('div');
    excelState = new ComponentMock(root, initialState);
  });

  test('Should be defined', () => {
    expect(excelState).toBeDefined();
    expect(excelState.initState).toBeDefined();
    expect(excelState.setState).toBeDefined();
  });

  test('Should return object as a state', () => {
    expect(excelState.state).toBeInstanceOf(Object);
  });

  test('Should change state', () => {
    excelState.setState(newState);

    expect(excelState.state).toEqual(changedState);
  });

  test('Should be immutable', () => {
    const prevState = excelState.state;
    excelState.setState(newState);

    expect(prevState === excelState.state).toBe(false);
  });
});
