import {generateId} from '../../utils/utils';

export class Page {
  constructor(params) {
    this.params = params ?? generateId();
  }

  getRoot() {
    throw new Error('Method "getRoot" should be implemented!');
  }

  afterRender() {

  }

  destroy() {

  }
}
