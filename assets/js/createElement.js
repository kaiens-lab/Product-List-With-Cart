const createDivItem = (classList, inner = "") => {
  const divItem = document.createElement("div");
  divItem.classList.add(classList);
  divItem.innerHTML = inner;
  return divItem;
};

const createHeadingItem = (content, classList, size) => {
  const headingItem = document.createElement("h" + size);
  headingItem.innerHTML = content;
  headingItem.classList.add(classList);
  return headingItem;
};

const createImageItem = (src, classList) => {
  const imgItem = document.createElement("img");
  imgItem.setAttribute("src", src);
  imgItem.classList.add(classList);
  return imgItem;
};

const createPItem = (content, classList) => {
  const PItem = document.createElement("p");
  PItem.innerHTML = content;
  PItem.classList.add(classList);
  return PItem;
};

const createSpanItem = (content, classList) => {
  const spanItem = document.createElement("span");
  spanItem.innerHTML = content;
  spanItem.classList.add(classList);
  return spanItem;
};

const createHrItem = (classList) => {
  const hrItem = document.createElement("hr");
  hrItem.classList.add(classList);
  return hrItem;
};
