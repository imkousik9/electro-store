import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { getCart } from './cartSlice';

function OrderConfirmationPage({ orderId }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCart());
  }, []);

  return (
    <div className=" flex flex-col items-center mt-20 space-y-5">
      <h4 className="text-green-700 text-lg font-semibold">Order Confirmed</h4>
      <p className="">Order No. {orderId}</p>
      <p className="text-sm">Thank you for shopping with us!</p>
      <Link
        to="/account/orders"
        className="bg-indigo-700 hover:bg-indigo-800 text-white py-2 px-4 rounded-md text-base font-medium"
      >
        View Order
      </Link>
    </div>
  );
}

export default OrderConfirmationPage;
