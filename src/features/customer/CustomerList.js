import { useDispatch } from 'react-redux';
import { useGetCustomersQuery } from './customerAPI';
import React from 'react';
import { editCustomer } from './customerSlice';
import classNames from 'classnames';
import { Rupee } from '../utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

export const CustomerList = () => {
  const dispatch = useDispatch();
  const { data = [] } = useGetCustomersQuery();

  const setEditForm = (f) => {
    dispatch(editCustomer(f));
  };

  return <div className={'flex flex-col items-center mx-4 px-4 flex-1 border-r-4 border-l-4 border-blue-500'}>
    <table className={'w-4/5 mx-4 sm:mx-16'}>
      <thead>
      <tr className=''>
        <th className={'p-2 border font-bold'}>Id</th>
        <th className={'p-2 border font-bold'}>Name</th>
        <th className={'p-2 border font-bold'}>Age</th>
        <th className={'p-2 border font-bold'}>Phone</th>
        <th className={'p-2 border font-bold'}>Address</th>
        <th className={'p-2 border font-bold'}>Order Value</th>
        <th className={'p-2 border font-bold'}>&nbsp;</th>
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
          'text-red-500': d.underAged,
        })}>
          {d.underAged && <span className={'text-red-600 mr-2'}><FontAwesomeIcon icon={faExclamationTriangle} /></span>}
          {d.age}
        </td>
        <td className={'p-2 border text-center'}>{d.phone}</td>
        <td className={'p-2 border text-center'}>{d.address}</td>
        <td className={'p-2 border text-center'}>
          <Rupee>{d.orderValue || 0}</Rupee>
        </td>
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