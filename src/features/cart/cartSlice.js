import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import axios from '../../lib/axios';

export const getCart = createAsyncThunk(
  'cart/getCart',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState();

      const { data } = await axios.get('/api/cart', {
        headers: {
          Authorization: `Bearer ${state?.authentication?.token}`
        }
      });

      return data;
    } catch (error) {
      const message = error.response.data.message;
      return rejectWithValue(message);
    }
  }
);

export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async (product, { getState, rejectWithValue }) => {
    try {
      const state = getState();

      const { data } = await axios.post(
        '/api/cart',
        {
          _id: product?._id,
          quantity: 1,
          active: true
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${state?.authentication?.token}`
          }
        }
      );

      return data;
    } catch (error) {
      const message = error.response.data.message;
      return rejectWithValue(message);
    }
  }
);

export const updateCart = createAsyncThunk(
  'cart/updateCart',
  async ({ product, quantity }, { getState, rejectWithValue }) => {
    try {
      const state = getState();

      const { data } = await axios.post(
        '/api/cart',
        { _id: product?._id, quantity, active: true },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${state?.authentication?.token}`
          }
        }
      );

      return data;
    } catch (error) {
      const message = error.response.data.message;
      return rejectWithValue(message);
    }
  }
);

export const removeFromCart = createAsyncThunk(
  'cart/removeFromCart',
  async (product, { getState, rejectWithValue }) => {
    try {
      const state = getState();

      const { data } = await axios.post(
        '/api/cart',
        { _id: product?._id, quantity: 0, active: false },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${state?.authentication?.token}`
          }
        }
      );

      return data;
    } catch (error) {
      const message = error.response.data.message;
      return rejectWithValue(message);
    }
  }
);

export const selectAddress = createAsyncThunk(
  'cart/selectAddress',
  async (addressId, { getState, rejectWithValue }) => {
    try {
      const state = getState();

      const { data } = await axios.post(
        '/api/cart/address',
        { _id: addressId },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${state?.authentication?.token}`
          }
        }
      );

      return data;
    } catch (error) {
      const message = error.response.data.message;
      return rejectWithValue(message);
    }
  }
);

const initialState = {
  cartStatus: 'loading',
  itemsInCart: {
    products: [],
    addressId: null
  },
  error: null
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    resetCart: (state) => {
      state.itemsInCart.products = [];
      state.itemsInCart.addressId = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCart.fulfilled, (state, action) => {
        state.cartStatus = 'succeeded';
        state.itemsInCart.products = action.payload.products;
        state.itemsInCart.addressId = action.payload.addressId;
      })
      .addCase(getCart.rejected, (state, action) => {
        state.cartStatus = 'failed';
        state.error = action.payload;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.itemsInCart.products = action.payload.products;
        state.itemsInCart.addressId = action.payload.addressId;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(updateCart.fulfilled, (state, action) => {
        state.itemsInCart.products = action.payload.products;
        state.itemsInCart.addressId = action.payload.addressId;
      })
      .addCase(updateCart.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.itemsInCart.products = action.payload.products;
        state.itemsInCart.addressId = action.payload.addressId;
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(selectAddress.fulfilled, (state, action) => {
        state.itemsInCart.addressId = action.payload.addressId;
      })
      .addCase(selectAddress.rejected, (state, action) => {
        state.error = action.payload;
      });
  }
});

export const { resetCart } = cartSlice.actions;
export default cartSlice.reducer;
export const useCart = () => useSelector((state) => state.cart);
