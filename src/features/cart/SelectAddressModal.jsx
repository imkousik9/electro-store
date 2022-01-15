import { Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';
import { selectAddress, useCart } from './cartSlice';
import { useAddress } from '../address/addressSlice';

import { Dialog, Transition } from '@headlessui/react';
import AddressCard from '../address/AddressCard';
import Modal from '../address/Modal';
import { PlusSmIcon, XIcon } from '@heroicons/react/outline';

function SelectAddressModal({ open, setOpen }) {
  const [isAddNew, setAddNew] = useState(false);
  const dispatch = useDispatch();

  const { addressDetails } = useAddress();
  const cart = useCart();

  const changeAddress = async (addressId) => {
    const dispatchResponse = await dispatch(selectAddress(addressId));

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
              <button
                className="absolute top-5 right-5 text-slate-500 hover:text-slate-900"
                onClick={() => {
                  setOpen(false);
                }}
              >
                <XIcon className="h-6" />
              </button>
              <div className="flex flex-col space-y-4 mt-6">
                {addressDetails?.map((address) => (
                  <div key={address?._id} className="flex space-x-4">
                    <input
                      className="h-4 w-4"
                      type="radio"
                      name="address"
                      checked={address?._id === cart?.itemsInCart?.addressId}
                      onChange={() => changeAddress(address?._id)}
                    />

                    <div className="-mt-2">
                      <AddressCard address={address} />
                    </div>
                  </div>
                ))}
              </div>
              <button
                className="flex items-center space-x-2 text-slate-500 mt-6"
                onClick={() => {
                  setAddNew(true);
                }}
              >
                <PlusSmIcon className="h-6" />
                <span>ADD NEW ADDRESS</span>
              </button>

              {isAddNew && <Modal open={isAddNew} setOpen={setAddNew} />}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default SelectAddressModal;
