import { Link, useLocation } from 'react-router-dom';
import { useProducts } from '../productsSlice';

import ProductCard from './ProductCard';

function SearchResultPage() {
  const query = new URLSearchParams(useLocation().search);

  const searchTerm = query.get('searchTerm');

  const { products } = useProducts();

  const filteredData = products.filter(
    ({ name, category, brand }) =>
      name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      searchTerm.toLowerCase().includes(name.toLowerCase()) ||
      searchTerm.toLowerCase().includes(brand.toLowerCase()) ||
      searchTerm.toLowerCase().includes(category.toLowerCase())
  );
  const numberOfItems = filteredData.length;
  return (
    <>
      {numberOfItems !== 0 ? (
        <>
          <h1 className="text-center text-lg font-semibold mt-4">
            Search results for "{searchTerm}"
            <span className="font-light"> - {numberOfItems} items</span>
          </h1>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 m-5 p-5 shadow-custom rounded-md bg-white">
            {filteredData.map((product) => {
              return <ProductCard key={product._id} product={product} />;
            })}
          </div>
        </>
      ) : (
        <>
          <div className="text-center space-y-8">
            <h1 className="text-xl font-semibold  mt-10">
              Oh! No search results for "{searchTerm}"
            </h1>
            <p>Check out other products</p>
            <div>
              <Link
                to="/shop"
                className="py-2 px-4 bg-indigo-700 text-white hover:bg-indigo-800 rounded-md"
              >
                Go to Shop
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default SearchResultPage;
