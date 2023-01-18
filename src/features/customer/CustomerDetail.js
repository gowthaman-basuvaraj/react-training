import { useGetCustomerQuery } from './customerAPI';
import { useDispatch } from 'react-redux';
import { editCustomer } from './customerSlice';
import React from 'react';
import PropTypes from 'prop-types';

export const CustomerDetail = ({ id }) => {
  const { data: customer = {} } = useGetCustomerQuery(id);
  const dispatch = useDispatch();
  const editThis = () => {
    dispatch(editCustomer(customer));
  };
  return <div className={'flex flex-col border-2 p-4 w-1/6'}>
    <div className='flex justify-between mb-2 border-b-2 pb-2'>
      <span>ID</span>
      <span className={'ml-8'}>{id}</span>
    </div>
    <div className='flex justify-between mb-2 border-b-2 pb-2'>
      <span>Name</span>
      <span className={'ml-8'}>{customer.name}</span>
    </div>
    <div className='flex justify-between mb-2 border-b-2 pb-2'>
      <span>Age</span>
      <span className={'ml-8'}>{customer.age}</span>
    </div>
    <div className='flex justify-between mb-2 border-b-2 pb-2'>
      <span>Address</span>
      <span className={'ml-8'}>{customer.address}</span>
    </div>
    <div className='flex justify-between mb-2 border-b-2 pb-2'>
      <span>Phone</span>
      <span className={'ml-8'}>{customer.phone}</span>
    </div>
    <div className='flex justify-between mb-2 border-b-2 pb-2'>
      <span>&nbsp;</span>
      <button className={'ml-8 btn info'} onClick={editThis}>Edit</button>
    </div>
  </div>;
};

CustomerDetail.propTypes = {
  id: PropTypes.any,
};