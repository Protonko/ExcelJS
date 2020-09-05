import {storage} from '@utils/utils';
import {getAllKeys} from '@pages/dashboard/modules/dashboard.functions';
import {DEFAULT_TITLE} from '@static';

function createTableTemplate(key) {
  const model = storage(key);
  const id = key.split(':')[1];
  const title = model.title || DEFAULT_TITLE;

  return `
    <div class="info">
        <p class="info__text">
            <a href="#excel/${id}" class="info__text-link">${title}</a>
        </p>
  
        <p class="info__text">
            ${new Date(model.date).toLocaleDateString()}
        </p>
    </div>
  `;
}

export function createRecordsTable() {
  const keys = getAllKeys();

  if (!keys.length) {
    return `<p class="dashboard__message">Tables not found</p>`;
  }

  return `
    <div class="dashboard__list-header">
        <h4 class="dashboard__list-header-text">
            Title
        </h4>
        <h4 class="dashboard__list-header-text">
            Date of creation
        </h4>
    </div>
  
    <div class="dashboard__list-body">
       ${keys.map(createTableTemplate).join('')}
    </div>
  `;
}
