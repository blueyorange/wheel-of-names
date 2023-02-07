const uuidv4 = () => new Date().valueOf();

export default function NamesModelFactory(client, options = {}) {
  const { storageKey } = options || "names";
  let names = new Set();
  const asJson = localStorage.getItem(storageKey);
  if (asJson) {
    names = new Set(JSON.parse(asJson));
    names.forEach((value, key) => {
      client.onAdd(key, value);
    });
  }

  function save() {
    console.log(JSON.stringify([...names]));
    localStorage.setItem(storageKey, JSON.stringify([...names]));
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
  return Object.freeze({ addName, deleteName });
}
