import {debounce} from '@utils/utils';

const DELAY = 300;

export class StateProcessor {
  constructor(client, delay = DELAY) {
    this.client = client;
    this.listen = debounce(this.listen.bind(this), delay);
  }
  listen(state) {
    this.client.save(state);
  }

  get() {
    return this.client.get();
  }
}
