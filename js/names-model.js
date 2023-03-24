export default class Names extends Set {
  #storageKey = "names";
  constructor(cb) {
    const storageKey = "names";
    const asJson = localStorage.getItem(storageKey);
    if (asJson) {
      try {
        super(JSON.parse(asJson));
      } catch {
        console.log("localStorage data not iterable");
      }
    } else {
      super();
    }
    this.storageKey = storageKey;
    this.cb = cb;
  }

  save() {
    localStorage.setItem(this.#storageKey, JSON.stringify(this.#storageKey));
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
