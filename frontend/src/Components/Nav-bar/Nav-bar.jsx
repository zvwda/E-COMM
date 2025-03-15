import React, { useContext, useRef, useState } from "react";
import 'C:\\Users\\hp10\\Desktop\\E-Comm\\frontend\\src\\Components\\Nav-bar\\Nav-bar.css'
import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'
import {BrowserRouter , Routes , Route , Link} from 'react-router-dom'
import { ShopContext } from "../../Context/ShopContext";
import nav_drobdown from '../Assets/nav_dropdown.png'

const Nav_bar = () => {

 const [menu , setMenu] = useState("shop")
 const {gettotalcartitems} = useContext(ShopContext); 
 const menuRef = useRef();

 const dropdown_toggle = (e)=> {
    menuRef.current.classList.toggle('navmenu-visible');
    e.target.classList.toggle('open')
 }

  return (
  <div className="navbar">
    <div className="nav_logo">
      <img src={logo} alt="logo"/>
      <p>SHOPPER</p>
     </div>    
     <img className="navdropdown" onClick={dropdown_toggle} src={nav_drobdown}/> 
    <ul ref={menuRef} className="nav-menu">
        <li onClick={()=>{setMenu("shop")}}> <Link to='/' style={{textDecoration : 'none', color : 'black'}}>shop</Link>  {menu ==="shop"?<hr/>:<></>}</li>
        <li onClick={()=>{setMenu("mens")}}> <Link to='/men' style={{textDecoration : 'none', color : 'black'}}>Men  </Link>   {menu ==="mens"?<hr/>:<></>}</li>
        <li onClick={()=>{setMenu("womens")}}> <Link to='/women' style={{textDecoration : 'none', color : 'black'}}>Women</Link>   {menu ==="womens"?<hr/>:<></>}</li>
        <li onClick={()=>{setMenu("kids")}}> <Link to='/kids' style={{textDecoration : 'none', color : 'black'}}>Kids</Link>   {menu ==="kids"?<hr/>:<></>}</li>   
    </ul>
    <div className="nav_login_cart"> 
    {localStorage.getItem('auth-token') ? (
    <button 
      onClick={() => {
        localStorage.removeItem('auth-token');
        window.location.replace('/');
      }}
    >
      Logout
    </button>    
  ) : (
    <Link to='/login'>
      <button>Login</button>
    </Link>
  )} 
    <Link to='/cart'><img src={cart_icon} alt="carticon" /> 
    </Link> 
        <div className="navcount">{gettotalcartitems()}</div> 
    </div>

  </div>
  )
}

export default Nav_bar;