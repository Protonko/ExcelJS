import {generateId} from '@utils/utils';
import {Page} from '@core/Page';
import {$} from '@DOM/DOM';
import {createRecordsTable} from './modules/dashboard.template';

export class DashboardPage extends Page {
  getRoot() {
    const newTableId = generateId();

    return $.create('div', 'dashboard').html(
      `
      <header class="header header-dashboard">
            <div class="container">
                <div class="header__wrapper">
                    <div class="logo header__logo">
                        <span class="logo__icon header__logo-icon">
                            <svg class="icon--logo">
                                <use xlink:href="icons/icons.svg#icon-logo"></use>
                            </svg>
                        </span>
                        <span class="logo__text">
                            Excel
                        </span>
                    </div>

                    <h1 class="header__title">
                        Excel Dashboard
                    </h1>
                </div>
            </div>
        </header>
        <main class="dashboard__wrapper">
            <section class="dashboard__new">
                <div class="container">
                    <ul class="dashboard__items">
                        <li class="dashboard__item">
                            <a href="#excel/${newTableId}" class="card">
                                <span>
                                    <svg class="icon--add">
                                        <use xlink:href="icons/icons.svg#icon-add"></use>
                                    </svg>
                                </span>
                            </a>
                        </li>
                    </ul>
                </div>
            </section>

            <section class="dashboard__list">
                <div class="container">
                    ${createRecordsTable()}
                </div>
            </section>
        </main>
`
    );
  }
}
