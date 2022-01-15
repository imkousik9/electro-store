import { configureStore } from '@reduxjs/toolkit';
import addressSlice from '../features/address/addressSlice';
import authenticationReducer from '../features/authentication/authenticationSlice';
import cartSlice from '../features/cart/cartSlice';
import ordersSlice from '../features/order/ordersSlice';
import productsSlice from '../features/product/productsSlice';
import wishlistSlice from '../features/wishlist/wishlistSlice';

export const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
    products: productsSlice,
    wishlist: wishlistSlice,
    cart: cartSlice,
    address: addressSlice,
    orders: ordersSlice
  }
});
