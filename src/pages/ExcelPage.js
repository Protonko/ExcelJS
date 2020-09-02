import {Page} from '@core/Page';
import {debounce, storage, generateId} from '@core/utils';
import {createStore} from '@core/createStore';
import {rootReducer} from '@store/rootReducer';
import {normalizeInitialState} from '@store/inititalState';
import {Excel} from '@components/excel/Excel';
import {Header} from '@components/header/Header';
import {Toolbar} from '@components/toolbar/Toolbar';
import {Formula} from '@components/formula/Formula';
import {Table} from '@components/table/Table';

const DELAY = 300;

function storageName(param) {
  return `excel:${param}`;
}

export class ExcelPage extends Page {
  getRoot() {
    const params = this?.params[1] ?? generateId();
    const state = storage(storageName(params));
    const initialState = normalizeInitialState(state);
    const store = createStore(rootReducer, initialState);
    const stateListener = debounce(state => {
      storage(storageName(params), state);
    }, DELAY);

    store.subscribe(stateListener);

    this.excel = new Excel( {
      components: [Header, Toolbar, Formula, Table],
      store,
    });

    return this.excel.getRoot();
  }

  afterRender() {
    this.excel.init();
  }

  destroy() {
    this.excel.destroy();
  }
}
