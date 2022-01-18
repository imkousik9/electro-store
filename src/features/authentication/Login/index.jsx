import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getCart } from '../../cart/cartSlice';
import { getWishlist } from '../../wishlist/wishlistSlice';
import { login, useAuthentication } from '../authenticationSlice';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const { state } = useLocation();

  const dispatch = useDispatch();
  const auth = useAuthentication();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dispatchResponse = await dispatch(login({ email, password }));

    if (dispatchResponse.payload?.token) {
      dispatch(getWishlist());
      dispatch(getCart());
      navigate(state?.from ? state.from : '/');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        className="ring-1 ring-indigo-700 rounded-md py-10 px-6 md:px-10 flex flex-col"
        onSubmit={handleSubmit}
      >
        <h1 className="text-center mb-6 text-2xl font-semibold">LOGIN</h1>

        <div className="text-sm font-medium space-y-4 mb-6">
          <div className="flex flex-col space-y-1">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email here"
              className="w-96 px-2 py-3 text-sm rounded-md border border-gray-300 outline-indigo-700"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>

          <div className="flex flex-col space-y-1">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password here"
              className="w-96 px-2 py-3 text-sm rounded-md border border-gray-300 outline-indigo-700"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          {auth.error && (
            <p className="text-center text-red-500">{auth.error}</p>
          )}
        </div>

        <button
          className="mb-4 p-2 font-medium border text-indigo-700 border-indigo-700 hover:text-white hover:bg-indigo-700 rounded-md"
          onClick={() => {
            setEmail('admin@mail.com');
            setPassword('Test1234');
          }}
        >
          Login With Test Credentials
        </button>
        <button
          type="submit"
          className="mb-4 p-2 uppercase font-medium border  border-indigo-700 text-white bg-indigo-700 hover:bg-indigo-800 rounded-md"
        >
          Login
        </button>
        <p className="text-sm">
          Not a user yet?{' '}
          <Link
            to="/signup"
            state={state}
            className="underline-offset-1 hover:text-indigo-600"
          >
            Create your account
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
