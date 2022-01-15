import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearAllFilters, filterByCategories } from '../product/productsSlice';

function CategoryCard({ category, categoryFilter, image }) {
  const dispatch = useDispatch();
  const navigation = useNavigate();

  return (
    <div
      className="text-center w-fit text-sm group cursor-pointer p-4 mx-auto"
      onClick={() => {
        dispatch(clearAllFilters());
        dispatch(filterByCategories(categoryFilter));
        navigation('/shop');
      }}
    >
      <img
        className="h-28 object-contain group-hover:scale-105 transition-transform mx-auto"
        src={image}
        alt=""
      />
      <p className="font-semibold group-hover:text-indigo-700 transition-colors mt-4">
        {category}
      </p>
    </div>
  );
}

export default CategoryCard;
