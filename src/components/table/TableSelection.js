const CLASSES = {
  selected: 'cell--selected',
};

export class TableSelection {
  constructor() {
    this.group = [];
    this.current = null;
  }

  select($elem) { // $elem instanceof DOM === true
    this.clear();
    this.group.push($elem);
    this.current = $elem;
    $elem.addClass(CLASSES.selected);
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
}
