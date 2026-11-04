export function createDOMElement(...objects) {
  if (objects.length === 0)
    throw new Error("I think you forgot something here...");

  const attributeMap = {
    elemType: (val) => {
      if (val === "svg" || val === "circle") {
        return document.createElementNS("http://www.w3.org/2000/svg", val);
      } else {
        return document.createElement(val);
      }
    },
    textContent: (elem, val) => (elem.textContent = val),
    data: (elem, val) => {
      for (const [key, value] of Object.entries(val)) {
        elem.dataset[key] = value;
      }
    },
    height: (elem, val) => (elem.height = elem.width = val),
    parent: (elem, val) => val.appendChild(elem),
    event: (elem, val) =>
      elem.addEventListener(val.type, val.callback, { ...val.options }),
    children: (elem, val) => elem.append(...val),
    styleHeight: (elem, val) => (elem.style.height = val),
    styleWidth: (elem, val) => (elem.style.width = val),
  };

  objects = objects.map((obj) => {
    let elem;

    for (const [key, val] of Object.entries(obj)) {
      if (key === "elemType") {
        elem = attributeMap[key](val);
      } else if (attributeMap[key]) {
        attributeMap[key](elem, val);
      } else {
        elem.setAttribute(key, val);
      }
    }
    return elem;
  });

  return objects.length === 1 ? objects[0] : objects;
}
