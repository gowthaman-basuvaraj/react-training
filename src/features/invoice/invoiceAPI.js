import { apiSlice, TagTypes } from '../apiSlice';

export const invoiceApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getInvoices: builder.query({
      query: (arg) => {
        return {
          url: '/invoices',
          params: arg ? {q: JSON.stringify(arg)} : {}
        }
      },
      providesTags: (result = []) => [
        TagTypes.Invoice,
        ...result.map(({ id }) => ({
          type: TagTypes.Invoice,
          id,
        })),
      ],
    }),
    getInvoice: builder.query({
      query: (invoiceId) => `/invoices/${invoiceId}`,
      providesTags: (result, error, arg) => [{ type: TagTypes.Invoice, id: arg }],
    }),
    addNewInvoice: builder.mutation({
      query: (invoice) => ({
        url: '/invoices',
        method: 'POST',
        // Include the entire invoice object as the body of the request
        body: invoice,
      }),
      invalidatesTags: [TagTypes.Invoice, TagTypes.Customer],
    }),
    updateInvoice: builder.mutation({
      query: (invoice) => ({
        url: `/invoices/${invoice.id}`,
        method: 'PATCH',
        // Include the entire invoice object as the body of the request
        body: invoice,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: TagTypes.Invoice, id: arg.id },
        { type: TagTypes.Customer, id: +arg.customerId }
      ],
    }),
  }),
});

export const { useGetInvoicesQuery, useGetInvoiceQuery, useAddNewInvoiceMutation, useUpdateInvoiceMutation } =
  invoiceApiSlice;
