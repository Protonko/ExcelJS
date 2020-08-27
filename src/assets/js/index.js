// vendors
import 'svgxuse';
import 'mdn-polyfills/Node.prototype.append';

// components
import {Excel} from '@components/excel/Excel';
import {Header} from '@components/header/Header';
import {Toolbar} from '@components/toolbar/Toolbar';
import {Formula} from '@components/formula/Formula';
import {Table} from '@components/table/Table';
import {createStore} from '@core/createStore';
import {rootReducer} from '@store/rootReducer';

const store = createStore(rootReducer, {
  tableTitle: 'Excel table',
});

const excel = new Excel('#app', {
  components: [Header, Toolbar, Formula, Table],
  store,
});

excel.render();
