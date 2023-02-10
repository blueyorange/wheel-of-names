export default function NamesModelFactory(client, options = {}) {
  const { storageKey } = options || "names";
  let names = new Set();
  const asJson = localStorage.getItem(storageKey);
  if (asJson) {
    names = new Set(JSON.parse(asJson));
    names.forEach((value, key) => {
      client.onAdd(key, value);
    });
    updateCount();
  }

  function save() {
    console.log(JSON.stringify([...names]));
    localStorage.setItem(storageKey, JSON.stringify([...names]));
    updateCount();
  }

  function updateCount() {
    client.onCountChange(names.size);
  }

  function addName(name) {
    if (!names.has(name)) {
      names.add(name);
      client.onAdd(name);
      save();
    }
  }

  function deleteName(name) {
    names.delete(name);
    client.onDelete(name);
    save();
  }

  function clearNames() {
    client.onClearNames([...names]);
    names = new Set();
    save();
  }

  function selectName() {
    const index = Math.floor(Math.random()*names.size);
    const name = [...names][index];
    client.onSelectName(name)
  }
  return Object.freeze({ addName, deleteName, clearNames, selectName });
}
