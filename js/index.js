import Names from "./names-model.js";

const names = Names({
  listEl: document.querySelector(".names"),
  currAngle: 0,
  onAdd(name) {
    const newNameEl = document.createElement("li");
    newNameEl.id = name;
    newNameEl.innerText = name;
    // newNameEl.addEventListener('click', () => model.deleteName(name));
    this.listEl.appendChild(newNameEl);
  },

  onDelete(name) {
    this.listEl.querySelector(`#${name}`).remove();
  },

  onClearNames() {
    [...this.listEl.children].forEach((el) => el.remove());
  },

  onCountChange(count) {
    [...this.listEl.children].forEach((nameElement, n) => {
      document.querySelector(":root").style.setProperty("--count", count);
      nameElement.style.setProperty("--nth-sibling", n + 1);
    });
  },

  onSpinStart(index) {
    [...this.listEl.children].forEach((el) => el.classList.remove("selected"));
    const minimumTurns = 5;
    const length = [...this.listEl.children].length;
    const angleOffset =
      Math.random() / (2 * length) - Math.random() / (4 * length);
    const endAngle = angleOffset - index / length + minimumTurns;
    console.log("index", index);
    console.log(`currAngle: ${this.currAngle}; endAngle: ${endAngle}`);
    document
      .querySelector(":root")
      .style.setProperty("--start-angle", `${this.currAngle}turn`);
    document
      .querySelector(":root")
      .style.setProperty("--end-angle", `${endAngle}turn`);
    this.currAngle = endAngle % 1;
    this.listEl.classList.remove("spin-wheel");
    setTimeout(() => {
      this.listEl.classList.add("spin-wheel");
    }, 1);
  },

  onSpinEnd(name) {
    this.listEl.querySelector(`#${name}`).classList.add("selected");
    console.log(name);
  },
});

window.addEventListener("submit", (e) => e.preventDefault(), { capture: true });
document.forms.names.elements.clear.addEventListener("click", names.clear);
document.forms.names.addEventListener("submit", (e) => {
  names.add(e.target.elements.add.value);
  e.target.elements.add.value = "";
});
document.querySelector(".names").addEventListener("click", names.select);
document.querySelector(".names").addEventListener("animationend", names.reveal);
