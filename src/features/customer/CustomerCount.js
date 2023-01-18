import { useGetCustomersQuery } from './customerAPI';
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const CustomerCount = ({filter}) => {
  const { data: customers = [] } = useGetCustomersQuery();

  const withOutPhones = customers.filter(c => !c.phone).length;
  const underAged = customers.filter(c => c['age'] && +c['age'] < 18).length;


  return <div className={'flex flex-col pr-4'}>
    <h2 className={'text-xl mb-4'}>Statistics</h2>

    <Link to={'/customers/all'} className={classNames({
      'flex justify-between items-center mb-4 p-2 rounded': true,
      'bg-indigo-200': filter === 'all'
    })}>
      <span>Total </span>
      <span className={'count'}>{customers.length}</span>
    </Link>
    <Link to={'/customers/no-phones'} className={classNames({
      'flex justify-between items-center mb-4 p-2 rounded': true,
      'bg-indigo-200': filter === 'no-phones'
    })}>
      <span>WithOut phones</span>
      <span className={'ml-16 count'}>{withOutPhones}</span>
    </Link>
    <Link to={'/customers/under-aged'} className={classNames({
      'flex justify-between items-center mb-4 p-2 rounded': true,
      'bg-indigo-200': filter === 'under-aged'
    })}>
      <span>Under Aged</span>
      <span className={'ml-16 count'}>{underAged}</span>
    </Link>
  </div>;
};

CustomerCount.propTypes = {
  filter: PropTypes.any
}