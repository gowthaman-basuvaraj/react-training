import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';

function makeNewCustomer() {
  return {
    name: '',
    age: 0,
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
    editCustomer(state, action) {
      state.newCustomer = _.cloneDeep(action.payload);
      state.customerPopUp = true;
    },
    setCustomers(state, action) {
      state.customers = action.payload;
    },
  },
});

export const { editCustomer, setCustomers } = customerSlice.actions;
export const customers = (state) => state.customer.customers;

export default customerSlice.reducer;
