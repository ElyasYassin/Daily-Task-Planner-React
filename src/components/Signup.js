// Importing necessary modules from React and Redux
import React, { useState } from 'react';
import { useDispatch } from 'react-redux'; // For dispatching actions
import { submitRegister } from '../actions/authActions'; // Action creator for registering
import { useHistory } from 'react-router-dom'; // For navigating between routes
import './LoginForm.css';

// Functional component for the Signup form
function Signup() {
  // Hooks for managing state and actions
  const dispatch = useDispatch(); // Accessing dispatch function
  const history = useHistory(); // Accessing history object for navigation
  const [username, setUsername] = useState(''); // State for username input
  const [password, setPassword] = useState(''); // State for password input
  const [error, setError] = useState(''); // State for error message

  // Function to handle registration submission
  const handleRegister = async (e) => {
    e.preventDefault(); // Prevents default form submission behavior
    try {
      await dispatch(submitRegister({ username, password })); // Dispatches register action
      history.push('/tasks'); // Redirects to tasks page upon successful registration
    } catch (err) {
        setError('error'); // Sets error message if registration fails
    }
  };

  const DirectToLogin = async (e) => {
    e.preventDefault(); // Prevents default form submission behavior
    history.push('/login'); // Redirects to tasks page upon successful registration
  };

  return (
    <div className='wrapper'>
      <h1>Signup</h1>
      <form onSubmit={handleRegister}> {/* Form submission triggers handleRegister function */}
      <div className='input-box'>
          <input type="text"  placeholder="Username" id="username" value={username} onChange={(e) => setUsername(e.target.value)} /> {/* Input field for username */}
        </div>
        <div className='input-box'>
          <input type="password" placeholder="Password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} /> {/* Input field for password */}
        </div>
        <button onClick={handleRegister} type="submit">Register</button> {/* Button to submit registration */}
      </form>
      <div className='register-link'>
      <p> If you have an account ->  <a href="http://localhost:3000/login">Login</a></p>
        </div>
    </div>
  )
}

export default Signup; // Exports Signup component