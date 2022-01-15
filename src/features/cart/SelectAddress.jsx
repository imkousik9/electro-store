import { useState } from 'react';
import { useSelectedAddress } from '../../lib';
import SelectAddressModal from './SelectAddressModal';

function SelectAddress() {
  const [open, setOpen] = useState(false);
  const { selectedAddress } = useSelectedAddress();
  return (
    <>
      <div className="p-4 mb-6 shadow-custom rounded-md bg-white  flex items-center justify-between">
        <div className="space-y-1 text-gray-800">
          {selectedAddress ? (
            <>
              <p className="text-sm">
                Deliver to:
                <span className="font-medium">
                  {' '}
                  {`${selectedAddress.name}, ${selectedAddress.zipCode}`}
                </span>
              </p>
              <p className="text-xs">
                {`${selectedAddress.streetAddress}, ${selectedAddress.city}`}
              </p>
            </>
          ) : (
            <p className="text-sm">
              Deliver to:
              <span className="font-medium">Address not selected</span>
            </p>
          )}
        </div>

        <div className="pl-6">
          <button
            className="text-sm rounded-md text-indigo-700 hover:text-white hover:bg-indigo-700 border border-indigo-700 px-3 py-1"
            onClick={() => setOpen(true)}
          >
            Change
          </button>
        </div>
      </div>

      {open && <SelectAddressModal open={open} setOpen={setOpen} />}
    </>
  );
}

export default SelectAddress;
