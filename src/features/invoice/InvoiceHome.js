import React from 'react';
import { useGetInvoicesQuery } from './invoiceAPI';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamation } from '@fortawesome/free-solid-svg-icons';
import { InvoiceList } from './InvoiceList';
import { InvoiceForm } from './InvoiceForm';


export const InvoiceHome = () => {
  //3 components
  //1. customer count
  //2. customer list
  //3. customer create
  const { isLoading, isSuccess, isError } = useGetInvoicesQuery();


  return <div className={'border-2 flex flex-col mt-8 p-2'}>
    <h4 className={'my-4 text-3xl uppercase text-center'}>
      Invoices {isError && <span className={'text-red-600'}><FontAwesomeIcon icon={faExclamation} /></span>}
    </h4>
    {isLoading ? <p className={'text-indigo-600'}>Loading....</p> : (isSuccess ?
      <div className={'flex flex-row justify-around p-2'}>
        <InvoiceList></InvoiceList>
        <InvoiceForm></InvoiceForm>
      </div> : <p className={'text-red-600'}>Error !</p>)}

  </div>;
};
