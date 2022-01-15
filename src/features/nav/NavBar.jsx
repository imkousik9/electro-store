import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  logout,
  useAuthentication
} from '../authentication/authenticationSlice';
import { resetWishlist, useWishlist } from '../wishlist/wishlistSlice';
import { resetCart, useCart } from '../cart/cartSlice';

import {
  UserIcon,
  HeartIcon,
  ShoppingCartIcon,
  MenuIcon
} from '@heroicons/react/solid';
import {
  UserCircleIcon,
  XIcon,
  LogoutIcon,
  LoginIcon
} from '@heroicons/react/outline';
import SearchBar from './SearchBar';

const navItems = [
  { text: 'Home', link: '/' },
  { text: 'Shop Now', link: '/shop' },
  { text: 'Profile', link: '/account', hideInLogout: true },
  { text: 'Orders', link: '/account/orders', hideInLogout: true },
  { text: 'Addresses', link: '/account/address', hideInLogout: true }
];

function NavBar() {
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();
  const auth = useAuthentication();
  const wishlist = useWishlist();
  const cart = useCart();

  const navigate = useNavigate();

  const logOut = () => {
    dispatch(logout());
    dispatch(resetWishlist());
    dispatch(resetCart());
    navigate('/');
  };

  return (
    <>
      <nav className="z-50 bg-white sticky top-0 shadow-md px-4 py-3 flex items-center justify-between text-gray-600">
        <div
          className="lg:hidden cursor-pointer"
          onClick={() => {
            setOpen(true);
          }}
        >
          <MenuIcon className="h-9 text-indigo-700" />
        </div>

        <ul
          className={`z-50 ${
            open ? 'inline-block' : 'hidden'
          } absolute top-0 left-0 min-h-screen w-80 bg-white shadow-2xl lg:hidden`}
        >
          <li className="text-white bg-indigo-700 p-6 flex items-center justify-between">
            <Link to="/account">
              <UserCircleIcon className="h-12" />
            </Link>
            <XIcon
              className="h-9 cursor-pointer"
              onClick={() => {
                setOpen(false);
              }}
            />
          </li>
          <div className="p-6">
            {navItems.map(({ text, link, hideInLogout }) => (
              <li
                key={text}
                className={`py-2 ${
                  !auth?.token && hideInLogout ? 'hidden' : ''
                }`}
              >
                <NavLink
                  end
                  to={link}
                  className={({ isActive }) =>
                    isActive ? 'text-indigo-700 font-medium' : 'text-slate-900'
                  }
                >
                  {text}
                </NavLink>
              </li>
            ))}
          </div>
          {auth?.token ? (
            <li
              className=" p-6 flex items-center space-x-4 font-semibold cursor-pointer text-gray-400 hover:text-indigo-700"
              onClick={logOut}
            >
              <LogoutIcon className="h-6 text-indigo-700" />
              <span className="text-lg">Logout</span>
            </li>
          ) : (
            <li className="p-6 font-semibold cursor-pointer text-gray-400 hover:text-indigo-700">
              <Link className="flex items-center space-x-4" to="/login">
                <LoginIcon className="h-6 text-indigo-700" />
                <span className="text-lg">Login</span>
              </Link>
            </li>
          )}
        </ul>

        <div className="flex items-center space-x-8">
          <Link to="/">
            <h1 className="font-logo text-indigo-700 font-medium tracking-wide text-2xl lg:text-3xl ml-4">
              <em> ELECTRO STORE</em>
            </h1>
          </Link>

          <div className="hidden lg:inline-flex space-x-4 ml-4">
            <NavLink
              className={({ isActive }) =>
                isActive ? 'text-indigo-700 font-medium' : ''
              }
              to="/"
            >
              Home
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive ? 'text-indigo-700 font-medium' : ''
              }
              to="/shop"
            >
              Shop Now
            </NavLink>
          </div>
        </div>

        <SearchBar />

        <div className=" flex items-center mr-9 space-x-4">
          <div className="hidden lg:inline-flex">
            {auth?.token ? (
              <Link to="/account" className="flex items-center flex-col">
                <UserIcon className="h-6 w-6" />
                <span className="text-xs font-semibold">
                  Hi, {auth?.user?.firstName}
                </span>
              </Link>
            ) : (
              <Link
                to="/login"
                className="text-sm font-semibold text-white bg-indigo-700 hover:bg-indigo-800 px-4 py-2"
              >
                Login
              </Link>
            )}
          </div>

          <Link to="/wishlist" className="flex items-center flex-col">
            <div className="relative">
              <HeartIcon className="h-6 w-6" />
              <span className="absolute -top-2 -right-3 text-sm font-semibold w-5 h-5 bg-indigo-700 rounded-full flex items-center justify-center text-white">
                {wishlist?.itemsInWishlist?.length}
              </span>
            </div>

            <span className="text-xs font-semibold">Wishlist</span>
          </Link>
          <Link to="/cart" className="flex items-center flex-col">
            <div className="relative">
              <ShoppingCartIcon className="h-6 w-6" />
              <span className="absolute -top-2 -right-3 text-sm font-semibold w-5 h-5 bg-indigo-700 rounded-full flex items-center justify-center text-white">
                {cart?.itemsInCart?.products?.length}
              </span>
            </div>
            <span className="text-xs font-semibold">Cart</span>
          </Link>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
