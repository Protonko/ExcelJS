import {Page} from '@core/Page/Page';
import {StateProcessor} from '@core/Page/StateProcessor';
import {LocalStorageClient} from '@core/Page/LocalStorageClient';
import {createStore} from '@store/createStore/createStore';
import {rootReducer} from '@store/rootReducer';
import {normalizeInitialState} from '@store/inititalState';
import {Excel} from '@components/excel/Excel';
import {Header} from '@components/header/Header';
import {Toolbar} from '@components/toolbar/Toolbar';
import {Formula} from '@components/formula/Formula';
import {Table} from '@components/table/Table';

export class ExcelPage extends Page {
  constructor(param) {
    super(param);

    this.storeSubscription = null;
    this.processor = new StateProcessor(new LocalStorageClient(this.params[1]));
  }

  async getRoot() {
    const state = await this.processor.get();
    const initialState = normalizeInitialState(state);
    const store = createStore(rootReducer, initialState);

    this.storeSubscription = store.subscribe(this.processor.listen);

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
    this.storeSubscription.unsubscribe();
  }
}
