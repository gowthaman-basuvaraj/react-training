import React from 'react';
import './App.css';
import { Routes, Route, NavLink, BrowserRouter, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { doLoginAsync, logout, userName } from './features/auth/authSlice';
import PropTypes from 'prop-types';

const AuthContext = React.createContext(null);
const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <h1>React Router</h1>

        <Navigation />

        <Routes>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />

          <Route
            path="dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<NoMatch />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

const ProtectedRoute = ({ children }) => {
  const token = useSelector(userName);

  if (!token) {
    return <Navigate to="/home" replace />;
  }

  return children;
};
ProtectedRoute.propTypes = {
  children: PropTypes.any,
};

const AuthProvider = ({ children }) => {
  const token = useSelector(userName);

  const value = { token };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.any,
};

const Navigation = () => {
  const token = useSelector(userName);
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
const Home = () => {
  const dispatch = useDispatch();
  const onLogin = () => {
    dispatch(
      doLoginAsync({
        user: '',
        pass: '',
      }),
    );
  };
  return (
    <>
      <h2>Home (Public)</h2>

      <button type="button" onClick={onLogin}>
        Sign In
      </button>
    </>
  );
};
const Dashboard = () => {
  return <p>Dashboard</p>;
};
const NoMatch = () => {
  return <p>NoMatch</p>;
};
export default App;
