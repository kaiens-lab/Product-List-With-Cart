const main = document.getElementById("main");
const choices = document.getElementById("choices");
const cart = document.getElementById("cart");
const pickedItemAmount = []; //pickedChoicesamount
const options = [];
let menu;

const minusSVG =
  '<svg xmlns="http://www.w3.org/2000/svg" width="10" height="2" fill="none" viewBox="0 0 10 2"><path fill="#fff" d="M0 .375h10v1.25H0V.375Z"/></svg>';
const plusSVG =
  '<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10"><path fill="#fff" d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z"/></svg>';

const tabletVersion = "(min-width:64rem)";
const desktopVersion = "(min-width:84rem)";

/*---Shooping Cart---*/
const cartHeader = (amount) => {
  return createHeadingItem(`Your Cart(${amount})`, "cartHeader", 2);
};

const createEmptyCart = () => {
  cart.innerHTML = "";
  cart?.appendChild(cartHeader(0));
  cart?.appendChild(
    createImageItem(
      "./assets/images/illustration-empty-cart.svg",
      "emptyCartImage"
    )
  );
  cart?.appendChild(
    createPItem("Your added items will appear here.", "emptyCartText")
  );
};

const priceSummary = (id, total = true) => {
  const divItem = createDivItem("priceOrderSummary");
  divItem.appendChild(
    createSpanItem(pickedItemAmount[id] + "x", "pickedAmount")
  );
  divItem.appendChild(
    createSpanItem("@ $" + menu[id].price.toFixed(2), "pickedPrice")
  );
  if (total) {
    divItem.appendChild(
      createSpanItem(
        "$" + (pickedItemAmount[id] * menu[id].price).toFixed(2),
        "pickedPriceTotal"
      )
    );
  }
  return divItem;
};

const chosenSummary = (id) => {
  const divItem = createDivItem("ProductOrderSummary");
  divItem.appendChild(createPItem(menu[id].name, "cartItemName"));
  divItem.appendChild(priceSummary(id));
  return divItem;
};

const removeItem = (id) => {
  pickedItemAmount[id] = 0;
  turnToCartButton(options[id].button);
  options[id].image.classList.remove("selected");
};

const showSelectCart = (id) => {
  const divItem = createDivItem("pickedDiv");
  divItem.appendChild(chosenSummary(id));
  const deleteImage = createImageItem(
    "./assets/images/icon-remove-item.svg",
    "removeButton"
  );
  deleteImage.addEventListener("click", () => {
    removeItem(id);
    updateCartContent();
  });
  divItem.appendChild(deleteImage);
  cart?.appendChild(divItem);
  cart?.appendChild(createHrItem("seperator"));
};

const carbonMassage = () => {
  const divItem = createDivItem("carbonNeutral");
  const carbonImage = createImageItem(
    "./assets/images/icon-carbon-neutral.svg",
    "carbonNeutralImage"
  );
  const carbonText = createPItem(
    "This is a <b>carbon-neutral</b> delivery",
    "carbonText"
  );
  divItem.appendChild(carbonImage);
  divItem.appendChild(carbonText);
  cart?.appendChild(divItem);
};

const addTotal = (confirmedOrder = false) => {
  let cartTotal = 0;
  pickedItemAmount.forEach((picked, index) => {
    if (picked > 0) {
      if (!confirmedOrder) {
        showSelectCart(index);
      }
      cartTotal += menu[index].price * picked;
    }
  });
  const divItem = createDivItem("orderTotal");
  const orderTotalText = createPItem("Order Total", "orderTotalText");
  const orderTotalPrice = createPItem(
    "$" + cartTotal.toFixed(2),
    "orderTotalPrice"
  );
  divItem.appendChild(orderTotalText);
  divItem.appendChild(orderTotalPrice);
  return divItem;
};

const addConfirmButton = () => {
  const divItem = createDivItem("confirmButton", "confirm order");
  divItem.addEventListener("click", () => {
    confirmOrder();
  });
  cart?.appendChild(divItem);
};

/*---ConfirmForm---*/

const addOrderProduct = () => {
  const products = createDivItem("orderProducts");
  pickedItemAmount.forEach((amount, index) => {
    if (amount > 0) {
      const product = createDivItem("productOrderSummary");
      const thumbNailImage = createImageItem(
        menu[index].image.thumbnail,
        "thumbnail"
      );
      product.appendChild(thumbNailImage);
      const nameAndPrice = createDivItem("nameAndPrice");
      const productName = createPItem(menu[index].name, "productName");
      const productPriceSummary = priceSummary(index, false);
      product.appendChild(productName);
      product.appendChild(productPriceSummary);
      const totalPrice = createPItem(
        "$" + (amount * menu[index].price).toFixed(2),
        "total"
      );
      product.appendChild(totalPrice);

      products.appendChild(product);
      products.appendChild(createHrItem("seperator"));
    }
  });
  return products;
};

