'use client'

import { useContext, useState, createContext, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({children}) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Verifica se o código está sendo executado no cliente
        if (typeof window !== 'undefined') {
            const storedUser = localStorage.getItem('usuario');
            if (storedUser != null) {
                setUser(JSON.parse(storedUser));
            }
        }
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;
