import React, { useEffect, useState } from 'react';
import { creationError, doLoginAsync, doUserCreationAsync, isLoggedIn, loginError, userCreated } from './authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const Login = () => {

  const isDev = process.env.NODE_ENV === 'development'
  const dispatch = useDispatch()
  const loginStatus = useSelector(isLoggedIn);
  const userCreationStatus = useSelector(userCreated);
  const loginErrorMsg = useSelector(loginError);
  const userCreationErrMsg = useSelector(creationError);

  const navigate = useNavigate();
  const [errMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    if (loginStatus) {
      navigate('/');
    }
  }, [loginStatus]);

  useEffect(() => {
    if (userCreationStatus) {
      alert('user created, now Login');
    }
  }, [userCreationStatus]);

  useEffect(() => {
    if (loginErrorMsg)
      setErrorMsg(loginErrorMsg);
  }, [loginErrorMsg]);

  useEffect(() => {
    if (userCreationErrMsg)
      setErrorMsg(userCreationErrMsg);
  }, [userCreationErrMsg]);

  const [account, setAccount] = useState({
    user: isDev ? 'gowthaman.b' : '',
    pass: isDev ? 'password': '',
  });
  const setValue = (who, what) => {
    let newAccount = Object.assign({}, account);
    newAccount[who] = what;
    setAccount(newAccount);
  };

  const createAccount = () => {
    if (account.user && account.pass) {
      dispatch(doUserCreationAsync(account))
    }
  };
  const loginToAccount = () => {
    if (account.user && account.pass) {
      dispatch(doLoginAsync(account))
    }
  };

  return <div className='w-full sm:w-1/3 mx-auto p-4 mt-8'>
    <h2 className={'text-2xl mb-4'}>Login or Create Account</h2>

    <div className='flex flex-col'>

      <input
        onChange={e => setValue('user', e.target.value)}
        value={account.user}
        type={'text'} className={'rounded-lg mb-4'} placeholder={'user name'} />

      <input
        onChange={e => setValue('pass', e.target.value)}
        value={account.pass}
        type={'password'} className={'rounded-lg mb-4'} placeholder={'password'} />


      {errMsg && <div className='my-4 p-4 text-red-700 bg-red-100'>
        {errMsg}
      </div>}

      <div className='flex'>

        <button className={'btn primary lg'} onClick={loginToAccount}>
          Login
        </button>

        <button className={'btn info ml-2 lg'} onClick={createAccount}>
          Create Account
        </button>

      </div>
    </div>

  </div>;
};
