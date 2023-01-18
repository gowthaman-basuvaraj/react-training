import { useAuth } from './AuthProvider';
import { useDispatch } from 'react-redux';
import { logout } from './features/auth/authSlice';
import { NavLink, useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useGetCustomersQuery } from './features/customer/customerAPI';
import { useSSE } from 'react-hooks-sse';
import { useGetInvoicesQuery } from './features/invoice/invoiceAPI';

export const Navigation = () => {
  const { data = [], refetch: refetchCustomers } = useGetCustomersQuery();
  const { refetch: refetchInvoices } = useGetInvoicesQuery();

  const { token } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onLogout = () => {
    dispatch(logout());
  };
  const doLogin = () => {
    navigate('/login');
  };

  const state = useSSE('updates', {});

  useEffect(() => {
    console.log('SSE Message', state)
    if (state.id === 'customers') {
      refetchCustomers();
    } else if (state.id === 'invoices') {
      refetchInvoices();
    }
  }, [state]);


  return (
    <nav className='container flex justify-between'>
      <div className='flex flex-1'>
        <NavLink to='/home' className='mr-2 nav-link'>
          Home
        </NavLink>
        <NavLink to='/dashboard' className='nav-link'>Dashboard</NavLink>
        <NavLink to='/customers' className='nav-link'>Customers {token && (<span>({data.length})</span>)} </NavLink>
        <NavLink to='/invoices' className='nav-link'>Invoices </NavLink>
      </div>
      {token && (
        <button type='button' onClick={onLogout} className={'nav-link'}>
          Sign Out
        </button>
      )}
      {!token && (
        <button type='button' onClick={doLogin} className={'nav-link'}>
          Sign In
        </button>
      )}
    </nav>
  );
};
