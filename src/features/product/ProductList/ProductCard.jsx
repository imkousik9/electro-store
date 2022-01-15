import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  formatAmountForDisplay,
  INDIAN_RUPEE,
  isAlreadyAdded,
  trimCharacters
} from '../../../lib';
import { addToWishlist, useWishlist } from '../../wishlist/wishlistSlice';
import { useAuthentication } from '../../authentication/authenticationSlice';

import { HeartIcon, StarIcon } from '@heroicons/react/solid';
import AddToCartButton from '../../cart/AddToCartButton';

function ProductCard({ product }) {
  const dispatch = useDispatch();
  const auth = useAuthentication();
  const wishlist = useWishlist();

  const navigate = useNavigate();

  const addProductTOWishlist = (id) => {
    auth?.token ? dispatch(addToWishlist(id)) : navigate('/login');
  };

  return (
    <div className="w-52 col-span-1 justify-self-center p-4 transition-shadow duration-300 hover:bg-white hover:shadow-custom-2 rounded-md">
      <div className="relative text-center">
        <Link to={`/shop/${product?._id}`}>
          <img
            className="h-48 object-contain mx-auto"
            src={product?.image}
            alt={product?.name}
          />
        </Link>

        <span
          className={`${
            product?.inStock && 'hidden'
          } absolute top-0 left-0 text-xs text-white bg-gray-500 rounded-md px-2 py-0.5`}
        >
          sold out
        </span>
      </div>
      <div className="mt-8 text-slate-800">
        <div className="flex items-center justify-between ">
          <h6 className="font-semibold ">
            <Link to={`/shop/${product?._id}`}>{product?.brand}</Link>
          </h6>
          <HeartIcon
            className={`w-5 ${
              isAlreadyAdded(wishlist?.itemsInWishlist, product?._id)
                ? 'text-indigo-700'
                : 'text-stone-500'
            } cursor-pointer`}
            onClick={() => {
              addProductTOWishlist(product?._id);
            }}
          />
        </div>
        <div className="text-left">
          <p className="text-sm">{trimCharacters(product?.name)}</p>
          <p className="text-sm font-medium">
            {INDIAN_RUPEE}
            {formatAmountForDisplay(product?.price)}
            <span className="font-light">
              <span className="text-indigo-700 text-xs">
                {' '}
                ({product?.offer}% OFF)
              </span>
            </span>
          </p>
          <div className="text-xs inline-flex">
            {product?.rating?.starRating}{' '}
            <StarIcon className="w-4 text-indigo-700" /> |{' '}
            {formatAmountForDisplay(product?.rating?.totalReviews)}
          </div>
        </div>
      </div>
      <div className="mt-6">
        <AddToCartButton key={product?._id} product={product} />
      </div>
    </div>
  );
}

export default ProductCard;
