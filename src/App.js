// CounterApp.js
import React, { useState, useEffect } from 'react';
import { UserIdProvider, useUserId } from './UserIdContext';
import { incrementCounter, decrementCounter, resetCounter, getCounter } from './api';


const Counter = () => {
  const userId = useUserId();
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    fetchCounter();
  }, [userId]);

  const fetchCounter = async () => {
    try {
      const response = await getCounter(userId);
      setCounter(response.data.counter);
    } catch (error) {
      console.error('Fehler beim Abrufen des Zählerstands:', error);
    }
  };

  const handleIncrement = async () => {
    await incrementCounter(userId);
    fetchCounter();
  };

  const handleDecrement = async () => {
    await decrementCounter(userId);
    fetchCounter();
  };

  const handleReset = async () => {
    await resetCounter(userId);
    fetchCounter();
  };

  return (
    <div className="counter-container">
      <h2>Zähler: {counter}</h2>
      <div className="buttons-container">
        <button onClick={handleIncrement}>Inkrementieren</button>
        <button onClick={handleDecrement}>Dekrementieren</button>
        <button onClick={handleReset}>Zurücksetzen</button>
      </div>
    </div>
  );
};

const CounterApp = () => {
  return (
    <UserIdProvider>
      <Counter />
    </UserIdProvider>
  );
};

export default CounterApp;
