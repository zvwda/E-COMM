import React from 'react' 
import './popular.css'
import { useState , useEffect } from "react";

import Item from '../items/item'

const Popular = ()=>{
      const [data_product , setnewcollection] = useState([]);
        useEffect(()=>{
            fetch('http://localhost:4000/popular')
            .then((response)=>response.json())
            .then((data)=>setnewcollection(data))
        },[])
    return (
        <div className="popular">
            <h1>POPULAR</h1>
            <hr />
            <div className="popular-items"> {/* Updated class name for better semantics */}
                {data_product.map((item, i) => (
                    <Item
                        key={i}
                        id={item.id}
                        name={item.name}
                        img={item.image}
                        new_price={item.new_price}
                        old_price={item.old_price}
                    />
                ))}
            </div>
        </div>
    );
};


export default Popular ;