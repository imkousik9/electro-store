import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getOrders, useOrders } from './ordersSlice';

import OrderCard from './OrderCard';
import Spinner from '../../Spinner';

function Orders() {
  const { orders, status } = useOrders();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrders());
  }, []);

  return (
    <>
      <h1 className="font-semibold mb-4">My Orders</h1>

      {status === 'loading' ? (
        <span className="flex justify-center mt-20">
          <Spinner size="w-24 h-24" />
        </span>
      ) : orders?.length === 0 ? (
        <span className="p-4">No orders yet</span>
      ) : (
        orders?.map((order) => <OrderCard key={order?._id} order={order} />)
      )}
    </>
  );
}

export default Orders;
