import { useDispatch } from 'react-redux';
import { doLoginAsync } from './features/auth/authSlice';
import React from 'react';

export const Home = () => {
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
      <h2>Welcome Home (Public)</h2>

      <button type="button" onClick={onLogin}>
        Sign In
      </button>
    </>
  );
};
