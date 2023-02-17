export default function Names(client, options = {}) {
  const { storageKey } = options || "names";
  let names = new Set();
  let selected = null;
  const asJson = localStorage.getItem(storageKey);
  if (asJson) {
    names = new Set(JSON.parse(asJson));
    names.forEach((value, key) => {
      client.onAdd(key, value);
    });
    update();
  }

  function save() {
    console.log(JSON.stringify([...names]));
    localStorage.setItem(storageKey, JSON.stringify([...names]));
    update();
  }

  function update() {
    client.onCountChange(names.size);
  }

  function add(name) {
    if (!names.has(name)) {
      names.add(name);
      client.onAdd(name);
      save();
    }
  }

  function remove(name) {
    names.delete(name);
    client.onDelete(name);
    save();
  }

  function clear() {
    client.onClearNames([...names]);
    names = new Set();
    save();
  }

  function select() {
    const index = Math.floor(Math.random()*names.size);
    console.log(index);
    selected = [...names][index];
    client.onSpinStart(index);
  }

  function reveal() {
    client.onSpinEnd(selected);
  }
  return Object.freeze({ add, remove, clear, select, reveal });
}
