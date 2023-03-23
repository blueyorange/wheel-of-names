function Controller(model) {
  let angle = 0;
  function onAddName(name) {
    const newNameEl = document.createElement("li");
    newNameEl.id = name;
    newNameEl.innerText = name;
    this.listEl.appendChild(newNameEl);
  }

  function onDelete(name) {
    this.listEl.querySelector(`#${name}`).remove();
  }

  function onClearNames() {
    [...this.listEl.children].forEach((el) => el.remove());
  }

  function onCountChange(count) {
    [...this.listEl.children].forEach((nameElement, n) => {
      document.querySelector(":root").style.setProperty("--count", count);
      nameElement.style.setProperty("--nth-sibling", n + 1);
    });
  }

  function onSpinStart(index) {
    const minimumTurns = 5;
    const length = [...this.listEl.children].length;
    const angleOffset =
      Math.random() / (2 * length) - Math.random() / (4 * length);
    const endAngle = angleOffset - index / length + minimumTurns;

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
  }

  return {
    onAddName,
    onDelete,
    onCountChange,
    onClearNames,
    onSpinStart,
  };
}
export default Controller;
