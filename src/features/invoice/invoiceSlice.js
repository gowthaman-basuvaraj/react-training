import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';
import { format } from 'date-fns';

export function makeNewInvoice(next = 1) {
  return {
    id: null,
    invoiceNo: next,
    invoiceDate: format(new Date(), 'yyyy-MM-dd'),
    invoiceValue: '',
    customerId: '',
  };
}

const initialState = {
  invoices: [],
  newInvoice: makeNewInvoice(),
  invoicePopUp: false,
};

export const invoiceSlice = createSlice({
  name: 'invoice',
  initialState,
  reducers: {
    newInvoice(state) {
      state.newInvoice = makeNewInvoice(state.invoices.length + 1);
      state.invoicePopUp = true;
    },
    closeInvoicePopUp(state) {
      state.invoicePopUp = false;
    },
    editInvoice(state, action) {
      state.newInvoice = _.cloneDeep(action.payload);
      state.invoicePopUp = true;
    },
    setInvoices(state, action) {
      state.invoices = action.payload;
    },
  },
});

export const { editInvoice, setInvoices, newInvoice, closeInvoicePopUp } = invoiceSlice.actions;
export const invoices = (state) => state.invoice.invoices;
export const invoiceToBeEdited = (state) => state.invoice.newInvoice;

export default invoiceSlice.reducer;
