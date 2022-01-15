import { useState } from 'react';

import FilterProcess from './FilterProcess';
import { AdjustmentsIcon } from '@heroicons/react/outline';

function Filter() {
  const [openFilter, setFilter] = useState(false);
  return (
    <>
      <div
        className="absolute md:hidden left-5 top-20 bg-indigo-700 p-2 shadow-custom-2 shadow-indigo-500 rounded-full cursor-pointer"
        onClick={() => setFilter((openFilter) => !openFilter)}
      >
        <AdjustmentsIcon className="h-5 w-5 text-white rotate-180" />
      </div>

      <div className="col-span-1 hidden md:block m-5 p-5 shadow-custom rounded-md bg-white h-fit">
        <FilterProcess />
      </div>

      {openFilter && (
        <div className="z-10 absolute md:hidden m-5 p-5 shadow-custom-2 rounded-md bg-white">
          <FilterProcess openFilter={openFilter} setFilter={setFilter} />
        </div>
      )}
    </>
  );
}

export default Filter;
