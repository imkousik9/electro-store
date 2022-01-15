import { Link } from 'react-router-dom';

function OrderItemCard({ item: { productId: product, quantity } }) {
  return (
    <div
      to={`/shop/${product._id}`}
      className="flex border border-indigo-700 border-dashed p-4 space-x-6"
    >
      <div className="w-36">
        <Link to={`/shop/${product?._id}`}>
          <img
            className="h-24 object-contain mx-auto"
            src={product?.image}
            alt={product?.name}
          />
        </Link>
      </div>
      <div>
        <Link to={`/shop/${product?._id}`} className="link-no-style">
          <div className="space-y-1">
            <h6 className="font-semibold">{product?.name}</h6>
            <p className="text-sm">{product?.brand}</p>
            <p className="text-sm">qty: {quantity}</p>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default OrderItemCard;
