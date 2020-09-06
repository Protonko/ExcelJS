import {Router} from './Router';
import {Page} from '../../core/Page/Page';

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

  test('Should render dashboard page after 1500s', () => {
    router.changePageHandler();

    return new Promise(resolve => {
      setTimeout(() => {
        expect(root.innerHTML).toBe('<div>dashboard</div>');
        resolve();
      }, 1500);
    });
  });
});
