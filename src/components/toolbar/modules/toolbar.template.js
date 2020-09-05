import {rgbToHex} from '@utils/utils';

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
                <use xlink:href="icons/icons.svg#icon-${button.icon}"></use>
            </svg>
       </button>
    </li>
  `;
}

function createColorButton(button, index) {
  const color = button.value;
  const colorHex = color?.startsWith('#') ? color : rgbToHex(color);

  return `
    <li class="toolbar__item">
        <label 
          class="toolbar__button button button--icon"
          for="color-${index}"
        >
            <svg class="toolbar__button-icon icon--toolbar">
                <use xlink:href="icons/icons.svg#icon-${button.icon}"></use>
            </svg>
       </label>
       <input
         class="toolbar__input"
         data-type="color-button"
         data-style="${button.style}"
         value="${colorHex}"
         type="color" id="color-${index}" 
       >
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

  const colorButtons = [
    {
      icon: 'color-fill',
      value: state['backgroundColor'],
      style: 'backgroundColor',
    },
    {
      icon: 'text-color',
      value: state['color'],
      style: 'color',
    },
  ];

  return `
    <div class="container-excel">
        <div class="toolbar">
           <ul class="toolbar__list list list--reset">
            ${buttons.map(createButton).join('')}
            ${colorButtons.map(createColorButton).join('')}
           </ul>
        </div>
    </div>
  `;
}
