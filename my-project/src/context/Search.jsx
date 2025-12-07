/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState,useContext,createContext } from "react";
 

const SearchContext = createContext();
const SearchProvider = ({children}) =>{
    const [auth,setAuth] = useState({
        keyword:"",
        results: [],
    })

    return(
        <SearchContext.Provider value={[auth,setAuth]}>
            {children}
        </SearchContext.Provider>
    )   
}

const useSearch = () => useContext(SearchContext)

export {SearchContext, SearchProvider, useSearch};
