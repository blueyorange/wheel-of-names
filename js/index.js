import NamesModelFactory from "./names-model.js";

const model = NamesModelFactory({
  onAdd(name) {
    const list = document.querySelector(".names");
    const form = list
      .querySelector("template")
      .content.cloneNode(true).firstElementChild;
    form.name = `#${name}`;
    form.elements.name.value = name;
    form.elements.destroy.addEventListener("click", () =>
      model.deleteName(name)
    );
    list.appendChild(form);
  },

  onDelete(name) {
    document.forms[`#${name}`].remove();
  },

  onClearNames(names) {
    names.forEach(name => this.onDelete(name));
  },

  onCountChange(count) {
    document.documentElement.style.setProperty('--numberOfSlices', count);
    let x = 50/(Math.tan(3.14/count));
    // document.querySelector('.name').style.setProperty('clip-path', `polygon(0% 50%, ${x}% 0%, 0% 100%, 100% 100%, ${x}% 100%)`)
    Array.from(document.querySelector('.names').children).forEach((child, n) => {
      child.style.setProperty('transform', `rotate(${360*n/count}deg) skexX(${360*n/count})`)
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
