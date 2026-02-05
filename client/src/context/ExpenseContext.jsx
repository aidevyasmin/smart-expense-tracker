import { createContext, useState, useEffect } from 'react';

export const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      const res = await fetch('/api/expenses');
      const data = await res.json();
      setExpenses(data);
    };
    fetchExpenses();
  }, []);

  const addExpense = async (expense) => {
    const res = await fetch('/api/expenses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(expense),
    });
    const data = await res.json();
    setExpenses([...expenses, data]);
  };

  return (
    <ExpenseContext.Provider value={{ expenses, addExpense }}>
      {children}
    </ExpenseContext.Provider>
  );
};
