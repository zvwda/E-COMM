import React, { useContext } from 'react' 
import { ShopContext } from '../Context/ShopContext';
import { useParams } from 'react-router-dom';
import Breadcrumbs from '../Components/Breadcrumbs/Breadcrumbs';
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay';
import DiscribtionBox from '../Components/discribtionBox/discriptionBox';
import RelatedProducts from '../Components/RelatedProducts/RelatedProducts';

const Product = ()=>{
    const { all_products } = useContext(ShopContext);
    const {productId} =  useParams();
    const product = all_products.find((e)=> e.id == Number(productId));

   return(
        <div>
             <Breadcrumbs product = {product}> </Breadcrumbs>  
             <ProductDisplay product = {product}> </ProductDisplay>
             <DiscribtionBox/>
             <RelatedProducts>  </RelatedProducts>  
        </div>
    )
}

export default Product;