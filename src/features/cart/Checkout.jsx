import { useDispatch } from 'react-redux';
import { useAuthentication } from '../authentication/authenticationSlice';
import { useSelectedAddress } from '../../lib';
import axios from '../../lib/axios';
import { useCart } from './cartSlice';
import { useOrderSummary } from '../../lib/useOrderSummary';
import { placeOrder, paymentFailure } from '../order/ordersSlice';

function Checkout() {
  const { itemsInCart } = useCart();
  const { token, user } = useAuthentication();

  const dispatch = useDispatch();

  const { selectedAddress } = useSelectedAddress();

  const { total, discount, cartTotal } = useOrderSummary();

  const placedOrderDetails = {
    payment: {
      mrp: total,
      discount,
      totalPaid: cartTotal
    },
    items: itemsInCart?.products?.map(({ productId, quantity }) => {
      const placedOrderItem = {
        productId: productId._id,
        payment: { amount: productId.price, offer: productId.offer },
        quantity
      };
      return placedOrderItem;
    }),
    address: `${selectedAddress?.name}, ${selectedAddress?.streetAddress}, ${selectedAddress?.city}, ${selectedAddress?.zipCode}`
  };

  const paymentSuccessful = () => {
    dispatch(placeOrder(placedOrderDetails));
  };

  const paymentFailureHandle = (error) => {
    dispatch(paymentFailure(error));
  };

  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = src;
      document.body.appendChild(script);
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
    });
  }

  async function showRazorpay() {
    const res = await loadScript(
      'https://checkout.razorpay.com/v1/checkout.js'
    );

    if (!res) {
      alert('Razorpay SDK failed to load. Are you online?');
      return;
    }
    const { data } = await axios.post(
      '/api/orders/razorpay',
      {
        amount: cartTotal
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
    );

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: data.amount,
      currency: data.currency,
      order_id: data.id,
      name: 'Electro Store',
      description: 'Test Transaction',
      handler: function (response) {
        paymentSuccessful();
      },
      prefill: {
        name: user?.firstName + user?.lastName,
        email: user?.email,
        contact: `91${selectedAddress.phoneNumber}`
      },
      notes: {
        address: `${selectedAddress?.name}, ${selectedAddress?.streetAddress}, ${selectedAddress?.city}, ${selectedAddress?.zipCode}`
      }
    };

    let paymentObject = new window.Razorpay(options);
    paymentObject.on('payment.failed', function (response) {
      console.log(response.error);
      paymentFailureHandle(response.error);
    });
    paymentObject.open();
  }

  return (
    <div className="mt-4">
      <button
        disabled={selectedAddress ? false : true}
        className="text-white font-medium bg-indigo-700 rounded-md p-1 w-full hover:bg-indigo-800"
        onClick={showRazorpay}
      >
        Place Order
      </button>
    </div>
  );
}

export default Checkout;
