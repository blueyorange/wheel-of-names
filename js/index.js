import NamesModelFactory from "./names-model.js";

const model = NamesModelFactory({
  onAdd: function (name) {
    const form = document
      .querySelector(".names template")
      .content.cloneNode(true).firstElementChild;
    form.name = `#${name}`;
    form.elements.name.value = name;
    form.elements.destroy.addEventListener("click", () =>
      model.deleteName(name)
    );
    document.querySelector(".names").appendChild(form);
  },

  onDelete: function (name) {
    document.forms[`#${name}`].remove();
  },
});

window.addEventListener("submit", (e) => e.preventDefault(), { capture: true });
document.forms.newName.addEventListener(
  "submit",
  ({
    target: {
      elements: {
        name: { value },
      },
    },
  }) => {
    model.addName(value);
  }
);
