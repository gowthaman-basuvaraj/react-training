import { useGetInvoicesQuery } from './invoiceAPI';
import { useGetCustomersQuery } from '../customer/customerAPI';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { editInvoice, newInvoice, setInvoices } from './invoiceSlice';
import { Rupee } from '../utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faSync } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

export const InvoiceList = () => {
  const { data: invoices = [], isSuccess: okInvoice, refetch: refreshInvoices, isFetching: isLoadingInvoices } = useGetInvoicesQuery();
  const { data: customers = [], isSuccess: okCustomer, refetch: refreshCustomers, isFetching: isLoadingCustomers } = useGetCustomersQuery();
  const [invoicesToDisplay, setInvoicesToDisplay] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {

    if (okInvoice) {
      dispatch(setInvoices(invoices));
    }
    if (okInvoice && okCustomer) {
      const transformedInvoices = invoices.map(i => {
        const customer = customers.find(c => c.id === +i.customerId);
        return {
          ...i,
          customer: customer?.name || '-NA-',
        };
      });

      setInvoicesToDisplay(transformedInvoices);
    }
    dispatch(newInvoice());
  }, [okInvoice, okCustomer, invoices]);

  const editThis = (i) => {
    dispatch(editInvoice(i));
  };

  return <div className={'flex flex-1 flex-col mr-16 px-4'}>
    <div className='flex  mb-4 border-b-2 pb-4'>
      <div className={'flex-1'}>
        <h2 className={'text-xl'}>
          Invoices List
        </h2>
      </div>
      <div>
        <button className={'mx-2 btn info'} onClick={refreshInvoices}>
          <FontAwesomeIcon icon={faSync} spin={isLoadingInvoices} />
          <span className={'ml-2'}>Refresh Invoices</span>
        </button>
        <button className={'mx-2 btn success'} onClick={refreshCustomers}>
          <FontAwesomeIcon icon={faSync} spin={isLoadingCustomers}/>
          <span className={'ml-2'}>Refresh Customers</span>
        </button>
      </div>
    </div>
    {invoicesToDisplay.length > 0 &&
      <table>
        <thead>

        <tr className={''}>
          <td className={'border-2 p-2 font-bold'}>Invoice No</td>
          <td className={'border-2 p-2 font-bold'}>Invoice Date</td>
          <td className={'border-2 p-2 font-bold'}>Invoice Value</td>
          <td className={'border-2 p-2 font-bold'}>Customer</td>
          <td className={'border-2 p-2 font-bold'}>&nbsp;</td>
        </tr>
        </thead>
        <tbody>
        {invoicesToDisplay.map(d => <tr key={d.id}>
          <td className={'border-2 p-2'}>{d.invoiceNo}</td>
          <td className={'border-2 p-2'}>{d.invoiceDate}</td>
          <td className={'border-2 p-2'}>
            <Rupee>{d.invoiceValue}</Rupee>
          </td>
          <td className={'border-2 p-2'}>
            <Link to={'/customers/detail/'+d.customerId} className={'link'}>
              {d.customer}
            </Link>
          </td>
          <td className={'border-2 p-2'}>
            <button className={'btn info'} onClick={() => editThis(d)}>
              <FontAwesomeIcon icon={faEdit} />
              <span className={'ml-2'}>Edit</span>
            </button>
          </td>

        </tr>)}
        </tbody>
      </table>

    }
  </div>;
};