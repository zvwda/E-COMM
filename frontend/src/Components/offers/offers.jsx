import React from 'react' 
import './offers.css'
import exclucive_image from '../Assets/exclusive_image.png'

const offers = ()=>{
    return (
        <div className="offers">
          <div className="offers-left">
            <h1>Exclusive</h1>
            <h1>Offers for you</h1>
            <p>ONLY ON BEST SELLERS PRODUCTS</p>
            <button>Check Now</button>
          </div>
          <div className="offers-right">
            <img src={exclucive_image} alt="image" />
          </div>
        </div>
    );
};


export default offers ;