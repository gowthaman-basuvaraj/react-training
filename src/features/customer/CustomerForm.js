import { useDispatch, useSelector } from 'react-redux';
import { customerToBeEdited, makeNewCustomer, newCustomer } from './customerSlice';
import React, { useEffect, useState } from 'react';
import { useAddNewCustomerMutation, useUpdateCustomerMutation } from './customerAPI';

export const CustomerForm = () => {
  const customerToEdit = useSelector(customerToBeEdited);
  const dispatch = useDispatch();
  const [customer, setCustomer] = useState(makeNewCustomer());
  const [saveCustomerCall, { isLoading, isSuccess, isError }] = useAddNewCustomerMutation();
  const [updateCustomerCall] = useUpdateCustomerMutation();
  const setValue = (who, what) => {
    const newCustomer = Object.assign({}, customer);
    newCustomer[who] = what;
    setCustomer(newCustomer);
  };
  useEffect(() => {
    console.log(`CustomerSave isLoading = ${isLoading}, isSuccess = ${isSuccess}, isError = ${isError}`);
  }, [isLoading, isSuccess, isError]);

  useEffect(() => {
    console.log('editACustomer', customerToEdit);
    setCustomer({
      ...customerToEdit,
    });
  }, [customerToEdit]);

  const saveCustomer = () => {
    if (customer.name) {
      if (customer.id) {
        updateCustomerCall(customer, customer.id);
      } else {
        saveCustomerCall(customer);
      }
      dispatch(newCustomer());
    }
  };
  return <div className={'flex flex-col'}>
    <input value={customer.name || ''} onChange={e => setValue('name', e.target.value)} type={'text'}
           placeholder={'Name'}
           className={'mb-2 rounded-lg'} />
    <input value={customer.age || ''} onChange={e => setValue('age', e.target.value)} type={'number'}
           placeholder={'Age'}
           className={'mb-2 rounded-lg'} />
    <input value={customer.phone || ''} onChange={e => setValue('phone', e.target.value)} type={'tel'}
           placeholder={'Phone'}
           className={'mb-2 rounded-lg'} />
    <input value={customer.address || ''} onChange={e => setValue('address', e.target.value)} type={'text'}
           placeholder={'Address'}
           className={'mb-2 rounded-lg'} />

    <div className={'flex flex-row justify-end'} onClick={saveCustomer}>
      <button className={'btn success lg'}>
        Save
      </button>
    </div>
  </div>;
};