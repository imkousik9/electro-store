import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import axios from '../../lib/axios';

const { userName, token } = JSON.parse(localStorage.getItem('session')) || {
  token: null,
  userName: null
};

export const authUser = createAsyncThunk(
  'authenticate/authUser',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get('/api/users/me', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      return data;
    } catch (error) {
      const message = error.response.data.message;
      return rejectWithValue(message);
    }
  }
);

export const login = createAsyncThunk(
  'authenticate/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('/api/users/login', {
        email,
        password
      });

      return data;
    } catch (error) {
      const message = error.response.data.message;
      return rejectWithValue(message);
    }
  }
);

export const register = createAsyncThunk(
  'authenticate/register',
  async ({ firstName, lastName, email, password }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('/api/users/signup', {
        firstName,
        lastName,
        email,
        password
      });

      return data;
    } catch (error) {
      const message = error.response.data.message;
      return rejectWithValue(message);
    }
  }
);

const initialState = {
  status: 'idle',
  token: token,
  user: {
    email: null,
    firstName: userName,
    lastName: null
  },
  error: null
};

export const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('session');

      state.status = 'idle';
      state.user = {
        email: null,
        firstName: null,
        lastName: null
      };
      state.token = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(authUser.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(authUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user.email = action.payload?.email;
        state.user.firstName = action.payload?.firstName;
        state.user.lastName = action.payload?.lastName;
      })
      .addCase(authUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(login.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user.email = action.payload?.email;
        state.user.firstName = action.payload?.firstName;
        state.user.lastName = action.payload?.lastName;
        state.token = action.payload?.token;

        localStorage?.setItem(
          'session',
          JSON.stringify({
            userName: action.payload?.firstName,
            token: action.payload?.token
          })
        );
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(register.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user.email = action.payload?.email;
        state.user.firstName = action.payload?.firstName;
        state.user.lastName = action.payload?.lastName;
        state.token = action.payload?.token;

        localStorage?.setItem(
          'session',
          JSON.stringify({
            userName: action.payload?.firstName,
            token: action.payload?.token
          })
        );
      })
      .addCase(register.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  }
});

export const { logout } = authenticationSlice.actions;
export default authenticationSlice.reducer;
export const useAuthentication = () =>
  useSelector((state) => state.authentication);
