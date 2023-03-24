import Names from "./names-model.js";

function App() {
  const $ = {
    input: document.querySelector('[data-names="input"]'),
    clear: document.querySelector('[data-names="clear"]'),
    names: document.querySelector('[data-names="names"]'),
    spin: document.querySelector('[data-names="spin"]'),
  };

  let currAngle = 0;
  let names = new Names(render);
  window.addEventListener("submit", (e) => e.preventDefault({ capture: true }));
  $.input.addEventListener("submit", (e) => {
    addName(e.target.elements.input.value);
    e.target.elements.input.value = "";
  });
  $.clear.addEventListener("click", () => names.clear());
  $.spin.addEventListener("click", spin);
  render();

  function addName(name) {
    console.log(name);
    names.add(name);
  }

  function createNameItem(name) {
    const newNameEl = document.createElement("li");
    newNameEl.id = name;
    newNameEl.innerText = name;
    return newNameEl;
  }

  function spin() {
    const index = Math.floor(Math.random() * names.size);
    const endAngle = currAngle + index / names.size;
    console.log("index", index);
    console.log(`currAngle: ${currAngle}; endAngle: ${endAngle}`);
    document
      .querySelector(":root")
      .style.setProperty("--start-angle", `${currAngle}turn`);
    document
      .querySelector(":root")
      .style.setProperty("--end-angle", `${endAngle}turn`);
    currAngle = endAngle % 1;
    $.names.classList.remove("spin-wheel");
    setTimeout(() => {
      $.names.classList.add("spin-wheel");
    }, 1);
  }

  function render() {
    console.log("render");
    $.names.replaceChildren(...[...names].map((item) => createNameItem(item)));
    document.querySelector(":root").style.setProperty("--count", names.size);
    [...$.names.children].forEach(($name, n) => {
      $name.style.setProperty("--nth-sibling", n + 1);
    });
  }
}

const app = App();

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

//   },

//   onSpinEnd(name) {
//     this.listEl.querySelector(`#${name}`).classList.add("selected");
//     console.log(name);
//   },
// });
