// vendors
import 'svgxuse';
import 'mdn-polyfills/Node.prototype.append';

import {storage, debounce} from '@core/utils';

// components
import {Excel} from '@components/excel/Excel';
import {Header} from '@components/header/Header';
import {Toolbar} from '@components/toolbar/Toolbar';
import {Formula} from '@components/formula/Formula';
import {Table} from '@components/table/Table';

// store
import {createStore} from '@core/createStore';
import {rootReducer} from '@store/rootReducer';
import {initialState} from '@store/inititalState';

const DELAY = 300;

const store = createStore(rootReducer, initialState);

const stateListener = debounce(state => {
  storage('excel-state', state);
}, DELAY);

store.subscribe(stateListener);

const excel = new Excel('#app', {
  components: [Header, Toolbar, Formula, Table],
  store,
});

excel.render();
