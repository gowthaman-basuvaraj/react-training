import { useAuth } from './AuthProvider';
import { useDispatch } from 'react-redux';
import { logout } from './features/auth/authSlice';
import { NavLink } from 'react-router-dom';
import React from 'react';

export const Navigation = () => {
  const { token } = useAuth();
  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch(logout());
  };
  return (
    <nav>
      <NavLink to="/home">Home</NavLink>
      <NavLink to="/dashboard">Dashboard</NavLink>
      {token && (
        <button type="button" onClick={onLogout}>
          Sign Out
        </button>
      )}
    </nav>
  );
};
