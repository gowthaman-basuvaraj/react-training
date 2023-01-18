import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';

export const Home = () => {
  const navigation = useNavigate();
  const { token } = useAuth();

  const sendToLoginPage = () => {
    navigation('/login');
  };

  const who = token ? <span>{token}</span> : <span>Public</span>;
  const btn = token ? <></> : <button type='button'
                                      onClick={sendToLoginPage}
                                      className='btn info'>
    SignIn
  </button>;
  const customers = token ?
    <Link to={'/customers'} className={'link'}>Customers Page</Link> : <></>;
  return (
    <>
      <h2>Welcome Home {who}</h2>
      {btn}
      {customers}
    </>
  );
};
