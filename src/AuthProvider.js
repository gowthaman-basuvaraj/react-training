import { useSelector } from 'react-redux';
import { isLoggedIn, landingPage, userName } from './features/auth/authSlice';
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const AuthContext = React.createContext(null);
export const AuthProvider = ({ children }) => {
  const token = useSelector(userName);
  const loginStatus = useSelector(isLoggedIn);
  const navigate = useNavigate();
  const landingPageLoc = useSelector(landingPage);


  const value = { token };

  useEffect(() => {
    if (loginStatus) {
      navigate(landingPageLoc);
    }
  }, [loginStatus]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.any,
};

export const useAuth = () => {
  return React.useContext(AuthContext);
};
