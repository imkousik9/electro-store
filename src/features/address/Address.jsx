import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getUserAddresses, useAddress } from './addressSlice';

import Modal from './Modal';
import AddressCard from './AddressCard';
import { PlusSmIcon } from '@heroicons/react/outline';

function Address() {
  const [isAddNew, setAddNew] = useState(false);
  const { addressDetails } = useAddress();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserAddresses());
  }, []);

  return (
    <>
      <h1 className="font-semibold">My Addresses</h1>
      <ul className="mt-10">
        {addressDetails &&
          addressDetails?.map((address) => (
            <AddressCard key={address?._id} address={address} />
          ))}
      </ul>

      <button
        className="flex items-center space-x-2 text-slate-500 mt-12"
        onClick={() => {
          setAddNew(true);
        }}
      >
        <PlusSmIcon className="h-6" />
        <span>ADD NEW ADDRESS</span>
      </button>

      {isAddNew && <Modal open={isAddNew} setOpen={setAddNew} />}
    </>
  );
}

export default Address;
