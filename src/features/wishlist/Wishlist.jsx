import { Navigate } from 'react-router-dom';
import { useWishlist } from './wishlistSlice';
import { useAuthentication } from '../authentication/authenticationSlice';

import WishlistItemCard from './WishlistItemCard';
import Spinner from '../../Spinner';

function Wishlist() {
  const wishlist = useWishlist();
  const { token } = useAuthentication();

  return (
    <>
      {!token ? (
        <Navigate state={{ from: '/wishlist' }} to="/login" replace />
      ) : wishlist.status === 'loading' ? (
        <span className="flex justify-center mt-20">
          <Spinner size="w-24 h-24" />
        </span>
      ) : (
        <>
          <h1 className="text-center text-lg font-medium mt-6">
            My Wishlist{' '}
            <span className="font-light">
              {wishlist?.itemsInWishlist?.length}items
            </span>
          </h1>
          <div className="grid grid-cols-4 gap-10 p-8 lg:p-12">
            {wishlist?.itemsInWishlist?.map((product) => (
              <WishlistItemCard
                key={product?.productId?._id}
                product={product?.productId}
              />
            ))}
          </div>
        </>
      )}
    </>
  );
}
export default Wishlist;
