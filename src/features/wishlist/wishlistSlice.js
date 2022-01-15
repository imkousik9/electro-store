import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import axios from '../../lib/axios';

export const getWishlist = createAsyncThunk(
  'wishlist/getWishlist',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const { data } = await axios.get('/api/wishlist', {
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

export const addToWishlist = createAsyncThunk(
  'wishlist/addToWishlist',
  async (id, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const { data } = await axios.post(
        '/api/wishlist',
        { _id: id },
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
  status: 'loading',
  itemsInWishlist: [],
  error: null
};

export const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    resetWishlist: (state) => {
      state.itemsInWishlist = [];
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getWishlist.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.itemsInWishlist = action.payload;
      })
      .addCase(getWishlist.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.itemsInWishlist = action.payload;
      })
      .addCase(addToWishlist.rejected, (state, action) => {
        state.error = action.payload;
      });
  }
});

export const { resetWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
export const useWishlist = () => useSelector((state) => state.wishlist);
