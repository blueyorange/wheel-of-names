import NamesModelFactory from "./names-model.js";

const model = NamesModelFactory({
  listEl: document.querySelector('.names'),
  currAngle: 0,
  onAdd(name) {
    const newNameEl = document.createElement('li');
    newNameEl.id=name;
    newNameEl.innerText=name;
    // newNameEl.addEventListener('click', () => model.deleteName(name));
    this.listEl.appendChild(newNameEl);
  },

  onDelete(name) {
    this.listEl.querySelector(`#${name}`).remove();
  },

  onClearNames() {
    [...this.listEl.children].forEach(el => el.remove());
  },

  onCountChange(count) {
    [...this.listEl.children].forEach((nameElement, n) => {
      let x = 50*(1/Math.tan(3.14/count)+1);
      nameElement.style.setProperty('clip-path', `polygon(50% 50%, ${x}% 0%, 100% 0%, 100% 100%, ${x}% 100%)`);
      nameElement.style.setProperty('transform', `rotate(${6.28*n/count}rad)`);
      let hue = Math.floor(360*n/6);
      nameElement.style.setProperty('background-color', `hsl(${hue}, 100%, 30%)`);
    })
  },

  onSelectName() {
    const endAngle = this.currAngle+10*2*Math.PI+2*Math.PI*Math.random();
    console.log(`currAngle: ${this.currAngle}; endAngle: ${endAngle}`);
    document.querySelector(':root').style.setProperty('--start-angle', `${this.currAngle}rad`);
    document.querySelector(':root').style.setProperty('--end-angle', `${endAngle}rad`);
    this.listEl.classList.remove('spin-wheel');
    setTimeout(() => {
      this.listEl.classList.add('spin-wheel');
    },1)
    this.listEl.addEventListener('animationend', () => {
      this.currAngle = endAngle % 2*Math.PI;
    });
  }
});

window.addEventListener("submit", (e) => e.preventDefault(), { capture: true });
document.forms.names.elements.clear.addEventListener('click', model.clearNames);
document.forms.names.addEventListener(
  "submit",
  e => {
    model.addName(e.target.elements.add.value);
    e.target.elements.add.value = "";
  }
);
document.forms.names.elements.spin.addEventListener('click', model.selectName)