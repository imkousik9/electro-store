import { useEffect, useRef, useState } from 'react';
import {
  formatAmountForDisplay,
  INDIAN_RUPEE,
  trimCharacters
} from '../../lib';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToWishlist } from './wishlistSlice';

import AddToCartButton from '../cart/AddToCartButton';
import { XIcon } from '@heroicons/react/outline';

function WishlistItemCard({ product }) {
  const dispatch = useDispatch();
  let isRendered = useRef(null);

  useEffect(() => {
    isRendered.current = true;

    return () => {
      isRendered.current = false;
    };
  });

  return (
    <div
      to={`/shop/${product?._id}`}
      className="bg-white w-52 p-4 shadow-custom rounded-md col-span-2 lg:col-span-1  mx-auto relative"
    >
      <button
        className=" z-10 absolute top-2 right-2 cursor-pointer flex items-center justify-center"
        onClick={() => {
          dispatch(addToWishlist(product?._id));
        }}
      >
        <XIcon className="h-6 text-gray-400 hover:text-gray-600" />
      </button>
      <div className="relative text-center">
        <Link to={`/shop/${product?._id}`}>
          <img
            className="h-40 object-contain mx-auto"
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
        </div>
      </div>
      <div className="mt-6">
        <AddToCartButton product={product} />
      </div>
    </div>
  );
}

export default WishlistItemCard;
