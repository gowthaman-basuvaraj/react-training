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
    <Link to={'/customers'} className={'nav-link mr-2'}>Customers Page</Link> :
    <div className={'mx-2'}>Login to See Link to Customer Page</div>;

  const invoices = token ?
    <Link to={'/invoices'} className={'nav-link ml-2'}>Invoices Page</Link> :
    <div className={'mx-2'}>Login to see Link for Invoice Page</div>;

  return (
    <>
      <h2 className={'text-2xl'}>Welcome Home {who}</h2>
      <div className='my-4'>
        {btn}
      </div>
      <div className='flex flex-row mt-4'>
        {customers}
        {invoices}
      </div>
    </>
  );
};
