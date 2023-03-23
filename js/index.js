import Names from "./names-model.js";

const names = Names();

const App = {
  $: {
    add: document.querySelector('[data-names="input"]'),
    clear: document.querySelector('[data-names="clear"]'),
    names: document.querySelector('[data-names="names"]'),
  },

  init() {
    window.addEventListener("submit", (e) =>
      e.preventDefault({ capture: true })
    );
    window.addEventListener("save", App.render);
    App.$.add.addEventListener("submit", (e) => {
      App.onAddName(e.target.elements.input.value);
      e.target.elements.input.value = "";
    });
    App.$.clear.addEventListener("click", App.clearNames);
    App.$.names.addEventListener("click", App.spin);
  },

  onAddName(name) {
    names.add(name);
  },

  createNameItem(name) {
    const newNameEl = document.createElement("li");
    newNameEl.id = name;
    newNameEl.innerText = name;
    return newNameEl;
  },

  render() {
    App.$.names.replaceChildren(
      ...names.get().map((item) => App.createNameItem(item))
    );
  },
};

App.init();

// const names = Names({
//   listEl: document.querySelector(".names"),
//   currAngle: 0,
//   onAdd(name) {},

//   onDelete(name) {
//     this.listEl.querySelector(`#${name}`).remove();
//   },

//   onClearNames() {
//     [...this.listEl.children].forEach((el) => el.remove());
//   },

//   onCountChange(count) {
//     [...this.listEl.children].forEach((nameElement, n) => {
//       document.querySelector(":root").style.setProperty("--count", count);
//       nameElement.style.setProperty("--nth-sibling", n + 1);
//     });
//   },

//   onSpinStart(index) {
//     [...this.listEl.children].forEach((el) => el.classList.remove("selected"));
//     const minimumTurns = 5;
//     const length = [...this.listEl.children].length;
//     const angleOffset =
//       Math.random() / (2 * length) - Math.random() / (4 * length);
//     const endAngle = angleOffset - index / length + minimumTurns;
//     console.log("index", index);
//     console.log(`currAngle: ${this.currAngle}; endAngle: ${endAngle}`);
//     document
//       .querySelector(":root")
//       .style.setProperty("--start-angle", `${this.currAngle}turn`);
//     document
//       .querySelector(":root")
//       .style.setProperty("--end-angle", `${endAngle}turn`);
//     this.currAngle = endAngle % 1;
//     this.listEl.classList.remove("spin-wheel");
//     setTimeout(() => {
//       this.listEl.classList.add("spin-wheel");
//     }, 1);
//   },

//   onSpinEnd(name) {
//     this.listEl.querySelector(`#${name}`).classList.add("selected");
//     console.log(name);
//   },
// });
