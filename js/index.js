import Names from "./names-model.js";

function App() {
  const $ = {
    input: document.forms.input,
    clear: document.querySelector('[data-names="clear"]'),
    names: document.querySelector('[data-names="names"]'),
    spin: document.querySelector('[data-names="spin"]'),
  };

  let currAngle = 0;
  let index = 0;
  const names = Names(render);
  window.addEventListener("submit", (e) => e.preventDefault({ capture: true }));
  $.input.addEventListener("submit", (e) => {
    addName(e.target.elements.input.value);
    e.target.elements.input.value = "";
  });
  $.clear.addEventListener("click", () => names.clear());
  $.spin.addEventListener("click", spin);
  $.names.addEventListener("animationend", spinEnd);
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
    for (let child of $.names.children) {
      child.classList.remove("selected");
    }
    index = Math.floor(Math.random() * names.count);
    const endAngle = -1 - index / names.count;
    console.log("index", index);
    console.log(`currAngle: ${currAngle}; endAngle: ${endAngle}`);
    document
      .querySelector(":root")
      .style.setProperty("--start-angle", `${currAngle}turn`);
    document
      .querySelector(":root")
      .style.setProperty("--end-angle", `${endAngle}turn`);
    $.names.classList.remove("spin-wheel");
    setTimeout(() => {
      $.names.classList.add("spin-wheel");
    }, 1);
    currAngle = endAngle % 1;
  }

  function spinEnd() {
    const winner = [...names.get()][index];
    console.log($.names.querySelector(`#${winner}`));
    $.names.querySelector(`#${winner}`).classList.add("selected");
  }

  function render() {
    $.names.replaceChildren(...names.get().map((item) => createNameItem(item)));
    document.querySelector(":root").style.setProperty("--count", names.count);
    [...$.names.children].forEach(($name, n) => {
      $name.style.setProperty("--nth-sibling", n);
    });
  }
}

App();
