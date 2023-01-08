import { apiSlice, TagTypes } from '../apiSlice';

export const customerApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCustomers: builder.query({
      query: () => '/customers',
      providesTags: (result = [], error, arg) => [
        TagTypes.Customer,
        ...result.map(({ id }) => ({
          type: TagTypes.Customer,
          id,
        })),
      ],
    }),
    getCustomer: builder.query({
      query: (customerId) => `/customers/${customerId}`,
      providesTags: (result, error, arg) => [{ type: TagTypes.Customer, id: arg }],
    }),
    addNewCustomer: builder.mutation({
      query: (customer) => ({
        url: '/customers',
        method: 'POST',
        // Include the entire customer object as the body of the request
        body: customer,
      }),
      invalidatesTags: [TagTypes.Customer],
    }),
    updateCustomer: builder.mutation({
      query: (customer) => ({
        url: '/customers',
        method: 'PATCH',
        // Include the entire customer object as the body of the request
        body: customer,
      }),
      invalidatesTags: (result, error, arg) => [{ type: TagTypes.Customer, id: arg.id }],
    }),
  }),
});

export const { useGetCustomersQuery, useGetCustomerQuery, useAddNewCustomerMutation, useUpdateCustomerMutation } =
  customerApiSlice;
