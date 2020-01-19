export const addItem = (item, cb) => {
  let cart = [];
  if (typeof window !== "undefined") {
    if (localStorage.getItem("cat"))
      cart = JSON.parse(localStorage.getItem("cart"));
  }
  cart.push({
    product: item,
    quantity: 1,
    shop: item.shop._id
  });
  localStorage.setItem("cart", JSON.stringify(cart));
};

export const itemTotal = () => {
  if (typeof window !== "undefined") {
    if (localStorage.getItem("cart")) {
      return JSON.parse(localStorage.getItem("cart")).length;
    }
  }
  return "0";
};
