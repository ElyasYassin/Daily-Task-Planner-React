import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom'; 
import { submitLogin } from '../actions/authActions';
import './LoginForm.css';

function Login() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await dispatch(submitLogin({username, password }))
      history.push('/tasks'); 
    } catch (err) {
      setError('Invalid username or password');
    }
  };

  const DirectToRegister = async (e) => {
    e.preventDefault();
    history.push('/signup'); 
  };

  return (
    <div className='wrapper'>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div className='input-box'>
          <input type="text" placeholder="Username" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className='input-box'>
          <input type="password" placeholder="Password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
          <button onClick={handleLogin} type="submit">Login</button>
        {error && <div>{error}</div>}
        <div className='register-link'>
          <p> If you don't have an account --  <a href="http://localhost:3000/signup">Register</a></p>
        </div>
      </form>
    </div>
  )
}

export default Login;