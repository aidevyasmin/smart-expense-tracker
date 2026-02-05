let expenses = [];

const getExpenses = (req, res, next) => {
  try {
    res.json(expenses);
  } catch (error) {
    next(error); // Pass error to the error handling middleware
  }
};

const addExpense = (req, res, next) => {
  try {
    const newExpense = req.body;
    // Basic validation to ensure newExpense is an object, though express.json() handles most cases
    if (!newExpense || typeof newExpense !== 'object') {
      const error = new Error('Invalid expense data provided.');
      error.statusCode = 400; // Bad Request
      throw error;
    }
    expenses.push(newExpense);
    res.status(201).json(newExpense);
  } catch (error) {
    next(error); // Pass error to the error handling middleware
  }
};

const resetExpenses = () => {
  expenses = [];
};

module.exports = {
  getExpenses,
  addExpense,
  resetExpenses,
};
