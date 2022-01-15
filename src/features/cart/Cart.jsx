import { Navigate } from 'react-router-dom';
import { useAuthentication } from '../authentication/authenticationSlice';
import { useCart } from './cartSlice';
import { useOrders } from '../order/ordersSlice';

import CartValue from './CartValue';
import CartProductCard from './CartProductCard';
import SelectAddress from './SelectAddress';
import OrderConfirmationPage from './OrderConfirmationPage';
import Spinner from '../../Spinner';

function Cart() {
  const { token } = useAuthentication();
  const { itemsInCart, cartStatus } = useCart();
  const { status, orderId } = useOrders();

  return (
    <>
      {!token ? (
        <Navigate state={{ from: '/cart' }} to="/login" replace />
      ) : cartStatus === 'loading' ? (
        <span className="flex justify-center mt-20">
          <Spinner size="w-24 h-24" />
        </span>
      ) : (
        <>
          {status === 'SUCCESS' ? (
            <OrderConfirmationPage orderId={orderId} />
          ) : (
            <>
              <h1 className="text-center text-lg font-medium mt-8">My Cart</h1>
              {!itemsInCart?.products?.length ? (
                <h3 className="text-center mt-6">Cart is empty</h3>
              ) : (
                <>
                  <div className="grid grid-cols-3 gap-4 p-6 col-span-3 md:col-span-2">
                    <div className="col-span-3 md:col-span-2">
                      <SelectAddress />

                      <div className="divide-y bg-white shadow-custom rounded-md">
                        {itemsInCart?.products.map(
                          ({ productId: product, quantity }) => (
                            <CartProductCard
                              key={product?._id}
                              product={{ ...product, quantity }}
                            />
                          )
                        )}
                      </div>
                    </div>

                    <div className="col-span-3 md:col-span-1">
                      <CartValue />
                    </div>
                  </div>
                </>
              )}
            </>
          )}
        </>
      )}
    </>
  );
}

export default Cart;
