import React from 'react';
import { Link } from 'react-router-dom';
import './nav.css'; // Import your CSS file
import { useSelector, useDispatch } from 'react-redux'; // Import useSelector and useDispatch
import { logoutUser } from '../actions/authActions'; // Import logoutUser action creator
import { CgProfile } from "react-icons/cg";

const Nav = () => {
  const username = useSelector(state => state.auth.username);
  const dispatch = useDispatch(); // Get the dispatch function

  const handleLogout = () => {
    dispatch(logoutUser()); // Dispatch the logoutUser action
  };

  return (
    <nav>
      <ul>
        <li>
          <Link to="/Profile"><CgProfile className='icon'/> </Link>
        </li>
        <li>
          <Link to="/Login" onClick={handleLogout} classname="signout" >SignOut from {username}</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
