import React, { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const UserIdContext = createContext();

export const UserIdProvider = ({ children }) => {
  const [userId, setUserId] = useState(localStorage.getItem('user_id') || '');

  useEffect(() => {
    console.log('UserIdProvider: useEffect');
    try {
      let currentUserId = localStorage.getItem('user_id');
      if (!currentUserId) {
        const newUserId = uuidv4();
        localStorage.setItem('user_id', newUserId);
        setUserId(newUserId);
        console.log('Neue UserId gesetzt:', newUserId);
      } else {
        setUserId(currentUserId);
      }
    } catch (error) {
      console.error('Fehler beim Zugriff auf Local Storage:', error);
    }
  }, []);
  

  return (
    <UserIdContext.Provider value={userId}>
      {children}
    </UserIdContext.Provider>
  );
};

export const useUserId = () => useContext(UserIdContext);
