const CLASSES = {
  selected: 'cell--selected',
};

export class TableSelection {
  constructor() {
    this.group = [];
    this.current = null;
  }

  get selectedIdentifiers() {
    return this.group.map($elem => $elem.id());
  }

  select($elem) { // $elem instanceof DOM === true
    this.clear();
    this.group.push($elem);
    this.current = $elem;
    $elem
        .focus()
        .addClass(CLASSES.selected);
  }

  clear() {
    this.group.forEach($elem => $elem.removeClass(CLASSES.selected));
    this.group = [];
  }

  selectGroup($group = []) {
    this.clear();
    this.group = $group;
    this.group.forEach($elem => $elem.addClass(CLASSES.selected));
  }

  applyStyle(style) {
    this.group.forEach($elem => $elem.css(style));
  }
}
