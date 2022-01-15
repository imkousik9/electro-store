import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { register } from '../authenticationSlice';

function SingUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const navigate = useNavigate();
  const { state } = useLocation();

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dispatchResponse = await dispatch(
      register({ firstName, lastName, email, password })
    );

    if (dispatchResponse.payload?.token) {
      navigate(state?.from ? state.from : '/');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        className="ring-1 ring-indigo-700 rounded-md py-6 px-6 md:px-10 flex flex-col"
        onSubmit={handleSubmit}
      >
        <h1 className="text-center mb-3 text-2xl font-semibold">
          Create Account
        </h1>

        <div className="text-sm font-medium space-y-4 mb-6">
          <div className="flex flex-col space-y-1">
            <label htmlFor="firstName">
              First Name<span className="text-red-600">*</span>
            </label>
            <input
              id="firstName"
              type="text"
              placeholder="Enter your first name here"
              className="w-96 px-2 py-3 text-sm rounded-md border border-gray-300 outline-indigo-700"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>

          <div className="flex flex-col space-y-1">
            <label htmlFor="lastName">
              Last Name<span className="text-red-600">*</span>
            </label>
            <input
              id="lastName"
              type="text"
              placeholder="Enter your last name here"
              className="w-96 px-2 py-3 text-sm rounded-md border border-gray-300 outline-indigo-700"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <div className="flex flex-col space-y-1">
            <label htmlFor="email">
              Email<span className="text-red-600">*</span>
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email here"
              className="w-96 px-2 py-3 text-sm rounded-md border border-gray-300 outline-indigo-700"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex flex-col space-y-1">
            <label>
              Password<span className="text-red-600">*</span>
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password here"
              className=" w-96 px-2 py-3 text-sm rounded-md border border-gray-300 outline-indigo-700"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <button
          type="submit"
          className="mb-3 p-2 uppercase font-medium border  border-indigo-700 text-white bg-indigo-700 hover:bg-indigo-800 rounded-md"
        >
          register
        </button>
        <p className="text-sm">
          Already registered?{' '}
          <Link
            to="/login"
            state={state}
            className="underline-offset-1 hover:text-indigo-600"
          >
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
}

export default SingUp;
