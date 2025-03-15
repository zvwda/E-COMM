import React from 'react';
import './NavBar.css'
import navlogo from '../assets/nav-logo.svg';
import navProfile from '../assets/nav-profile.svg';

const NavBar = ()=>{
  return (
    <div className='NavBar'>
       <img src={navlogo} className='navlogo  '/>
       <img src={navProfile} className='navprofile' />
    </div>
  );
}

export default NavBar;