import {$} from '../../DOM/DOM';

export function Loader() {
  return $.create('div', 'loader').html(`
      <div class="loader__container">
          <div class="loader__circle"></div>
          <div class="loader__circle"></div>
          <div class="loader__circle"></div>
          <div class="loader__circle"></div>
          <div class="loader__circle"></div>
          <div class="loader__circle"></div>
          <div class="loader__circle"></div>
          <div class="loader__circle"></div>
          <div class="loader__circle"></div>
          <div class="loader__circle"></div>
          <div class="loader__circle"></div>
          <div class="loader__circle"></div>
      </div>
  `);
}
