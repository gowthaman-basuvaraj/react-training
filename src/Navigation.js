import { useAuth } from './AuthProvider';
import { useDispatch } from 'react-redux';
import { logout } from './features/auth/authSlice';
import { NavLink, useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useGetCustomersQuery } from './features/customer/customerAPI';
import { useSSE } from 'react-hooks-sse';
import { useGetInvoicesQuery } from './features/invoice/invoiceAPI';

export const Navigation = () => {
  const { data = [], refetch: refetchCustomers, isError } = useGetCustomersQuery();
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
    console.log('SSE Message', state);
    if (state.id === 'customers') {
      refetchCustomers();
    } else if (state.id === 'invoices') {
      refetchInvoices();
    }
  }, [state]);


  return (
    <>
      <nav className='container-sm flex justify-between'>
        <div className='flex flex-1'>
          <NavLink to='/home' className='mr-2 nav-link'>
            React, Redux, RTK Query Example
          </NavLink>
          <NavLink to='/dashboard' className='nav-link'>Dashboard</NavLink>
          <NavLink to='/customers' className='nav-link'>Customers {token && (<span>({data.length})</span>)} </NavLink>
          <NavLink to='/invoices' className='nav-link'>Invoices </NavLink>
        </div>
        <div className={'flex justify-end'}>
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
        </div>
      </nav>
      <hr className={'my-4'} />
      <h1 className='text-3xl font-bold mb-4 text-center'>React, Redux, RTK Query</h1>

      {isError && token && <div className='my-4 text-white bg-red-500 p-4 rounded'>
        Unable to Fetch Customers, Have you Logged in Yet?
      </div>}
    </>
  );
};
