import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useAuthentication } from '../authentication/authenticationSlice';
import { addToCart, useCart } from '../cart/cartSlice';
import { isAlreadyAdded } from '../../lib/wishlist';

function AddToCartButton({ product, Icon = false }) {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { token } = useAuthentication();
  const { itemsInCart } = useCart();

  let isRendered = useRef(false);
  useEffect(() => {
    isRendered.current = true;
    return () => {
      isRendered.current = false;
    };
  }, []);

  return (
    <>
      <button
        disabled={!product?.inStock}
        className={`rounded-md ${
          Icon
            ? 'disabled:cursor-default text-lg md:text-base lg:text-lg flex items-center space-x-2 md:space-x-1 lg:space-x-2 text-white disabled:text-white bg-indigo-700 hover:bg-indigo-800 py-2 px-4  md:py-2 md:px-2  lg:py-2 lg:px-4 disabled:bg-indigo-400'
            : 'text-sm text-indigo-700 hover:text-white hover:bg-indigo-700 disabled:text-indigo-400 disabled:hover:bg-inherit disabled:hover:text-indigo-400  disabled:cursor-default border border-indigo-700 disabled:border-indigo-400  px-3 py-1'
        }`}
        onClick={() => {
          token
            ? isAlreadyAdded(itemsInCart?.products, product._id)
              ? navigate('/cart')
              : dispatch(addToCart(product))
            : navigate('/login');
        }}
      >
        {Icon && <Icon className="h-6" />}
        {!product?.inStock
          ? 'Out of Stock'
          : isAlreadyAdded(itemsInCart?.products, product?._id)
          ? 'Go to Cart'
          : 'Add to Cart'}
      </button>
    </>
  );
}

export default AddToCartButton;
