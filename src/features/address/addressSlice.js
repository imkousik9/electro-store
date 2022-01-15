import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import axios from '../../lib/axios';

export const createNewAddress = createAsyncThunk(
  'address/createNewAddress',
  async (address, { getState, rejectWithValue }) => {
    try {
      const state = getState();

      const { data } = await axios.post('/api/address', address, {
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

export const removeAddress = createAsyncThunk(
  'address/removeAddress',
  async (id, { getState, rejectWithValue }) => {
    try {
      const state = getState();

      const { data } = await axios.delete(`/api/address/${id}`, {
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

export const updateAddress = createAsyncThunk(
  'address/updateAddress',
  async ({ address, id }, { getState, rejectWithValue }) => {
    try {
      const state = getState();

      const { data } = await axios.put(`/api/address/${id}`, address, {
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

export const getUserAddresses = createAsyncThunk(
  'address/getUserAddresses',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState();

      const { data } = await axios.get('/api/address', {
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

const initialState = {
  addressDetails: null
};

export const addressSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserAddresses.fulfilled, (state, action) => {
        state.addressDetails = action.payload;
      })
      .addCase(getUserAddresses.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(createNewAddress.fulfilled, (state, action) => {
        state.addressDetails = action.payload;
      })
      .addCase(createNewAddress.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(removeAddress.fulfilled, (state, action) => {
        state.addressDetails = action.payload;
      })
      .addCase(removeAddress.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(updateAddress.fulfilled, (state, action) => {
        state.addressDetails = action.payload;
      })
      .addCase(updateAddress.rejected, (state, action) => {
        state.error = action.payload;
      });
  }
});

export default addressSlice.reducer;
export const useAddress = () => useSelector((state) => state.address);
