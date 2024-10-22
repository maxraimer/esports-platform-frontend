import React, { createContext, useState, useContext } from 'react';
import AlertModal from '../components/modals/AlertModal';

const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
    const [alert, setAlert] = useState({ show: false, text: '', type: '', id: '' });

    const showAlert = (text, type = 'info', id = 'globalAlert') => {
        setAlert({ show: true, text, type, id });
        
        // Автоматичне приховування через 3 секунди
        setTimeout(() => setAlert({ show: false, text: '', type: '', id: '' }), 5000);
    };

    return (
        <AlertContext.Provider value={{ showAlert }}>
            {children}
            {alert.show && (<AlertModal id={alert.id} type={alert.type} text={alert.text}/>)}
        </AlertContext.Provider>
    );
}

export const useAlert  = () => useContext(AlertContext);