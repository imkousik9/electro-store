import { formatAmountForDisplay, INDIAN_RUPEE } from '../../lib';
import { useOrderSummary } from '../../lib/useOrderSummary';
import { useCart } from './cartSlice';

function OrderSummary() {
  const { itemsInCart } = useCart();
  const { total, discount, cartTotal } = useOrderSummary();

  return (
    <div className="text-sm">
      <div className="space-y-3">
        <p className="text-sm font-medium ">
          PRICE DETAILS: ({itemsInCart?.products.length} items)
        </p>
        <div className="flex justify-between">
          <p>Price</p>
          <p>
            {INDIAN_RUPEE}
            {formatAmountForDisplay(total)}
          </p>
        </div>

        <div className="flex justify-between">
          <p>Discount</p>
          <p className="text-green-600">
            - {INDIAN_RUPEE}
            {formatAmountForDisplay(discount)}
          </p>
        </div>

        <div className="flex justify-between">
          <p>Delivery Charges</p>
          <div className="flex justify-between space-x-10">
            <p className="line-through">{INDIAN_RUPEE}99</p>
            <p className="text-green-600">FREE</p>
          </div>
        </div>
      </div>

      <div className="flex justify-between text-base font-semibold py-4 mt-8 border-y border-indigo-700 border-dashed">
        <p>Total Amount</p>
        <p>
          {INDIAN_RUPEE}
          {formatAmountForDisplay(cartTotal)}
        </p>
      </div>

      <p className="mt-2 text-green-600 font-semibold text-base">
        You will save {INDIAN_RUPEE}
        {formatAmountForDisplay(discount)} on this order
      </p>
    </div>
  );
}

export default OrderSummary;
