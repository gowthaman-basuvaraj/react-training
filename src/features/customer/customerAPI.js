import { apiSlice, TagTypes } from '../apiSlice';

function transformCustomer(r) {
  return {
    ...r,
    underAged: r['age'] ? +r['age'] < 18 : false,
  }
}
export const customerApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCustomers: builder.query({
      query: () => '/customers',
      transformResponse: (response) => {
        console.log('transform response', response);
        return response.map(r => transformCustomer(r));
      },
      providesTags: (result = []) => [
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
      transformResponse: (response) => {
        console.log('single transform response', response)
        return transformCustomer(response)
      }
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
        url: `/customers/${customer.id}`,
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
