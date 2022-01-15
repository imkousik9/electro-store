import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout, useAuthentication } from '../authenticationSlice';
import { resetWishlist } from '../../wishlist/wishlistSlice';
import { resetCart } from '../../cart/cartSlice';

import Profile from '../../../assets/profile-pic.svg';
import { LogoutIcon } from '@heroicons/react/outline';

const items = [
  {
    text: 'Profile',
    link: '/account'
  },
  {
    text: 'Orders',
    link: '/account/orders'
  },
  {
    text: 'Addresses',
    link: '/account/address'
  }
];

function SideBar() {
  const dispatch = useDispatch();
  const auth = useAuthentication();
  const navigate = useNavigate();

  const logOut = () => {
    dispatch(resetWishlist());
    dispatch(resetCart());
    dispatch(logout());
    navigate('/');
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center space-x-4 p-8 bg-white shadow-custom rounded-md">
        <img src={Profile} alt="" />
        <div>
          <p className="text-xs">Hello,</p>
          <p className="text-sm font-medium">
            {auth?.user?.firstName} {auth?.user?.lastName}
          </p>
        </div>
      </div>
      <div className="mt-6 flex flex-col bg-white shadow-custom rounded-md text-sm">
        {items.map(({ text, link }) => (
          <div
            key={text}
            className="mt-2 hover:bg-indigo-50 hover:text-indigo-700"
          >
            <NavLink
              to={link}
              end
              className={({ isActive }) =>
                isActive ? 'text-indigo-700 font-semibold' : ''
              }
            >
              <div className="ml-8 p-2">{text}</div>
            </NavLink>
          </div>
        ))}

        <div className="p-8 border-t mt-4">
          <p
            className="flex items-center space-x-4 font-semibold cursor-pointer text-gray-400 hover:text-indigo-700"
            onClick={logOut}
          >
            <LogoutIcon className="h-6 text-indigo-700" />
            <span className="text-lg">Logout</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
