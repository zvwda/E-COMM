
import React, { useEffect, useState } from 'react';
import './ListProduct.css'
import cross_icon from "../assets/cross_icon.png"

const ListProduct = ()=>{

  const [allproducts , setallproducts] = useState([]);

  const fetchInfo = async ()=>{
    await fetch('http://localhost:4000/allProducts')
     .then((res)=>res.json()).then((data)=>{
      setallproducts(data)
    })
  }

  useEffect(()=>{
    fetchInfo();
  },[])

  const removeProduct = async(id)=>{
    await fetch('http://localhost:4000/removeproduct',{
      method:'POST', 
      headers:{
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
    body:JSON.stringify({id:id})
    })
    await fetchInfo();
  }



  return (
    <div className='ListProduct'>
       <h1>All Product List</h1> 
       <div className="listproductFormatMain">
        <p>Product</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
       </div>
       <div className="listproductsAllProducts">
        <hr />
        {allproducts.map((product , index)=>{
           return <> <div key={index} className="listproductFormatMain listProductFormat">
              <img src={product.image} className='ListProductImage'/>
              <p>{product.name}</p>
              <p>${product.old_price}</p>
              <p>${product.new_price}</p>
              <p>${product.category}</p>
              <img onClick={()=>{removeProduct(product.id)}} className='listProductRemove' src={cross_icon}/>
           </div>
           <hr />
           </>
        })}
        
       </div>
    </div>
  );
}

export default ListProduct;