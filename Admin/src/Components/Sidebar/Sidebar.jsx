import React from 'react';
import './Sidebar.css'
import {Link} from "react-router-dom";
import addproductitem from "../assets/Product_Cart.svg"
import listproductitem from "../assets/Product_list_icon.svg"


const Sidebar = ()=>{
  return (
    <div className='Sidebar'>
       <Link to={"/addproduct"} style={{textDecoration:"nonr"}}>
            <div className="sidebarItem">
                <img src={addproductitem} />
                <p>Add Product</p>
            </div>
       </Link> 
       <Link to={"/listproduct"} style={{textDecoration:"nonr"}}>
            <div className="sidebarItem">
                <img src={listproductitem} />
                <p>Product List </p>
            </div>
       </Link> 
    </div>
  );
}

export default Sidebar;