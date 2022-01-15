import { useAddress } from '../features/address/addressSlice';
import { useCart } from '../features/cart/cartSlice';

export const useSelectedAddress = () => {
  const { addressDetails } = useAddress();
  const {
    itemsInCart: { addressId }
  } = useCart();

  const selectedAddress = addressDetails?.find(
    (address) => address?._id === addressId
  );

  return { selectedAddress };
};
