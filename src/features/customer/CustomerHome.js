import React from 'react';
import { CustomerForm } from './CustomerForm';
import { CustomerList } from './CustomerList';
import { CustomerCount } from './CustomerCount';
import { useGetCustomersQuery } from './customerAPI';
import { CustomerDetail } from './CustomerDetail';
import { useParams } from 'react-router-dom';

export const CustomerHome = () => {
  //3 components
  //1. customer count
  //2. customer list
  //3. customer create
  const { data = [] } = useGetCustomersQuery();
  const {condition} = useParams()


  return <div className={'border-2 flex flex-col mt-8 p-2'}>
    <h4 className={'my-4 text-3xl uppercase text-center'}>
      Customers
    </h4>
    <div className={'flex flex-row justify-around p-2'}>
      <CustomerCount filter={condition || 'all'}></CustomerCount>
      <CustomerList filter={condition || 'all'}></CustomerList>
      <CustomerForm></CustomerForm>
    </div>
    <div className='flex flex-col mt-16 border-t-4 py-16'>
      <h4 className={'w-full mb-8 text-xl text-purple-500 text-center'}>Top 5 Customers</h4>
      <div className='flex justify-around'>
        {
          data.slice(0, 5).map(c => (<CustomerDetail key={c.id} id={c.id}></CustomerDetail>))
        }
      </div>
    </div>
  </div>;
};
