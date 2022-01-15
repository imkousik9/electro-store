import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { removeAddress } from './addressSlice';

import Modal from './Modal';

function AddressCard({ address }) {
  const [isEditMode, setEditMode] = useState(false);

  const dispatch = useDispatch();

  const removeAddressClick = async () => {
    dispatch(removeAddress(address?._id));
  };

  return (
    <li className="mb-10 text-sm text-slate-600 list-none">
      <div className="space-y-1">
        <h4 className="text-lg font-medium">{address.name}</h4>

        <p>{address.streetAddress}</p>

        <p>{`${address.city}, ${address.state} ${address.zipCode}`}</p>

        <p>{address.country}</p>

        <p>Phone number:{address.phoneNumber}</p>
      </div>
      <div className="mt-6 space-x-4">
        <button
          className="px-6 py-2 bg-indigo-700 hover:bg-indigo-800 text-white rounded-md"
          onClick={(e) => {
            setEditMode((isEditMode) => !isEditMode);
          }}
        >
          Edit
        </button>

        <button
          className="px-6 py-2 border border-slate-600 hover:bg-indigo-700 hover:text-white rounded-md"
          onClick={removeAddressClick}
        >
          Remove
        </button>
      </div>

      {isEditMode && (
        <Modal
          existingAddress={address}
          open={isEditMode}
          setOpen={setEditMode}
        />
      )}
    </li>
  );
}

export default AddressCard;
