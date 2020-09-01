import {Page} from '@core/Page';
import {$} from '@core/DOM';

export class DashboardPage extends Page {
  getRoot() {
    return $.create('div', 'dashboard').html(
      `
      <header class="header header-dashboard">
            <div class="container">
                <div class="header__wrapper">
                    <div class="logo header__logo">
                        <span class="logo__icon header__logo-icon">
                            <svg class="icon--logo">
                                <use xlink:href="/icons/icons.svg#icon-logo"></use>
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
                            <a href="#" class="card">
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
                    <div class="dashboard__list-header">
                        <h4 class="dashboard__list-header-text">
                            Название
                        </h4>
                        <h4 class="dashboard__list-header-text">
                            Дата открытия
                        </h4>
                    </div>

                    <div class="dashboard__list-body">
                        <div class="info">
                            <p class="info__text">
                                <a href="#" class="info__text-link">Таблица 1</a>
                            </p>

                            <p class="info__text">
                                25.05.2020
                            </p>
                        </div>

                        <div class="info">
                            <p class="info__text">
                                <a href="#" class="info__text-link">Таблица 1</a>
                            </p>

                            <p class="info__text">
                                25.05.2020
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
`
    );
  }
}
