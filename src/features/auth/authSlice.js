import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createUser, doLogin } from './authAPI';

const initialState = {
  authToken: null,
  loginStatus: false,
  userCreationStatus: false,
  status: 'idle',
  loginError: null,
  creationError: null,
  userName: '',
  landingPage: '/',
  idleTime: 0,
  sseConnected: false
};

export const doLoginAsync = createAsyncThunk('auth/doLogin', doLogin);
export const doUserCreationAsync = createAsyncThunk('auth/createUser', createUser);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLandingPage(state, action) {
      state.landingPage = action.payload
    },
    logout: (state) => {
      state.authToken = null;
      state.loginStatus = false;
    },
    sseStatus(state, action) {
      state.sseConnected = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(doLoginAsync.pending, (state) => {
        state.status = 'loading';
        state.loginError = null;
        state.loginStatus = false;
      })
      .addCase(doLoginAsync.rejected, (state) => {
        state.status = 'idle';
        state.loginError = null;
        state.loginStatus = false;
      })
      .addCase(doLoginAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        if (action.payload.authToken) {
          state.loginStatus = true;
          state.authToken = action.payload.authToken;
          state.userName = action.payload.user;
        } else {
          state.loginError = action.payload.error;
        }
      })
      .addCase(doUserCreationAsync.pending, (state) => {
        state.status = 'loading';
        state.creationError = null;
        state.userCreationStatus = false;
      })
      .addCase(doUserCreationAsync.rejected, (state) => {
        state.status = 'idle';
        state.creationError =  null
        state.userCreationStatus = false;
      })
      .addCase(doUserCreationAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        if (action.payload.status) {
          state.userCreationStatus = true;
          state.userName = action.payload.user;
          state.creationError =  null
        } else {
          state.creationError = action.payload.error;
        }
      });
  },
});

export const { logout, setLandingPage, sseStatus } = authSlice.actions;

export const isLoggedIn = (state) => state.auth.loginStatus;
export const loginProcess = (state) => state.auth.status;
export const userCreated = (state) => state.auth.userCreationStatus;
export const userName = (state) => state.auth.userName;
export const creationError = (state) => state.auth.creationError;
export const loginError = (state) => state.auth.loginError;
export const landingPage = (state) => state.auth.landingPage;
export const sseConnectStatus = (state) => state.auth.sseConnected;

export default authSlice.reducer;
