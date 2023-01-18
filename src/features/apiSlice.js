import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = `${process.env.REACT_APP_API_BASE_URL}/api`;

export const TagTypes = {
  Customer: 'CUSTOMER',
  Invoice: 'INVOICE'
};

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      // By default, if we have a token in the store, let's use that for authenticated requests
      const token = getState().auth;
      if (token && token.authToken) {
        headers.set('Authorization', `Bearer ${token.authToken}`);
      }
      return headers;
    },
  }),
  //this is to Cache the requests, individual end-points will set what to cache and what to invalidate
  tagTypes: [...Object.values(TagTypes)],
  endpoints: () => ({}),
});
