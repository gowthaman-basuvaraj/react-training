import { useDispatch, useSelector } from 'react-redux';
import { setLandingPage, userName } from './features/auth/authSlice';
import { Navigate, useLocation } from 'react-router-dom';
import React from 'react';
import PropTypes from 'prop-types';

export const ProtectedRoute = ({ children }) => {
  const token = useSelector(userName);
  const dispatch = useDispatch()
  const location = useLocation()

  if (!token) {
    console.log('current path', location.pathname)
    dispatch(setLandingPage(location.pathname))
    return <Navigate to="/login" replace />;
  }

  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.any,
};
