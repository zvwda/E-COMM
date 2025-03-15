import React, { useContext } from 'react' 
import './ProductDisplay.css'
import star_icon from "../Assets/star_icon.png"
import star_dull_icon from "../Assets/star_dull_icon.png"
import { ShopContext } from '../../Context/ShopContext'

const ProductDisplay = (props)=>{
    const {product} = props;
    const {AddToCart} = useContext(ShopContext);
   return(
        <div className='ProductDisplay'>
             <div className="productdisplayleft">
                <div className="productdisplay-img-list">
                    <img src={product.image} alt=""/>
                    <img src={product.image} alt=""/>
                    <img src={product.image} alt=""/>
                    <img src={product.image} alt=""/>
                </div>
                <div className="productdisplay-img">
                    <img className='productdisplay-main-img' src={product.image} alt="" />
                </div>
             </div>
             <div className="productdisplayright">
                <h1>{product.name}</h1>
                <div className="productdisplay-right-star">
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_dull_icon} alt=""/>
                    <p>(122)</p>
                </div>
                <div className="productdisplay-right-prices">
                    <div className="productdisplay-right-price-old">
                        ${product.old_price}
                    </div>
                    <div className="productdisplay-right-price-new">
                        ${product.new_price}
                    </div>                    
                </div>
                <div className="productdisplay-right-description">
                A shirt is a garment for the upper part of the body usually
                 with a collar, sleeves, a front opening, and a tail long 
                 enough to be tucked inside pants or a skirt.
Copilot Answer


For up-to-the-mie pants or a skirt. A shirt can be made of different materials, colors, patterns, and styles. A shirt can also have a design or a message printed on it to express the wearer's personality or inspiration. A shirt is a versatile and comfortable piece 
of clothing that can be worn for various occasions.
                </div>
                <div className="size">
                    <h1>Select Size</h1>
                    <div className="sizes">
                        <div>S</div>
                        <div>M</div>
                        <div>L</div>
                        <div>XL</div>
                        <div>XXL</div>
                    </div>
                </div>
                <button onClick={()=> {
                    AddToCart(product.id)
                }}>ADD TO CART</button>
                <p className='category'>
                    <span>Category : </span>
                    Women , T-shirt
                </p>
                <p className='category'>
                    <span>Tags : </span>
                    Women , T-shirt
                </p>
             </div>
        </div> 
    )
}

export default ProductDisplay;