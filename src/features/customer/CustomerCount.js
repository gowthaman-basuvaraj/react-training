import { useGetCustomersQuery } from './customerAPI';
import React from 'react';

export const CustomerCount = () => {
  const { data: customers = [] } = useGetCustomersQuery();

  const withOutPhones = customers.filter(c => !c.phone).length;
  const underAged = customers.filter(c => c['age'] && +c['age'] < 18).length;
  return <div className={'flex flex-col pr-4'}>
    <div className={'flex justify-between items-center mb-4'}>
      <span>Total </span>
      <span className={'count'}>{customers.length}</span>
    </div>
    <div className={'flex justify-between items-center mb-4'}>
      <span>WithOut phones</span>
      <span className={'ml-16 count'}>{withOutPhones}</span>
    </div>
    <div className={'flex justify-between items-center mb-4'}>
      <span>Under Aged</span>
      <span className={'ml-16 count'}>{underAged}</span>
    </div>
  </div>;
};