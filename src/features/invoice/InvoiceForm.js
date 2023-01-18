import { useGetCustomersQuery } from '../customer/customerAPI';
import { useDispatch, useSelector } from 'react-redux';
import { invoiceToBeEdited, makeNewInvoice, newInvoice } from './invoiceSlice';
import React, { useEffect, useState } from 'react';
import { useAddNewInvoiceMutation, useGetInvoicesQuery, useUpdateInvoiceMutation } from './invoiceAPI';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faTimes } from '@fortawesome/free-solid-svg-icons';

export const InvoiceForm = () => {
  const { data: customers = [] } = useGetCustomersQuery();
  const invoiceToEdit = useSelector(invoiceToBeEdited);

  const [invoice, setInvoice] = useState(makeNewInvoice());
  const { data: invoices = [], isSuccess: okInvoice } = useGetInvoicesQuery();
  const [saveInvoiceCall, { isLoading, isSuccess, isError }] = useAddNewInvoiceMutation();
  const [updateInvoiceCall] = useUpdateInvoiceMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(`InvoiceSave isLoading = ${isLoading}, isSuccess = ${isSuccess}, isError = ${isError}`);
  }, [isLoading, isSuccess, isError]);

  useEffect(() => {
    console.log('editAnInvoice', invoiceToEdit);
    setInvoice({
      ...invoiceToEdit,
    });
  }, [invoiceToEdit]);
  useEffect(() => {
    console.log('invoice list is loaded, lets make a new invoice with next number', invoices.length + 1);
    setInvoice(makeNewInvoice(invoices.length + 1));
  }, [okInvoice]);

  const setValue = (who, what) => {
    const newInvoice = Object.assign({}, invoice);
    newInvoice[who] = what;
    setInvoice(newInvoice);
  };
  const cancelThisInvoice = () => {
    dispatch(newInvoice());
  };
  const saveThisInvoice = () => {
    if (invoice.invoiceNo && invoice.invoiceDate && invoice.invoiceValue && invoice.customerId) {
      if (invoice.id) {
        updateInvoiceCall(invoice);
      } else {
        saveInvoiceCall(invoice);
      }
      dispatch(newInvoice());

    } else {
      console.log('something a miss?', invoice);
    }
  };

  let invoiceNumberCls = classNames({
    'mb-2 rounded-lg': true,
    'bg-gray-200': invoice.id,
  });

  return <div className={'flex flex-col'}>
    <h2 className={'text-xl mb-4'}>New Invoice</h2>
    <input className={invoiceNumberCls}
           disabled={invoice.id}
           onChange={(e) => setValue('invoiceNo', e.target.value)}
           type={'text'}
           placeholder={'Invoice No'}
           value={invoice.invoiceNo} />
    <input className={'mb-2 rounded-lg'} type={'date'}
           onChange={(e) => setValue('invoiceDate', e.target.value)}
           placeholder={'Invoice Date'} value={invoice.invoiceDate} />
    <select className={'mb-2 rounded-lg'}
            onChange={(e) => setValue('customerId', e.target.value)}
            value={invoice.customerId}>
      <option>Select a Customer</option>
      {customers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
    </select>
    <input className={'mb-2 rounded-lg'} type={'number'}
           onChange={(e) => setValue('invoiceValue', e.target.value)}
           placeholder={'Invoice Amount'} value={invoice.invoiceValue} />

    <div className='flex justify-end mt-4'>
      <button className={'btn success mx-2 rounded-xl'} onClick={saveThisInvoice}>
        <FontAwesomeIcon icon={faSave} />
        <span className={'ml-2'}>Save Invoice</span>
      </button>

      <button className={'btn info mx-2 rounded-xl'} onClick={cancelThisInvoice}>
        <FontAwesomeIcon icon={faTimes} />
        <span className={'ml-2'}>Cancel</span>
      </button>

    </div>
  </div>;
};