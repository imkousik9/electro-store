export const getSortedData = (state, data) => {
  if (state.sortBy === 'HIGH_TO_LOW_PRICE') {
    return [...data].sort((product1, product2) => {
      return Number(product2.price) - Number(product1.price);
    });
  }
  if (state.sortBy === 'LOW_TO_HIGH_PRICE') {
    return [...data].sort((product1, product2) => {
      return Number(product1.price) - Number(product2.price);
    });
  }
  return data;
};

export const getFilteredData = (state, data) => {
  let newData = [...data];
  if (!state.dataFilter.includeOutOfStock) {
    newData = newData.filter((product) => product.inStock);
  }
  if (state.dataFilter.filterByCategories.length !== 0)
    newData = newData.filter((product) =>
      state.dataFilter.filterByCategories.includes(product.category)
    );
  if (state.dataFilter.filterByBrands.length !== 0)
    newData = newData.filter((product) =>
      state.dataFilter.filterByBrands.includes(product.brand)
    );
  return newData;
};
