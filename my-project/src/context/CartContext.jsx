/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState,useContext,createContext, useEffect } from "react";


const CartContext = createContext();
const CartProvider = ({children}) =>{
    const [cart,setCart] = useState([])

    useEffect(() => {
        let cartFromLS = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(cartFromLS);
    }, [])

    return(
        <CartContext.Provider value={[cart,setCart]}>
            {children}
        </CartContext.Provider>
    )   
}

const useCart = () => useContext(CartContext)

export {CartContext, CartProvider, useCart};
