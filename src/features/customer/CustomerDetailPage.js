import React from 'react';
import { useParams } from 'react-router-dom';
import { CustomerDetail } from './CustomerDetail';

export function CustomerDetailPage() {
  const {id} = useParams()
  return <CustomerDetail id={id} canEdit={false} showInvoices={true}></CustomerDetail>
}
