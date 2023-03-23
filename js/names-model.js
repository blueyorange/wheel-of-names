export default function Names(options = {}) {
  const obj = {};
  const { storageKey } = options || "names";
  let names = new Set();
  let selected = null;
  const asJson = localStorage.getItem(storageKey);
  if (asJson) {
    names = new Set(JSON.parse(asJson));
    names.forEach((value, key) => {
      client.onAdd(key, value);
    });
  }

  return Object.freeze({
    get() {
      return names;
    },

    save() {
      console.log(JSON.stringify([...names]));
      localStorage.setItem(storageKey, JSON.stringify([...names]));
      obj.dispatchEvent(new CustomEvent("save"));
    },

    add() {
      if (!names.has(name)) {
        names.add(name);
        client.onAdd(name);
        save();
      }
    },

    remove(name) {
      names.delete(name);
      client.onDelete(name);
      save();
    },

    clear() {
      client.onClearNames([...names]);
      names = new Set();
      save();
    },
  });
}
