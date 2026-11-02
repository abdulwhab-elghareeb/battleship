export function createDOMElement(obj) {
  if (!obj) throw new Error("I think you forgot to pass an object");

  let createdElement;

  if (obj.elemType === "svg" || obj.elemType === "circle") {
    createdElement = document.createElementNS(
      "http://www.w3.org/2000/svg",
      obj.elemType,
    );
  } else {
    createdElement = document.createElement(obj.elemType);
  }

  if (obj.textContent) createdElement.textContent = obj.textContent;
  if (obj.className) createdElement.className = obj.className;
  if (obj.id) createdElement.setAttribute("id", obj.id);
  if (obj.dataId) createdElement.dataset.id = obj.dataId;
  if (obj.data) {
    for (const [key, value] of Object.entries(obj.data)) {
      createdElement.dataset[key] = value;
    }
  }
  if (obj.src) createdElement.src = obj.src;
  if (obj.height || obj.width)
    createdElement.height = createdElement.width = obj.height;
  if (obj.value) createdElement.value = obj.value;
  if (obj.type) createdElement.type = obj.type;
  if (obj.for) createdElement.htmlFor = obj.for;
  if (obj.parent) obj.parent.appendChild(createdElement);
  if (obj.noValidate) createdElement.noValidate = obj.noValidate;
  if (obj.viewBox) createdElement.setAttribute("viewBox", obj.viewBox);
  if (obj.r) createdElement.setAttribute("r", obj.r);
  if (obj.cy) createdElement.setAttribute("cy", obj.cy);
  if (obj.cx) createdElement.setAttribute("cx", obj.cx);
  if (obj.required) createdElement.setAttribute("required", "");
  if (obj.event)
    createdElement.addEventListener(obj.event.type, obj.event.callback, {
      ...obj.options,
    });
  if (obj.draggable) createdElement.setAttribute("draggable", true);
  return createdElement;
}
