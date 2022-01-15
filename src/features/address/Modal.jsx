import { Fragment, useReducer } from 'react';
import { defaultAddress, formReducer } from './reducer/formReducer';
import { useDispatch } from 'react-redux';
import { createNewAddress, updateAddress } from './addressSlice';
import { states } from '../../data';

import { Dialog, Transition } from '@headlessui/react';

function Modal({ existingAddress = defaultAddress, open, setOpen }) {
  const [formState, formDispatch] = useReducer(formReducer, {
    ...existingAddress
  });

  const dispatch = useDispatch();

  const submitFormHandler = async () => {
    const address = {
      name: formState.name,
      streetAddress: formState.streetAddress,
      city: formState.city,
      state: formState.state,
      zipCode: formState.zipCode,
      phoneNumber: formState.phoneNumber
    };

    let dispatchResponse;

    if (existingAddress._id !== null) {
      dispatchResponse = await dispatch(
        updateAddress({ address, id: existingAddress?._id })
      );
    } else {
      dispatchResponse = await dispatch(createNewAddress(address));
    }

    if (dispatchResponse.meta.requestStatus === 'fulfilled') {
      setOpen(false);
    }
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={() => open}
      >
        <div className="mt-[370px] flex items-end justify-center  p-4 pb-20 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-95"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="-mt-72 inline-block align-bottom bg-white rounded-lg p-6 md:px-10 md:md:py-6 text-left overflow-hidden shadow-xl transform transition-all w-2/3">
              <Dialog.Title
                as="h3"
                className="text-base leading-1 font-medium text-gray-900"
              >
                ADD NEW ADDRESS
              </Dialog.Title>
              <div className="flex flex-col space-y-4 mt-6">
                <input
                  type="text"
                  placeholder="Enter name"
                  className="p-2 border rounded-md outline-indigo-700"
                  value={formState.name}
                  onChange={(e) => {
                    formDispatch({ type: 'SET_NAME', payload: e.target.value });
                  }}
                />
                <input
                  type="text"
                  placeholder="Enter house no., street, colony"
                  className="p-2 border rounded-md outline-indigo-700"
                  value={formState.streetAddress}
                  onChange={(e) => {
                    formDispatch({
                      type: 'SET_STREET',
                      payload: e.target.value
                    });
                  }}
                />
                <input
                  type="text"
                  placeholder="Enter city"
                  className="p-2 border rounded-md outline-indigo-700"
                  value={formState.city}
                  onChange={(e) => {
                    formDispatch({ type: 'SET_CITY', payload: e.target.value });
                  }}
                />
                <select
                  className="p-2 border rounded-md outline-indigo-700"
                  value={formState.state}
                  onChange={(e) => {
                    formDispatch({
                      type: 'SET_STATE',
                      payload: e.target.value
                    });
                  }}
                >
                  {states.map((state) => (
                    <option key={state}>{state}</option>
                  ))}
                </select>
                <input
                  type="text"
                  placeholder="Enter zip code"
                  className="p-2 border rounded-md outline-indigo-700"
                  value={formState.zipCode}
                  onChange={(e) => {
                    formDispatch({
                      type: 'SET_ZIPCODE',
                      payload: e.target.value
                    });
                  }}
                />
                <input
                  type="text"
                  placeholder="Enter mobile number"
                  className="p-2 border rounded-md outline-indigo-700"
                  value={formState.phoneNumber}
                  onChange={(e) => {
                    formDispatch({
                      type: 'SET_PHONE_NUMBER',
                      payload: e.target.value
                    });
                  }}
                />
              </div>
              <div className="flex items-center justify-center space-x-4 mt-6">
                <button
                  className="px-6 py-2 bg-indigo-700 hover:bg-indigo-800 text-white rounded-md"
                  onClick={submitFormHandler}
                >
                  Save
                </button>
                <button
                  className="px-6 py-2 bg-indigo-700 hover:bg-indigo-800 text-white rounded-md"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default Modal;
