import React, { useEffect, useState } from 'react' 
import './NewCollections.css'
import Item from '../items/item'

const NewCollections = ()=>{
    const [new_collection , setnewcollection] = useState([]);
    useEffect(()=>{
        fetch('http://localhost:4000/popular')
        .then((response)=>response.json())
        .then((data)=>setnewcollection(data))
    },[])
    return(
        <div className='newcollections'>
            <h1>NEW COLLECTIONS</h1>
            <hr />
            <div className="colletions">
                {new_collection.map((item,i)=> {
                   return <Item
                    key={i}
                    id={item.id}
                    name={item.name}
                    img={item.image}
                    new_price={item.new_price}
                    old_price={item.old_price}
                />

                })}
            </div>
        </div>
    )
}

export default NewCollections;