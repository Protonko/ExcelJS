import {ExcelComponent} from '@core/ExcelComponent';

export class Table extends ExcelComponent {
  static className = 'excel-table';

  toHTML() {
    return `
      <div class="table">
          <div class="row">
              <div class="row__info">
              </div>
              <div class="row__data">
                  <div class="column">
                      A
                  </div>
                  <div class="column">
                      B
                  </div>
                  <div class="column">
                      C
                  </div>
              </div>
          </div>
          <div class="row">
              <div class="row__info">
                  1
              </div>
              <div class="row__data">
                  <div class="cell cell--selected" contenteditable>Hello</div>
                  <div class="cell" contenteditable>Beautiful</div>
                  <div class="cell" contenteditable>World</div>
              </div>
          </div>
          <div class="row">
              <div class="row__info">
                  2
              </div>
              <div class="row__data">
                  <div class="cell" contenteditable>Hello</div>
                  <div class="cell" contenteditable>Beautiful</div>
                  <div class="cell" contenteditable>World</div>
              </div>
          </div>
      </div>
    `;
  }
}
