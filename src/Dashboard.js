import React from 'react';
import { useGetCustomersQuery } from './features/customer/customerAPI';
import { Link } from 'react-router-dom';
import { useGetInvoicesQuery } from './features/invoice/invoiceAPI';

export const Dashboard = () => {
  const { data = [] } = useGetCustomersQuery();
  const { data: invoices = [] } = useGetInvoicesQuery();

  return <div className={'flex flex-col'}>
    <h2 className={'text-2xl mb-8'}>Dashboard</h2>
    <p className={'mb-2'}>Welcome to Dashboard</p>
    <Link to={'/customers'} className={'link'}>Number of Customers = {data.length}</Link>
    <Link to={'/invoices'} className={'link'}>Number of Invoices = {invoices.length}</Link>
  </div>;
};
