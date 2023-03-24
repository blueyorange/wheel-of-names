export default function Names(cb) {
  const names = new Set();
  const storageKey = "names";
  const asJson = localStorage.getItem(storageKey);

  if (asJson) {
    try {
      JSON.parse(asJson).forEach((name) => names.add(name));
    } catch {
      console.log("localStorage data not iterable");
      localStorage.clear(storageKey);
    }
  }
  function save() {
    localStorage.setItem(storageKey, JSON.stringify(storageKey));
    cb();
  }

  function add(name) {
    names.add(name);
    save();
  }

  function clear() {
    names.clear();
    save();
  }

  function get() {
    return Object.freeze([...names.values()]);
  }

  return Object.freeze({
    get,
    add,
    clear,
    get count() {
      return get().length;
    },
  });
}
