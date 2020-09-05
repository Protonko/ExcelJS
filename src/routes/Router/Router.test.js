import {Router} from './Router';
import {Page} from '../../core/Page';

class DashboardPageMock extends Page {
  getRoot() {
    const root = document.createElement('div');
    root.innerHTML = 'dashboard';

    return root;
  }
}

describe('Router:', () => {
  let router;
  let root;

  beforeEach(() => {
    root = document.createElement('div');
    router = new Router(root, {
      dashboard: DashboardPageMock,
    });
  });

  test('Should be defined', () => {
    expect(router).toBeDefined();
  });

  test('Should render dashboard page', () => {
    router.changePageHandler();
    expect(root.innerHTML).toBe('<div>dashboard</div>');
  });
});
