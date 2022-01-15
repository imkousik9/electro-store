import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import axios from '../../lib/axios';

export const getOrders = createAsyncThunk(
  'orders/getOrders',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState();

      const { data } = await axios.get('/api/orders', {
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

export const placeOrder = createAsyncThunk(
  'orders/placeOrder',
  async (orderDetails, { getState, rejectWithValue }) => {
    try {
      const state = getState();

      const { data } = await axios.post('/api/orders', orderDetails, {
        headers: {
          'Content-Type': 'application/json',
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

const initialState = {
  status: 'loading',
  orderId: null,
  orders: [],
  error: null
};

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    paymentFailure: (state, action) => {
      state.status = 'FAILURE';
      state.error = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.orders = action.payload;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.orderId = action.payload;
        state.status = 'SUCCESS';
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.status = 'FAILURE';
        state.error = action.payload;
      });
  }
});

export const { paymentFailure } = ordersSlice.actions;
export default ordersSlice.reducer;
export const useOrders = () => useSelector((state) => state.orders);