const confirmOrder = () => {
  const divItem = createDivItem("confirmBackground");
  divItem.setAttribute("id", "confirmForm");

  const confirmSummary = createDivItem("confirmSummary");
  const confirmImage = createImageItem(
    "./assets/images/icon-order-confirmed.svg",
    "confirmImage"
  );
  const confirmHeader = createPItem("Order Confirmed", "confirmHeader", 1);
  const confirmText = createPItem(
    "We hope you enjoy your food!",
    "confirmText"
  );
  confirmSummary.appendChild(confirmImage);
  confirmSummary.appendChild(confirmHeader);
  confirmSummary.appendChild(confirmText);
  confirmSummary.appendChild(addOrderProduct());

  const startNewOrder = createDivItem("confirmButton", "Start New Order");
  startNewOrder.addEventListener("click", () => {
    pickedItemAmount.forEach((amount, index) => {
      if (amount > 0) {
        removeItem(index);
      }
    });
    updateCartContent();
    const orderForm = document.getElementById("confirmForm");
    orderForm?.remove();
  });
  confirmSummary.appendChild(startNewOrder);
  divItem.appendChild(confirmSummary);
  document.body.appendChild(divItem);
  window.scrollTo(0, 0);
};

const updateCartContent = () => {
  let total = pickedItemAmount.reduce((first, last) => {
    return first + last;
  });

  if (total == 0) {
    createEmptyCart();
  } else {
    cart.innerHTML = "";
    cart?.appendChild(cartHeader(total));
    cart?.appendChild(addTotal());
    carbonMassage();
    addConfirmButton();
  }
};

/*---------Menu Begin---------*/
const addImage = (image) => {
  let defaultImage = image.mobile;
  if (window.matchMedia(tabletVersion).matches) {
    defaultImage = image.tablet;
  }
  if (window.matchMedia(desktopVersion).matches) {
    defaultImage = image.desktop;
  }
  const imgItem = createImageItem(defaultImage, "menu-example");
  imgItem.setAttribute("alt", "menu-example");
  return imgItem;
};

const turnToCartButton = (button) => {
  button.innerText = "";
  button.appendChild(
    createImageItem("./assets/images/icon-add-to-cart.svg", "cartImage")
  );
  button.appendChild(createSpanItem("Add to Cart", "addCart"));
  button.classList.remove("amountButton");
  button.classList.add("cartButton");
};

const turnToAmountButton = (button, itemId) => {
  button.innerHTML = "";

  const minusDivItem = createDivItem("amountChange");
  minusDivItem.innerHTML = minusSVG;
  minusDivItem.addEventListener("click", () => {
    pickedItemAmount[itemId]--;
    if (pickedItemAmount[itemId] == 0) {
      pickedItemAmount[itemId]--;
    }
  });

  button.appendChild(minusDivItem);
  button.appendChild(createPItem(pickedItemAmount[itemId], "amount"));

  const plusDivItem = createDivItem("amountChange");
  plusDivItem.innerHTML = plusSVG;
  plusDivItem.addEventListener("click", () => {
    pickedItemAmount[itemId]++;
  });
  button.appendChild(plusDivItem);

  button.classList.remove("cartButton");
  button.classList.add("amountButton");
};

const addToCart = (id, itemImage) => {
  const divItem = createDivItem("button");
  divItem.addEventListener("click", () => {
    if (pickedItemAmount[id] <= 0) {
      pickedItemAmount[id]++;
    }
    if (pickedItemAmount[id] > 0) {
      itemImage.classList.add("selected");
      turnToAmountButton(divItem, id);
      updateCartContent();
    } else {
      itemImage.classList.remove("selected");
      turnToCartButton(divItem);
      updateCartContent();
    }
  });
  turnToCartButton(divItem);

  const buttonAndImage = {};
  buttonAndImage.button = divItem;
  buttonAndImage.image = itemImage;
  options.push(buttonAndImage);

  return divItem;
};

const addOption = (option) => {
  const divItem = createDivItem("menuOption");
  const itemImage = addImage(option.image);
  divItem.appendChild(itemImage);

  divItem.appendChild(addToCart(pickedItemAmount.length, itemImage));

  divItem.appendChild(createPItem(option.category, "category"));
  divItem.appendChild(createPItem(option.name, "name"));
  divItem.appendChild(createPItem("$" + option.price.toFixed(2), "price"));

  choices?.appendChild(divItem);
  pickedItemAmount.push(0);
};

const addItems = (items) => {
  items.forEach((item) => {
    addOption(item);
  });
};

async function displayItems() {
  let result = await getData();
  menu = result;
  addItems(result);
}

displayItems();

/*---------Menu End---------*/

createEmptyCart();
