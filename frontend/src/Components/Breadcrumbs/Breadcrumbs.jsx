import React from 'react' 
import './Breadcrumbs.css'
import arrowIcon  from '../Assets/breadcrum_arrow.png'

const Breadcrumbs = (props)=>{
    const {product} = props;
   return(
        <div className='Breadcrum'>
            HOME <img src={arrowIcon}/>
            SHOP <img src={arrowIcon}/>
            {product.category} <img src={arrowIcon}/>
            {product.name} 
        </div>
    )
}

export default Breadcrumbs;