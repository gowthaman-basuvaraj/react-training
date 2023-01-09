import { useSelector } from 'react-redux';
import { userName } from './features/auth/authSlice';
import { Navigate } from 'react-router-dom';
import React from 'react';
import PropTypes from 'prop-types';

export const ProtectedRoute = ({ children }) => {
  const token = useSelector(userName);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.any,
};
