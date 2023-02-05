import courses from "../names.js";

const dom = {
  app: document.querySelector("#app"),
  courseSelect: app.querySelector("#courseSelector"),
  namesUl: app.querySelector(".names"),
};

courses.forEach((course) => {
  const newOptionElement = document.createElement("option");
  newOptionElement.value = course.name;
  newOptionElement.innerText = course.name;
  dom.courseSelect.appendChild(newOptionElement);
});

function addName(nameStr) {
  const list = document.querySelector(".names");
  const item = list.querySelector("template").content.cloneNode(true);
  item.querySelector("label").innerText = nameStr;
  list.appendChild(item);
}

const selectedCourse = courses[0];

function populateList(names) {}
