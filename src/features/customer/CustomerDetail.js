import { useGetCustomerQuery } from './customerAPI';
import { useDispatch } from 'react-redux';
import { editCustomer } from './customerSlice';
import React from 'react';
import PropTypes from 'prop-types';
import { useGetInvoicesQuery } from '../invoice/invoiceAPI';
import { Rupee } from '../utils';
import classNames from 'classnames';
import { SimpleInvoiceDisplay } from './SimpleInvoiceDisplay';
import { AgeDisplay } from './AgeDisplay';

export const CustomerDetail = ({ id, canEdit = true, showInvoices = false }) => {
  const { data: customer = {} } = useGetCustomerQuery(id);
  const { data: invoices = [] } = useGetInvoicesQuery({ customerId: `${id}` });
  const dispatch = useDispatch();
  const editThis = () => {
    dispatch(editCustomer(customer));
  };
  const amount = invoices.map(i => +i.invoiceValue).reduce((a, b) => a + b, 0);
  const classes = classNames({
    'flex flex-col border-2 p-4': true,
    'w-1/6': !showInvoices,
    'w-full': showInvoices,
  });

  const invoiceList = invoices.map((i) => (<SimpleInvoiceDisplay key={i.id} invoice={i} />));
  return <div className={classes}>
    <div className='flex justify-between mb-2 border-b-2 pb-2'>
      <span>ID</span>
      <span className={'ml-8 font-bold'}>{id}</span>
    </div>
    <div className='flex justify-between mb-2 border-b-2 pb-2'>
      <span>Name</span>
      <span className={'ml-8 font-bold'}>{customer.name}</span>
    </div>
    <div className='flex justify-between mb-2 border-b-2 pb-2'>
      <span>Age</span>
      <span className={'ml-8 font-bold'}>
        <AgeDisplay age={customer.age} underAged={customer.underAged} />
      </span>
    </div>
    <div className='flex justify-between mb-2 border-b-2 pb-2'>
      <span>Address</span>
      <span className={'ml-8 font-bold'}>{customer.address}</span>
    </div>
    <div className='flex justify-between mb-2 border-b-2 pb-2'>
      <span>Phone</span>
      <span className={'ml-8 font-bold'}>{customer.phone}</span>
    </div>
    <div className='flex justify-between mb-2 border-b-2 pb-2'>
      <span>Invoices Amount</span>
      <span className={'ml-8 font-bold'}><Rupee>
        {amount}
      </Rupee></span>
    </div>
    {canEdit && <div className='flex justify-between mb-2 border-b-2 pb-2'>
      <span>&nbsp;</span>
      <button className={'ml-8 btn info'} onClick={editThis}>Edit</button>
    </div>
    }
    {showInvoices && <div className={'flex flex-row'}>
      <div className={'flex justify-center items-center'}>
        <h4>Invoices</h4>
      </div>
      {invoiceList}
    </div>}
  </div>;
};

CustomerDetail.propTypes = {
  id: PropTypes.any,
  canEdit: PropTypes.bool,
  showInvoices: PropTypes.bool,
};