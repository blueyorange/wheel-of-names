export default class Names extends Set {
  constructor(cb) {
    const storageKey = "names";
    const asJson = localStorage.getItem(storageKey);
    if (asJson) {
      super(JSON.parse(asJson));
    } else {
      super();
    }
    this.storageKey = storageKey;
    this.cb = cb;
  }

  save() {
    localStorage.setItem(this.storageKey, JSON.stringify(this));
    this.cb();
  }

  add(name) {
    super.add(name);
    this.save();
  }

  clear() {
    super.clear();
    this.save();
  }
}
