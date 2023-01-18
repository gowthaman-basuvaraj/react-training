import { useAuth } from './AuthProvider';
import { useDispatch } from 'react-redux';
import { logout } from './features/auth/authSlice';
import { NavLink, useNavigate } from 'react-router-dom';
import React from 'react';
import { useGetCustomersQuery } from './features/customer/customerAPI';

export const Navigation = () => {
  const { data = [] } = useGetCustomersQuery();

  const { token } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onLogout = () => {
    dispatch(logout());
  };
  const doLogin = () => {
    navigate('/login');
  };
  return (
    <nav className="container flex justify-between">
      <div className="flex flex-1">
        <NavLink to="/home" className="mr-2 nav-link">
          Home
        </NavLink>
        <NavLink to="/dashboard" className='nav-link'>Dashboard</NavLink>
        <NavLink to="/customers" className='nav-link'>Customers {token && (<span>({data.length})</span>)} </NavLink>
        <NavLink to="/invoices" className='nav-link'>Invoices </NavLink>
      </div>
      {token && (
        <button type="button" onClick={onLogout} className={'nav-link'}>
          Sign Out
        </button>
      )}
      {!token && (
        <button type="button" onClick={doLogin} className={'nav-link'}>
          Sign In
        </button>
      )}
    </nav>
  );
};
