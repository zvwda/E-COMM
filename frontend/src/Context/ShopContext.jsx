import React ,  { createContext, useEffect, useState } from "react"
import item from "../Components/items/item";

export const ShopContext = createContext(null);


const getDefultCard = ()=> {
    let cart = { } ;
    for (let index = 0; index < 300+1; index++) {
        cart[index] = 0 ; 

    } 
    return cart; 
} 

const ShopContextProvider = (props) => {

    const [all_products , setall_products] = useState([])

    const [cart_Item , setCartItem] = useState(getDefultCard());  
  
    useEffect(()=>{
        fetch('http://localhost:4000/allProducts')
        .then((response)=>response.json())
        .then((data)=>setall_products(data))

        if(localStorage.getItem('auth-token')){
            console.log("zvwda wasl")
            fetch('http://localhost:4000/getcart',{
                method:"POST",
                headers:{
                    Accept:"application/form-data",
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                },
                body:"",
            }).then((response)=>response.json())
            .then((data)=>{
                setCartItem(data);
                console.log(data);
            });

        }
    },[])

    const AddToCart = (itemId)=> {
        setCartItem((prev)=> ({...prev,[itemId]:prev[itemId]+1}))
        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:4000/addtocart',{
                method:"POST",
                headers:{
                    Accept:"application/form-data",
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({"itemId":itemId})
            }).then((response)=>response.json())
            .then((data)=>console.log(data));
            
            
        }
    }
    
    const RemoveFromCart = (itemId)=> {
        setCartItem((prev)=> ({...prev,[itemId]:prev[itemId]-1}))
        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:4000/removetocart',{
                method:"POST",
                headers:{
                    Accept:"application/form-data",
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({"itemId":itemId})
            }).then((response)=>response.json)
            .then((data)=>console.log(data));
            
            
        }
    }
  
    const gettotalcartitems = () => {
        let totalItem =  0;
        for(const item in cart_Item){
            if(cart_Item[item]>0){
                totalItem += cart_Item[item]
            }
        }
        return totalItem;
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for(const item in cart_Item){
            if(cart_Item[item]>0){
                let itemInfo = all_products.find((product)=>product.id === Number(item));
                totalAmount += itemInfo.new_price * cart_Item[item];
            }
        }
        return totalAmount;
    }

    const contextValue = {gettotalcartitems, getTotalCartAmount , all_products  , cart_Item , AddToCart , RemoveFromCart};
   

    return(
        <ShopContext.Provider value={contextValue}>
           {props.children}
        </ShopContext.Provider> 
    )
}
export default ShopContextProvider;