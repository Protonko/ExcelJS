export class ListenerDOM {
  constructor($root) {
    if (!$root) throw new Error(`No $root provided for ListenerDOM!`);
    this.$root = $root;
  }
}
