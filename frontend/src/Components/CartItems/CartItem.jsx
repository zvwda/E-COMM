import React, { useContext } from 'react' 
import './CartItem.css'
import { ShopContext } from '../../Context/ShopContext'
import remove_icon from '../Assets/cart_cross_icon.png'

const CartItem = ()=>{
    const {getTotalCartAmount ,all_products  , cart_Item ,RemoveFromCart} = useContext(ShopContext);

    return(
        <div className='CartItem'>
            <div className="formtMain">
                <p>Products</p>
                <p>Title</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Total</p>
                <p>Remove</p>
            </div>
            <hr />
            
            {all_products.map((e)=>{
                console.log(cart_Item[e.id])
                if(cart_Item[e.id]>0){
                    return <div>
                    <div className="format formtMain">
                        <img src={e.image } className='product-icon'/>
                        <p>{e.name}</p>
                        <p>${e.new_price}</p>
                        <button className='cartitems-quantity'>{cart_Item[e.id]}</button>
                        <p>${e.new_price*cart_Item[e.id]}</p>
                        <img className='cartitemremoveicon' src={remove_icon} onClick={()=>{RemoveFromCart(e.id)}} />
                    </div>
                    <hr />
                </div>
                }
                return null;
            })}
            <div className="cartitemdown">
                <div className="cartitemTotal">
                    <h1>cart Total</h1>
                    <div>
                        <div className='cartitemTotalItem'>
                            <p>Subtotal</p>
                            <p>${getTotalCartAmount()}</p>
                        </div>
                        <hr />
                        <div className="cartitemTotalItem">
                            <p>Shipping Fee</p>
                            <p>Free</p>
                        </div>
                        <hr />
                        <div className='cartitemTotalItem'>
                            <h3>Total</h3>
                            <h3>${getTotalCartAmount()}</h3>
                        </div>
                    </div>
                    <button>PROCEED TO CHECKOUT</button>
                </div>
                <div className="cartitemPromoCode">
                    <p>If you have a promo code, Enter it here</p>
                    <div className="cartitemPromocode">
                        <input type="text" placeholder='promo code' />
                        <button>Sunmit</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartItem;