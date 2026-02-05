import { useContext, useState, useMemo } from 'react';
import { ExpenseContext } from './context/ExpenseContext.jsx';

function App() {
  const { expenses, addExpense } = useContext(ExpenseContext);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description || !amount || !category) return;
    const newExpense = {
      id: expenses.length + 1,
      description,
      amount: parseFloat(amount),
      category,
    };
    addExpense(newExpense);
    setDescription('');
    setAmount('');
    setCategory('');
  };

  const spendingReport = useMemo(() => {
    const report = {};
    expenses.forEach((expense) => {
      if (report[expense.category]) {
        report[expense.category] += expense.amount;
      } else {
        report[expense.category] = expense.amount;
      }
    });
    return report;
  }, [expenses]);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Smart Expense Tracker</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="row g-3 justify-content-center">
          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="col-md-2">
            <input
              type="number"
              className="form-control"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div className="col-md-2">
            <input
              type="text"
              className="form-control"
              placeholder="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
          <div className="col-md-2">
            <button type="submit" className="btn btn-primary w-100">
              Add Expense
            </button>
          </div>
        </div>
      </form>
      <h2 className="text-center mb-3">Expenses</h2>
      {expenses.length === 0 ? (
        <p className="text-center">No expenses added yet.</p>
      ) : (
        <ul className="list-group mb-4">
          {expenses.map((expense) => (
            <li
              key={expense.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              {expense.description} - ${expense.amount} - {expense.category}
            </li>
          ))}
        </ul>
      )}

      <h2 className="text-center mb-3">Spending Report</h2>
      {Object.keys(spendingReport).length === 0 ? (
        <p className="text-center">No spending data available.</p>
      ) : (
        <ul className="list-group">
          {Object.entries(spendingReport).map(([category, total]) => (
            <li
              key={category}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              {category}
              <span className="badge bg-primary rounded-pill">${total.toFixed(2)}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;