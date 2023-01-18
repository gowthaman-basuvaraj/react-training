import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import customerReducer from '../features/customer/customerSlice';
import invoiceReducer from '../features/invoice/invoiceSlice';
import { apiSlice } from '../features/apiSlice';
import logger from 'redux-logger';

// eslint-disable-next-line no-undef
const loggerMiddleWare = process.env.NODE_ENV === 'development' ? [logger] : [];

export const store = configureStore({
  reducer: {
    customer: customerReducer,
    invoice: invoiceReducer,
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware, ...loggerMiddleWare),
});
