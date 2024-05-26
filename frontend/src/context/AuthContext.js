"use client"
import {createContext, useContext, useState} from 'react';

// eslint-disable-next-line react/prop-types
export const AuthContext = createContext();
// eslint-disable-next-line react-refresh/only-export-components
export  const useAuthContext =()=>{
    return useContext(AuthContext)
}




export const AuthContextProvider = ({ children }) => {
    const [auth, setAuth] = useState(JSON.parse(localStorage.getItem('jwtToken') )|| null);
 
 return <AuthContext.Provider value={{auth,setAuth }}>
        {children}
    </AuthContext.Provider>;
}