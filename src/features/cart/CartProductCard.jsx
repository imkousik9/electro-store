import { useDispatch } from 'react-redux';
import { PlusSmIcon, MinusSmIcon, TrashIcon } from '@heroicons/react/outline';
import { removeFromCart, updateCart } from './cartSlice';
import { addToWishlist, useWishlist } from '../wishlist/wishlistSlice';
import {
  formatAmountForDisplay,
  INDIAN_RUPEE,
  isAlreadyAdded
} from '../../lib';

function CartProductCard({ product }) {
  const dispatch = useDispatch();
  const { itemsInWishlist } = useWishlist();

  const decreaseQtyOfProductInCart = () => {
    dispatch(updateCart({ product, quantity: product.quantity - 1 }));
  };

  const increaseQtyOfProductInCart = () => {
    dispatch(updateCart({ product, quantity: product.quantity + 1 }));
  };

  const removeProductFromCart = () => {
    dispatch(removeFromCart(product));
  };

  const moveToWishlist = () => {
    if (!isAlreadyAdded(itemsInWishlist, product?._id)) {
      dispatch(addToWishlist(product?._id));
    }
    dispatch(removeFromCart(product));
  };

  return (
    <div className="px-4 py-8 grid grid-cols-4 gap-6 items-center">
      <div className="col-span-1">
        <img
          className="h-20 object-contain mx-auto"
          src={product?.image}
          alt={product?.name}
        />
      </div>

      <div className="flex flex-col space-y-8 col-span-3">
        <div className="space-y-2">
          <p className="font-medium">{product?.name}</p>
          <p className="text-sm font-medium">
            <span className="mr-1 text-slate-800">
              {INDIAN_RUPEE}
              {formatAmountForDisplay(
                (product?.price *
                  product?.quantity *
                  (100 - Number(product?.offer))) /
                  100
              )}
            </span>
            {Number(product?.offer) > 0 && (
              <>
                <span className="line-through text-slate-500 mr-1 text-xs">
                  {INDIAN_RUPEE}
                  {formatAmountForDisplay(product?.price * product?.quantity)}
                </span>{' '}
                <span className="text-xs text-indigo-700">
                  ({product?.offer}%OFF)
                </span>
              </>
            )}
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-4 col-span-4">
        <div className="flex items-center space-x-4">
          <button
            className="p-1 ring-1 rounded-full ring-indigo-700 flex items-center justify-center"
            onClick={
              product?.quantity > 1
                ? decreaseQtyOfProductInCart
                : removeProductFromCart
            }
          >
            {product?.quantity > 1 ? (
              <MinusSmIcon className="text-indigo-500 hover:text-indigo-700 h-6" />
            ) : (
              <TrashIcon
                id="increaseBtn"
                className="text-indigo-500 hover:text-indigo-700 h-6"
              />
            )}
          </button>
          <div className="px-4 py-1 ring-1 rounded-md ring-indigo-700 text-indigo-500 text-lg">
            {product?.quantity}
          </div>
          <button
            className="p-1 ring-1 rounded-full ring-indigo-700 flex items-center justify-center"
            onClick={increaseQtyOfProductInCart}
          >
            <PlusSmIcon className="text-indigo-500 hover:text-indigo-700 h-6" />
          </button>
        </div>

        <button
          className="uppercase text-sm font-medium px-4 py-2 ring-1 rounded-md ring-indigo-700 text-indigo-700 hover:text-white hover:bg-indigo-700"
          onClick={moveToWishlist}
        >
          Save for Latter
        </button>
      </div>
    </div>
  );
}

export default CartProductCard;
