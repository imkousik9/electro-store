import { useProducts } from '../features/product/productsSlice';

export const useProduct = (id) => {
  const { products } = useProducts();

  return products?.find((product) => product?._id === id);
};
