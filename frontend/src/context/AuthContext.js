"use client";
import { createContext, useContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const useAuthContext = () => {
    return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
    const [auth, setAuth] = useState(null);

    useEffect(() => {
        // Check if we are in the browser environment
        if (typeof window !== 'undefined') {
            const data = JSON.parse(localStorage.getItem('user-details'));
            setAuth(data || null);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};
