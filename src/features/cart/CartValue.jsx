import { useEffect, useState } from 'react';
import Checkout from './Checkout';
import OrderSummary from './OrderSummary';

function CartValue() {
  return (
    <div className="bg-white shadow-custom rounded-md sticky top-24 px-4 py-6">
      <OrderSummary />
      <Checkout />
    </div>
  );
}

export default CartValue;
