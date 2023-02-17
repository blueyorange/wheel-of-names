export default function NamesModelFactory(client, options = {}) {
  const { storageKey } = options || "names";
  let names = new Set();
  let selected = null;
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

  function spinStart() {
    const index = Math.floor(Math.random()*names.size)
    console.log(index);
    selected = [...names][index];
    client.onSpinStart(index);
  }

  function spinEnd() {
    client.onSpinEnd(selected);
  }
  return Object.freeze({ addName, deleteName, clearNames, spinStart, spinEnd });
}
