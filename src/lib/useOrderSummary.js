import { useCart } from '../features/cart/cartSlice';

export const useOrderSummary = () => {
  const { itemsInCart } = useCart();
  const cartDetails = cartDetailsCalculator(itemsInCart?.products);
  const cartTotalWithoutOffer = cartDetails.totalMRP - cartDetails.discount;
  const cartTotal = cartDetails.totalMRP - cartDetails.discount;
  return {
    total: cartDetails.totalMRP.toFixed(2),
    discount: cartDetails.discount.toFixed(2),
    cartTotalWithoutOffer: cartTotalWithoutOffer.toFixed(2),
    cartTotal: cartTotal.toFixed(2)
  };
};

const cartDetailsCalculator = (data) =>
  data?.reduce(
    (sum, { productId: { price, offer }, quantity }) => {
      return {
        totalMRP: sum.totalMRP + Number(price) * Number(quantity),
        discount:
          sum.discount +
          (Number(price) * Number(quantity) * Number(offer)) / 100
      };
    },
    { totalMRP: 0, discount: 0 }
  );
