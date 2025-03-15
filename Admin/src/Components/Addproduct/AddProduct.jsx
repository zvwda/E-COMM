import React, { useState } from 'react';
import './AddProduct.css'
import upload_area from "../assets/upload_area.svg"

const AddProduct = ()=>{
    const[image , setimage] = useState(false);
    const [productDetailes , setProductDetails] = useState({
        name:"",
        image:"",
        category:"women",
        new_price:"",
        old_price:""
    })
    const changeHandler  = (e)=>{
        setProductDetails({
            ...productDetailes,[e.target.name]:e.target.value
        })
    }
    const imageHndler = (e)=> {
            setimage(e.target.files[0]);
    }

    const Add_product =async()=>{
        console.log(productDetailes);
        let resData; 
        let Product = productDetailes;

        let formData = new FormData();
        formData.append('product' , image);

        await fetch('http://localhost:4000/upload',{
            method:'POST',
            headers:{
                Accept:'application/json', 
            },
            body: formData, 
        }).then((resp) => resp.json()).then((data)=>{resData=data});
        if(resData.success){
            Product.image = resData.image_url;
            console.log(Product);
            await fetch('http://localhost:4000/addproduct' , {
                method: 'POST',
                headers:{
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(Product),                
            }).then((resp)=>
                resp.json()).then((data)=>{
                    data.success?alert("Product Added"):
                    alert("Failed")
                })
        }


    }



  return (
    <div className='AddProduct'>
       <div className="Addproductitemfilds">
        <p>Product title</p>
        <input value={productDetailes.name} onChange={changeHandler} type="text" name='name' placeholder='type here' />
       </div>
       <div className="price">
        <div className="Addproductitemfilds">
            <p>Price</p>
            <input value={productDetailes.old_price} onChange={changeHandler} type="text" name='old_price' placeholder='type here' />
        </div>
        <div className="Addproductitemfilds">
            <p>Offer Price</p>
            <input value={productDetailes.new_price} onChange={changeHandler} type="text" name='new_price' placeholder='type here' />
        </div>
       </div>
       <div className="Addproductitemfilds">
        <p>Product Category</p>
        <select value={productDetailes.category} onChange={changeHandler} name="category" className='addproductselector'>
            <option value="women">Women</option>
            <option value="men">Men</option>
            <option value="kid">kid</option>
        </select>
       </div>
       <div className="Addproductitemfilds">
          <label htmlFor="file-input">
            <img src={image?URL.createObjectURL(image):upload_area} className='addproduct_thumnailimg'/>
          </label>
          <input onChange={imageHndler} type="file" name='image' id='file-input'  hidden/>
       </div> 
       <button onClick={()=>{Add_product()}} className='addproduct-btn'>ADD</button>

    </div>
  );
}

export default AddProduct;