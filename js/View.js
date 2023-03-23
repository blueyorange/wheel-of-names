function View(controller) {
  // make SPA
  window.addEventListener("submit", (e) => e.preventDefault(), {
    capture: true,
  });
  document
    .querySelector("#names")
    .addEventListener("click", controller.onSpinStart);
  document.forms.names.elements.clear.addEventListener(
    "click",
    controller.onClearNames
  );
  document.forms.names.addEventListener("submit", (e) => {
    console.log(e.target.elements.add.value);
    controller.onAddName(e.target.elements.add.value);
    e.target.elements.add.value = "";
  });

  return;
}

export default View;
