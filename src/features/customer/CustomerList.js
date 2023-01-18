import { useDispatch } from 'react-redux';
import { useGetCustomersQuery } from './customerAPI';
import React from 'react';
import { editCustomer } from './customerSlice';
import { Rupee } from '../utils';
import { AgeDisplay } from './AgeDisplay';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync, faTimes } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export const CustomerList = ({ filter }) => {
  const dispatch = useDispatch();
  const { data = [], refetch, isFetching } = useGetCustomersQuery();


  let filteredCustomers;
  if (filter === 'all') {
    filteredCustomers = data;
  } else {
    if (filter === 'no-phones') {
      filteredCustomers = data.filter(d => !d.phone);
    } else {
      filteredCustomers = data.filter(d => d.underAged);
    }
  }
  const setEditForm = (f) => {
    dispatch(editCustomer(f));
  };

  return <div className={'flex flex-col items-center mx-4 px-4 flex-1 border-r-4 border-l-4 border-blue-500'}>
    <div className='flex  mb-4 border-b-2 pb-4 w-full'>
      <div className={'flex-1 flex-row'}>
        <span className={'text-xl mr-8'}>
          Customers List
        </span>

        {filter === 'no-phones' && <Link class={'bg-red-100 text-red-500 p-2 hover:border-red-700 hover:border-2'} to={'/customers'}>
          <FontAwesomeIcon icon={faTimes} />
          <span className={'ml-2'}>NoPhones</span>
        </Link>}
        {filter === 'under-aged' && <Link class={'bg-red-100 text-red-500 p-2 hover:border-red-700 hover:border-2'} to={'/customers'}>
          <FontAwesomeIcon icon={faTimes} />
          <span className={'ml-2'}>UnderAged</span>
        </Link>}
      </div>

      <div>
        <button className={'mx-2 btn success'} onClick={refetch}>
          <FontAwesomeIcon icon={faSync} spin={isFetching} />
          <span className={'ml-2'}>Refresh</span>
        </button>
      </div>
    </div>
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
      {filteredCustomers.map(d => <tr key={d.id}>
        <td className={'p-2 border text-center'}>{d.id}</td>
        <td className={'p-2 border text-center'}>{d.name}</td>
        <td className={'p-2 border text-center'}>
          <AgeDisplay age={d.age} underAged={d.underAged} />
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
CustomerList.propTypes = {
  filter: PropTypes.any,
};