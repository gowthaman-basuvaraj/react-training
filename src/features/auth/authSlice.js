import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  authToken: null,
  loginStatus: false,
  userCreationStatus: false,
  status: 'idle',
  loginError: null,
};

const loginUrl = `${process.env.REACT_APP_API_BASE_URL}/auth/validate`;
const createUserUrl = `${process.env.REACT_APP_API_BASE_URL}/auth/create`;
const PostOptions = {
  method: 'POST',
};

const doLogin = async ({ user, pass }) => {
  let body = new FormData();
  body.append('user', user);
  body.append('pass', pass);

  let step1 = await fetch(loginUrl, {
    ...PostOptions,
    body,
  });

  if (step1.ok) {
    return await step1.json();
  } else {
    return {
      error: 'Login Failed',
    };
  }
};

const createUser = async ({ user, pass }) => {
  let body = new FormData();
  body.append('user', user);
  body.append('pass', pass);

  let step1 = await fetch(createUserUrl, {
    ...PostOptions,
    body,
  });

  if (step1.ok) {
    return await step1.json();
  } else {
    return {
      error: 'User Creation Failed',
    };
  }
};

export const doLoginAsync = createAsyncThunk('auth/doLogin', doLogin);
export const doUserCreationAsync = createAsyncThunk('auth/createUser', createUser);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.authToken = null;
      state.loginStatus = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(doLoginAsync.pending, (state) => {
        state.status = 'loading';
        state.loginError = null;
        state.loginStatus = false;
      })
      .addCase(doLoginAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        if (action.payload.authToken) {
          state.loginStatus = true;
          state.authToken = action.payload.authToken;
        } else {
          state.loginError = action.payload.error;
        }
      })
      .addCase(doUserCreationAsync.pending, (state) => {
        state.status = 'loading';
        state.loginError = null;
        state.userCreationStatus = false;
      })
      .addCase(doUserCreationAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        if (action.payload.status) {
          state.userCreationStatus = true;
        } else {
          state.loginError = action.payload.error;
        }
      });
  },
});

export const { logout } = authSlice.actions;

export const isLoggedIn = (state) => state.auth.loginStatus;
export const loginProcess = (state) => state.auth.status;
export const userCreated = (state) => state.auth.userCreationStatus;

export default authSlice.reducer;
