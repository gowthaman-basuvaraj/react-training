import { useAuth } from './AuthProvider';
import { useDispatch } from 'react-redux';
import { logout } from './features/auth/authSlice';
import { NavLink, useNavigate } from 'react-router-dom';
import React from 'react';

export const Navigation = () => {
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
        <NavLink to="/home" className="mr-2">
          Home
        </NavLink>
        <NavLink to="/dashboard">Dashboard</NavLink>
      </div>
      {token && (
        <button type="button" onClick={onLogout}>
          Sign Out
        </button>
      )}
      {token || (
        <button type="button" onClick={doLogin}>
          Sign In
        </button>
      )}
    </nav>
  );
};
