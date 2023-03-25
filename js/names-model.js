export default function Names(cb) {
  const names = new Set();
  const storageKey = "names";
  const asJson = localStorage.getItem(storageKey);

  if (asJson) {
    try {
      JSON.parse(asJson).forEach((name) => names.add(name));
    } catch {
      console.log("Error: localStorage data not iterable");
      localStorage.clear(storageKey);
    }
  }
  function save() {
    localStorage.setItem(storageKey, JSON.stringify([...names]));
    cb();
  }

  function isValid(name) {
    // reject empty string or whitespace
    return !/^\s*$/.test(name);
  }

  function add(name) {
    if (isValid(name)) {
      names.add(name);
      save();
    }
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
