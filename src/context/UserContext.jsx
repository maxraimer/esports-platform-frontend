import React, { createContext, useState, useEffect, useContext } from 'react';
import { getTokenExpiration, getUserDataFromToken, isTokenExpired } from '../scripts/token';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [tokenExpiry, setTokenExpiry] = useState(null);

    // Saving token, userData and token expiry
    const login = (token) => {
        const expiryTime = getTokenExpiration(token);
        const userData = getUserDataFromToken(token);
        setToken(token);
        setTokenExpiry(expiryTime);
        setUser(userData);

        localStorage.setItem('token', token);
        localStorage.setItem('tokenExpiry', expiryTime);
        localStorage.setItem('user', JSON.stringify(userData));
    }

    // Removing token, userData and token expiry
    const logout = () => {
        setToken(null);
        setTokenExpiry(null);
        setUser(null);

        localStorage.removeItem('token');
        localStorage.removeItem('tokenExpiry');
        localStorage.removeItem('user');
    }

    // Loading data at the app launch
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const storedExpiry = localStorage.getItem('tokenExpiry');
        const storedUser = JSON.parse(localStorage.getItem('user'));

        if (storedToken && !isTokenExpired(storedToken)) {
            setToken(storedToken);
            setUser(storedUser);
            setTokenExpiry(storedExpiry);
        } else {
            logout(); // Якщо токен невалідний або завершений
        }
    }, []);

    // Alerting about session expiration
    useEffect(() => {
        if (isTokenExpired(token)) {
            alert('Час сесії сплив, будь ласка, увійдіть знову.');
            logout();
        }
    }, [tokenExpiry]);

    return (
        <UserContext.Provider value={{ user, token, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};