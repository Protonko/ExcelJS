function createButton(button) {
  const isActive = button.active ? 'toolbar__button toolbar__button--active' : 'toolbar__button';
  const meta = `data-value='${JSON.stringify(button.value)}'`;

  return `
    <li class="toolbar__item">
        <button 
          class="${isActive} button button--icon"
          data-type="button"
          ${meta}
        >
            <svg class="toolbar__button-icon icon--toolbar">
                <use xlink:href="/icons/icons.svg#icon-${button.icon}"></use>
            </svg>
       </button>
    </li>
  `;
}

export function createToolbar(state) {
  const buttons = [
    {
      icon: 'align-left',
      active: state['textAlign'] === 'left',
      value: {textAlign: 'left'},
    },
    {
      icon: 'align-center',
      active: state['textAlign'] === 'center',
      value: {textAlign: 'center'},
    },
    {
      icon: 'align-right',
      active: state['textAlign'] === 'right',
      value: {textAlign: 'right'},
    },
    {
      icon: 'bold',
      active: state['fontWeight'] === 'bold',
      value: {fontWeight: state['fontWeight'] === 'bold' ? 'normal' : 'bold'},
    },
    {
      icon: 'italic',
      active: state['fontStyle'] === 'italic',
      value: {fontStyle: state['fontStyle'] === 'italic' ? 'normal' : 'italic'},
    },
    {
      icon: 'underlined',
      active: state['textDecoration'] === 'underline',
      value: {textDecoration: state['textDecoration'] === 'underline' ? 'none' : 'underline'},
    },
  ];

  return `
    <div class="container-excel">
        <div class="toolbar">
           <ul class="toolbar__list list list--reset">
            ${buttons.map(createButton).join('')}
           </ul>
        </div>
    </div>
  `;
}
