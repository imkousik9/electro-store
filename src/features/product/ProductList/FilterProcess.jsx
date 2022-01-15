import { useDispatch } from 'react-redux';
import { brands, categories } from '../../../data';
import {
  clearAllFilters,
  filterByBrands,
  filterByCategories,
  includeOutOfStock,
  sortProducts,
  useProducts
} from '../productsSlice';

function FilterProcess({ openFilter, setFilter }) {
  const dispatch = useDispatch();
  const products = useProducts();

  const sortByPrice = (e) => {
    dispatch(sortProducts(e.target.value));
  };

  return (
    <>
      <div className="flex justify-between">
        <button
          onClick={() => setFilter((openFilter) => !openFilter)}
          className="p-1 font-semibold"
        >
          {openFilter ? 'APPLY' : 'FILTERS'}
        </button>
        <button
          onClick={() => {
            dispatch(clearAllFilters());
            setFilter(false);
          }}
          className="p-1 font-light text-sm underline underline-offset-2 decoration-indigo-700 hover:text-indigo-700 hover:font-semibold"
        >
          CLEAR ALL
        </button>
      </div>
      <hr className="mt-2" />

      <ul className="list-none p-1">
        <li className="text-sm font-semibold mt-3">SORT</li>
        <li>
          <label className="text-sm mt-3 flex items-center">
            <input
              className=" w-4 h-4 mr-2"
              type="radio"
              name="sort"
              value="HIGH_TO_LOW_PRICE"
              onChange={sortByPrice}
              checked={'HIGH_TO_LOW_PRICE' === products.sortBy}
            />
            Price High to low
          </label>
        </li>
        <li>
          <label className="text-sm mt-3 flex items-center">
            <input
              className=" w-4 h-4 mr-2"
              type="radio"
              name="sort"
              value="LOW_TO_HIGH_PRICE"
              checked={'LOW_TO_HIGH_PRICE' === products.sortBy}
              onChange={sortByPrice}
            />
            Price Low to High
          </label>
        </li>

        <hr className="mt-4" />

        <li className="text-sm font-semibold mt-3">CATEGORIES</li>

        {categories.map((category) => {
          return (
            <li key={category}>
              <label className="text-sm mt-3 flex items-center">
                <input
                  className="w-4 h-4 mr-2"
                  type="checkbox"
                  checked={products.dataFilter.filterByCategories.includes(
                    category
                  )}
                  onChange={() => {
                    dispatch(filterByCategories(category));
                  }}
                />
                {category}
              </label>
            </li>
          );
        })}

        <hr className="mt-4" />

        <li className="text-sm font-semibold mt-3">BRANDS</li>

        {brands.map((brand) => {
          return (
            <li key={brand}>
              <label className="text-sm mt-3 flex items-center">
                <input
                  className="h-4 w-4 mr-2"
                  type="checkbox"
                  checked={products.dataFilter.filterByBrands.includes(brand)}
                  onChange={() => {
                    dispatch(filterByBrands(brand));
                  }}
                />
                {brand}
              </label>
            </li>
          );
        })}

        <hr className="mt-4" />

        <li className="text-sm font-semibold mt-3">OTHER</li>
        <li>
          <label className="text-sm mt-3 flex items-center">
            <input
              className="h-4 w-4 mr-2"
              type="checkbox"
              checked={products.dataFilter.includeOutOfStock}
              onChange={() => {
                dispatch(
                  includeOutOfStock(!products.dataFilter.includeOutOfStock)
                );
              }}
            />
            Include out of stock
          </label>
        </li>
      </ul>
    </>
  );
}

export default FilterProcess;
