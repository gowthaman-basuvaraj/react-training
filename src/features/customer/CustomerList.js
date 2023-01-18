import { useDispatch } from 'react-redux';
import { useGetCustomersQuery } from './customerAPI';
import React from 'react';
import { editCustomer } from './customerSlice';
import classNames from 'classnames';

export const CustomerList = () => {
  const dispatch = useDispatch();
  const { data = [] } = useGetCustomersQuery();

  const setEditForm = (f) => {
    dispatch(editCustomer(f));
  };
  return <div className={'flex flex-col items-center mx-8 pr-4 flex-1 border-r-4 border-l-4 border-blue-500'}>
    <table className={'sm:w-4/5 w-full'}>
      <thead>
      <tr className=''>
        <th className={'p-2 border'}>Id</th>
        <th className={'p-2 border'}>Name</th>
        <th className={'p-2 border'}>Age</th>
        <th className={'p-2 border'}>Phone</th>
        <th className={'p-2 border'}>Address</th>
        <th className={'p-2 border'}>&nbsp;</th>
      </tr>
      </thead>
      <tbody>
      {data.map(d => <tr key={d.id}>
        <td className={'p-2 border text-center'}>{d.id}</td>
        <td className={'p-2 border text-center'}>{d.name}</td>
        <td className={classNames({
          'p-2': true,
          border: true,
          'text-center': true,
          'text-red-500': d.age && +d.age < 18,
        })}>{d.age}</td>
        <td className={'p-2 border text-center'}>{d.phone}</td>
        <td className={'p-2 border text-center'}>{d.address}</td>
        <td className={'p-2 border text-center'}>
          <button className={'btn info'} onClick={() => setEditForm(d)}>
            Edit
          </button>
        </td>
      </tr>)}
      </tbody>
    </table>
  </div>;
};