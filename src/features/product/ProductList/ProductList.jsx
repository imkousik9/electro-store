import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getFilteredData, getSortedData } from '../../../lib';
import { getProducts, useProducts } from '../productsSlice';

import Filter from './Filter';
import ProductCard from './ProductCard';
import Spinner from '../../../Spinner';

function ProductList() {
  const dispatch = useDispatch();

  const products = useProducts();

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!products?.products) {
      dispatch(getProducts());
    }
  }, []);

  const sortedData = getSortedData(products, products?.products);
  const filteredData = getFilteredData(products, sortedData);

  return (
    <div className="grid grid-cols-4">
      <Filter />

      <div className="col-span-4 md:col-span-3">
        {products?.status === 'loading' ? (
          <span className="flex justify-center mt-48">
            <Spinner size="w-24 h-24" />
          </span>
        ) : filteredData.length === 0 ? (
          <h6 className="p-10 text-center">No Products Found</h6>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 m-5 p-5 shadow-custom rounded-md bg-white">
            {filteredData.map((product) => {
              return <ProductCard key={product?._id} product={product} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductList;
