import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearAllFilters, filterByBrands } from '../product/productsSlice';

function BrandCard({ brandName, image }) {
  const dispatch = useDispatch();
  const navigation = useNavigate();

  return (
    <div className="p-8">
      <div
        className="cursor-pointer outline outline-1 outline-indigo-700 rounded-md bg-white p-4 shadow-custom-2 shadow-indigo-700 hover:scale-105 transition-transform"
        onClick={() => {
          dispatch(clearAllFilters());
          dispatch(filterByBrands(brandName));
          navigation('/shop');
        }}
      >
        <img src={image} alt="" className="object-contain h-28 w-40" />
      </div>
    </div>
  );
}

export default BrandCard;
