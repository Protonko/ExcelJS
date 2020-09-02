// vendors
import 'svgxuse';
import 'mdn-polyfills/Node.prototype.append';

import {Router} from '@core/routes/Router';
import {DashboardPage} from '@pages/dashboard/DashboardPage';
import {ExcelPage} from '@pages/ExcelPage';

new Router('#app', {
  dashboard: DashboardPage,
  excel: ExcelPage,
});
