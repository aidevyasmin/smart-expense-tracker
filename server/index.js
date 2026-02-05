const express = require('express');
const app = express();
const port = 3000;
const { getExpenses, addExpense } = require('./expenses');

app.use(express.json());

app.get('/api/expenses', getExpenses);
app.post('/api/expenses', addExpense);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something broke!', error: err.message });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
