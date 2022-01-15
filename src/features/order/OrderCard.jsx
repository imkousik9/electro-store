import OrderItemCard from './OrderItemCard';

function OrderCard({ order }) {
  return (
    <>
      <div className="p-4 ring-1 ring-indigo-700 rounded mb-6 space-y-2">
        <h6 className="font-semibold text-green-600">
          Order Confirmed
          <br />
          <span className="text-sm text-gray-600 font-light">
            {new Date(order?.createdAt).toDateString()}
          </span>
        </h6>
        <p className="text-sm">Order# {order?._id}</p>
        <p className="text-sm">
          Total: ₹{order?.payment.totalPaid}{' '}
          <button
            onClick={() => setPaymentDetails(true)}
            className="text-indigo-700 text-xs"
          >
            View Breakup
          </button>
        </p>

        <p className="text-sm">
          Deliver to: <span>{order?.address}</span>
        </p>

        {order?.items?.map((item) => (
          <OrderItemCard key={item?._id} item={item} />
        ))}
      </div>
    </>
  );
}

export default OrderCard;
