import NamesModelFactory from "./names-model.js";

const model = NamesModelFactory({
  listEl: document.querySelector('.names'),
  onAdd(name) {
    const newNameEl = document.createElement('li');
    newNameEl.id=name;
    newNameEl.innerText=name;
    newNameEl.addEventListener('click', () => model.deleteName(name));
    this.listEl.appendChild(newNameEl);
  },

  onDelete(name) {
    this.listEl.querySelector(name).remove();
  },

  onClearNames() {
    [...this.listEl.children].forEach(el => el.remove());
  },

  onCountChange(count) {
    Array.from(this.listEl.children).forEach((nameElement, n) => {
      let x = 50*(1/Math.tan(3.14/count)+1);
      nameElement.style.setProperty('clip-path', `polygon(50% 50%, ${x}% 0%, 100% 0%, 100% 100%, ${x}% 100%)`);
      nameElement.style.setProperty('transform', `rotate(${6.28*n/count}rad)`);
      let hue = Math.floor(360*n/6);
      nameElement.style.setProperty('background-color', `hsl(${hue}, 100%, 20%)`);
    })
  }
});

window.addEventListener("submit", (e) => e.preventDefault(), { capture: true });
document.querySelector('#clear-names').addEventListener('click', model.clearNames);
document.forms.newName.addEventListener(
  "submit",
  e => {
    model.addName(e.target.elements.name.value);
    e.target.elements.name.value = "";
  }
);
