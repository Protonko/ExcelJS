import {$} from '@core/DOM';
import {ActiveRoute} from '@core/routes/ActiveRoute';

export class Router {
  constructor(selector, routes) {
    if (!selector) {
      throw new Error('Selector id nor provided in Router');
    }

    this.$placeholder = $(selector);
    this.routes = routes;
    this.page = null;

    this.changePageHandler = this.changePageHandler.bind(this);

    this.init();
  }

  init() {
    window.addEventListener('hashchange', this.changePageHandler);
    this.changePageHandler();
  }

  changePageHandler() {
    if (this.page) {
      this.page.destroy();
    }

    const {excel, dashboard} = this.routes;
    const Page = ActiveRoute.path.includes('excel') ? excel : dashboard;

    this.page = new Page(ActiveRoute.param);
    this.$placeholder.clear();
    this.$placeholder.append(this.page.getRoot());
    this.page.afterRender();
  }

  destroy() {
    window.removeEventListener('hashchange', this.changePageHandler);
  }
}
