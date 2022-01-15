import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

import { getWishlist } from './features/wishlist/wishlistSlice';
import { authUser } from './features/authentication/authenticationSlice';
import { getUserAddresses } from './features/address/addressSlice';
import { getCart } from './features/cart/cartSlice';
import { getOrders } from './features/order/ordersSlice';

import Login from './features/authentication/Login';
import SingUp from './features/authentication/SingUp';
import Home from './features/home/Home';
import Layout from './features/layout/Layout';
import ProductList from './features/product/ProductList';
import ProductDetail from './features/product/ProductDetail';
import Wishlist from './features/wishlist/Wishlist';
import Account from './features/authentication/Account';
import Profile from './features/authentication/Account/Profile';
import Address from './features/address/Address';
import Orders from './features/order/Orders';
import Cart from './features/cart/Cart';
import SearchResultPage from './features/product/ProductList/SearchResultPage';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authUser());
    dispatch(getWishlist());
    dispatch(getCart());
    dispatch(getUserAddresses());
    dispatch(getOrders());
  }, []);

  return (
    <div className="bg-gray-50">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="shop" element={<ProductList />} />
          <Route path="shop/:id" element={<ProductDetail />} />
          <Route path="search" element={<SearchResultPage />} />

          <Route path="wishlist" element={<Wishlist />} />
          <Route path="cart" element={<Cart />} />

          <Route path="account" element={<Account />}>
            <Route index element={<Profile />} />
            <Route path="orders" element={<Orders />} />
            <Route path="address" element={<Address />} />
          </Route>
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SingUp />} />
      </Routes>
    </div>
  );
}

export default App;
