import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
export const AuthContext = createContext();

export const AuthProvider = ({ children, navigate }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);

    const login = (token, userInfo) => {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userInfo));
        setUser(userInfo);
        navigate('/');
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        
    };

    const getUserRole = () => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        return storedUser?.role;
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, getUserRole }}>
            {children}
        </AuthContext.Provider>
    );
};