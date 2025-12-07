/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState,useContext,createContext, useEffect } from "react";


const FavouriteContext = createContext();
const FavouriteProvider = ({children}) =>{
    const [like,setLike] = useState([])

    useEffect(() => {
        let cartFromLS = JSON.parse(localStorage.getItem("likes")) || [];
        setLike(cartFromLS);
    }, [])

    return(
        <FavouriteContext.Provider value={[like,setLike]}>
            {children}
        </FavouriteContext.Provider>
    )   
}

const useLike = () => useContext(FavouriteContext)

export {FavouriteContext, FavouriteProvider, useLike};
