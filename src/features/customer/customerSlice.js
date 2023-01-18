import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';

export function makeNewCustomer() {
  return {
    id: null,
    name: '',
    age: '',
    address: '',
    mobile: '',
  };
}

const initialState = {
  customers: [],
  newCustomer: makeNewCustomer(),
  customerPopUp: false,
};

export const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    newCustomer(state) {
      state.newCustomer = makeNewCustomer();
      state.customerPopUp = true;
    },
    closeCustomerPopUp(state) {
      state.customerPopUp = false;
    },
    editCustomer(state, action) {
      state.newCustomer = _.cloneDeep(action.payload);
      state.customerPopUp = true;
    },
    setCustomers(state, action) {
      state.customers = action.payload;
    },
  },
});

export const { editCustomer, setCustomers, newCustomer, closeCustomerPopUp } = customerSlice.actions;
export const customers = (state) => state.customer.customers;
export const customerToBeEdited = (state) => state.customer.newCustomer;

export default customerSlice.reducer;
