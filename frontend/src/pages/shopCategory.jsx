import React, { use, useContext } from 'react' 
import './CSS/shopcategory.css'
import { ShopContext } from '../Context/ShopContext';
import Dropdown_icon from '../Components/Assets/dropdown_icon.png'
import Item from '../Components/items/item';

const ShopCategory = (props) => {
    const { all_products } = useContext(ShopContext);

    return(
        <div className='shop_category'>
            <img className='shopcategory-banner' src={props.banner} alt="banner"/>
            <div className="shopcategory-indexsort">
                <p>
                    <span>Showing 1-12</span> out of 36 products
                </p>
                <div className="shopcategorysort">
                    Sort by <img src={  Dropdown_icon} alt=""/>
                </div>
            </div>
            <div className="shopcategoryproducts">
                {all_products.map((item , i) => {
                    if(props.category == item.category){
                        return <Item
                        key={i}
                        id={item.id}
                        name={item.name}
                        img={item.image}
                        new_price={item.new_price}
                        old_price={item.old_price}
                        />
                    }
                    else{
                        return null;
                    }
                })}
            </div>
            <div className="shopctegory-loadmore">
                Explore More
            </div>
        </div>
    )
}

export default ShopCategory;