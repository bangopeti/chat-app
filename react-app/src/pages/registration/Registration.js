import axios from 'axios';
import { useRef, useState } from 'react';
import './registration.css';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [passwordError, setPasswordError] = useState(false);
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        await axios.post('/auth/register', user);
        navigate('/login');
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className='login'>
      <div className='loginWrapper'>
        <div className='loginLeft'>
          <h3 className='loginLogo'>ChatApp</h3>
          <span className='loginDesc'>Register by filling out the form</span>
        </div>
        <div className='loginRight'>
          <form className='loginBox' onSubmit={handleClick}>
            <input
              placeholder='Username'
              required
              ref={username}
              className='loginInput'
            />
            <input
              placeholder='Email'
              required
              ref={email}
              className='loginInput'
              type='email'
            />
            <input
              placeholder='Password'
              required
              ref={password}
              className='loginInput'
              type='password'
              minLength='6'
            />
            <input
              placeholder='Password Again'
              required
              ref={passwordAgain}
              className='loginInput'
              type='password'
            />
            {passwordError && <p>Passwords don't match!</p>}
            <button className='loginButton' type='submit'>
              Sign Up
            </button>
            <button
              className='loginRegisterButton'
              onClick={() => navigate('/login')}
            >
              Log into account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
