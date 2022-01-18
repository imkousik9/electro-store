import { useRef, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from '../../../lib/axios';
import { useProduct } from '../../../lib/useProduct';
import {
  formatAmountForDisplay,
  INDIAN_RUPEE,
  isAlreadyAdded
} from '../../../lib';
import { addToWishlist, useWishlist } from '../../wishlist/wishlistSlice';
import { useAuthentication } from '../../authentication/authenticationSlice';

import { ShoppingCartIcon, StarIcon } from '@heroicons/react/solid';
import {
  TruckIcon,
  CashIcon,
  ReplyIcon,
  BanIcon,
  CheckCircleIcon,
  HeartIcon
} from '@heroicons/react/outline';
import AddToCartButton from '../../cart/AddToCartButton';

const ratingArray = [1, 2, 3, 4, 5];

function ProductDetail() {
  const { id } = useParams();
  const storeProduct = useProduct(id);
  const [product, setProduct] = useState(storeProduct);

  const dispatch = useDispatch();
  const auth = useAuthentication();
  const wishlist = useWishlist();

  const navigate = useNavigate();

  const addProductTOWishlist = (id) => {
    auth?.token ? dispatch(addToWishlist(id)) : navigate('/login');
  };

  let isRendered = useRef(false);

  const findProductById = async () => {
    const { data } = await axios.get(`/api/products/${id}`);
    setProduct(data);
  };

  useEffect(() => {
    isRendered.current = true;
    return () => {
      isRendered.current = false;
    };
  }, []);

  useEffect(() => {
    if (!product) findProductById();
  }, []);

  return (
    <div className="grid p-6  md:place-content-center min-h-screen">
      <div className="bg-white grid grid-cols-2 gap-4 lg:gap-10 shadow-custom rounded-md p-6 lg:p-10 lg:w-[1000px] md:-mt-14">
        <div className="col-span-2 md:col-span-1 justify-self-center">
          <img
            src={product?.image}
            alt={product?.name}
            className="h-52 md:h-96 object-contain"
          />
        </div>
        <div className="col-span-2 md:col-span-1">
          <h3 className="text-xl md:text-2xl font-semibold text-slate-800">
            {product?.name}
          </h3>
          <p className="text-base md:text-lg">{product?.brand}</p>
          <div className="flex pb-2 md:pb-4">
            {ratingArray.map((item) => (
              <StarIcon
                key={item}
                style={{
                  color:
                    item <= Number(product?.rating?.starRating) ? '#4338ca' : ''
                }}
                className="h-5 md:h-6 text-gray-500"
              />
            ))}{' '}
            <span className="text-sm md:text-base text-gray-500 ml-1">
              ({formatAmountForDisplay(product?.rating?.totalReviews)} reviews)
            </span>
          </div>
          <p className="text-xl md:text-2xl font-medium">
            <span className="mr-1 text-slate-800">
              {INDIAN_RUPEE}
              {formatAmountForDisplay(
                (product?.price * (100 - Number(product?.offer))) / 100
              )}
            </span>
            {Number(product?.offer) > 0 && (
              <>
                <span className="text-lg md:text-xl line-through text-slate-500 mr-1">
                  {INDIAN_RUPEE}
                  {formatAmountForDisplay(product?.price)}
                </span>{' '}
                <span className="text-lg md:text-xl text-indigo-700">
                  ({product?.offer}%OFF)
                </span>
              </>
            )}
          </p>
          <p className="text-sm font-semibold text-green-600">
            inclusive of all taxes
          </p>
          <hr className="my-3 border-slate-300" />

          <div className="space-y-1">
            {product?.fastDelivery && (
              <p className="text-gray-800 text-sm flex items-center space-x-2">
                <TruckIcon className="h-6 text-indigo-700" />
                <span>Fast delivery available</span>
              </p>
            )}
            <p className="text-gray-800 text-sm flex items-center space-x-2">
              <CashIcon className="h-6 text-indigo-700" />
              <span>Cash on delivery</span>
            </p>
            <p className="text-gray-800 text-sm flex items-center space-x-2">
              <ReplyIcon className="h-6 text-indigo-700" />
              <span>7 Day Replacement</span>
            </p>
            <p className="text-gray-800 text-sm flex items-center space-x-2">
              {!product?.inStock ? (
                <BanIcon className="h-6 text-indigo-700" />
              ) : (
                <CheckCircleIcon className="h-6 text-indigo-700" />
              )}

              <span>
                {product?.inStock ? 'Currently in stock' : 'Out of stock'}
              </span>
            </p>
          </div>
          <div className="flex space-x-4 mt-6 md:mt-8">
            <AddToCartButton product={product} Icon={ShoppingCartIcon} />
            <button
              className={`text-lg md:text-base lg:text-lg flex items-center space-x-2 md:space-x-1 lg:space-x-2 border ${
                isAlreadyAdded(wishlist?.itemsInWishlist, product?._id)
                  ? 'border-indigo-700 text-indigo-700'
                  : 'border-slate-500 text-slate-500'
              }  hover:bg-indigo-700 hover:text-white py-2 px-4  md:py-2 md:px-2  lg:py-2 lg:px-4 rounded-md`}
              onClick={() => addProductTOWishlist(product?._id)}
            >
              <HeartIcon className="h-6" />
              {isAlreadyAdded(wishlist?.itemsInWishlist, product?._id) ? (
                <span> Remove from Wishlist</span>
              ) : (
                <span> Add to Wishlist</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
