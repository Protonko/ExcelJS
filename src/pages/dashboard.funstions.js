function createTableTemplate() {
  return `
    <div class="info">
        <p class="info__text">
            <a href="#" class="info__text-link">Таблица 1</a>
        </p>
  
        <p class="info__text">
            25.05.2020
        </p>
    </div>
  `;
}

function getAllKeys() {
  const keys = [];

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);

    if (!key.includes('excel')) {
      continue;
    }

    keys.push(key);
  }

  return keys;
}

export function createRecordsTable() {
  const keys = getAllKeys();

  if (!keys.length) {
    return `<p>Tables not found</p>`;
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
