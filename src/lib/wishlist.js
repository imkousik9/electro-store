export const isAlreadyAdded = (itemsArray, id) => {
  if (itemsArray) {
    return itemsArray.find((item) => item.productId._id === id);
  }
  return false;
};
