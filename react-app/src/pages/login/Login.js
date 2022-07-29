import React, { useContext, useRef } from 'react';
import './login.css';
import { loginCall } from '../../apiCalls';
import { AuthContext } from '../../context/AuthContext';
import { Alert, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const email = useRef();
  const password = useRef();
  const { isFetching, dispatch, error } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
  };

  return (
    <div className='login'>
      <div className='loginWrapper'>
        <div className='loginLeft'>
          <h3 className='loginLogo'>ChatApp</h3>
          <span className='loginDesc'>
            Log in by filling out the form, or create a new account
          </span>
        </div>
        <div className='loginRight'>
          <form className='loginBox' onSubmit={handleClick}>
            <input
              placeholder='Email'
              type='email'
              required
              className='loginInput'
              ref={email}
            />
            <input
              placeholder='Password'
              type='password'
              required
              minLength='6'
              className='loginInput'
              ref={password}
            />
            {error && <Alert severity='error'>{error.response.data}</Alert>}
            <button className='loginButton' type='submit' disabled={isFetching}>
              {isFetching ? <CircularProgress color='secondary' /> : 'Log In'}
            </button>
            <span className='loginForgot'>Forgot Password?</span>
            <button
              className='loginRegisterButton'
              onClick={() => navigate('/register')}
            >
              Create a New Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
