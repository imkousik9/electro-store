import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import axios from '../../lib/axios';

export const getProducts = createAsyncThunk(
  'products/getProducts',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get('/api/products');

      return data;
    } catch (error) {
      const message = error.response.data.message;
      return rejectWithValue(message);
    }
  }
);

const initialState = {
  status: 'loading',
  error: null,
  products: [],
  sortBy: '',
  dataFilter: {
    includeOutOfStock: true,
    filterByCategories: [],
    filterByBrands: []
  },
  applySearch: ''
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    sortProducts: (state, action) => {
      if (action.payload === 'HIGH_TO_LOW_PRICE') {
        state.sortBy = 'HIGH_TO_LOW_PRICE';
      }

      if (action.payload === 'LOW_TO_HIGH_PRICE') {
        state.sortBy = 'LOW_TO_HIGH_PRICE';
      }
    },

    clearAllFilters: (state) => {
      state.sortBy = '';
      state.dataFilter.includeOutOfStock = true;
      state.dataFilter.filterByCategories = [];
      state.dataFilter.filterByBrands = [];
    },

    filterByCategories: (state, action) => {
      if (state.dataFilter.filterByCategories.includes(action.payload)) {
        state.dataFilter.filterByCategories =
          state.dataFilter.filterByCategories.filter(
            (item) => item !== action.payload
          );
      } else {
        state.dataFilter.filterByCategories =
          state.dataFilter.filterByCategories.concat(action.payload);
      }
    },

    filterByBrands: (state, action) => {
      console.log(action.payload);
      if (state.dataFilter.filterByBrands.includes(action.payload)) {
        state.dataFilter.filterByBrands =
          state.dataFilter.filterByBrands.filter(
            (item) => item !== action.payload
          );
      } else {
        state.dataFilter.filterByBrands =
          state.dataFilter.filterByBrands.concat(action.payload);
      }
    },

    includeOutOfStock: (state, action) => {
      state.dataFilter.includeOutOfStock = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  }
});

export const {
  sortProducts,
  clearAllFilters,
  filterByCategories,
  filterByBrands,
  includeOutOfStock
} = productsSlice.actions;
export const useProducts = () => useSelector((state) => state.products);
export default productsSlice.reducer;
