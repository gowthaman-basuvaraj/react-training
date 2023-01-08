import { useSelector } from 'react-redux';
import { userName } from './features/auth/authSlice';
import React from 'react';
import PropTypes from 'prop-types';

const AuthContext = React.createContext(null);
export const AuthProvider = ({ children }) => {
  const token = useSelector(userName);

  const value = { token };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.any,
};

export const useAuth = () => {
  return React.useContext(AuthContext);
};
