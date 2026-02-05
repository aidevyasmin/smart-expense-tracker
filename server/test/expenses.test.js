const chai = require('chai');
const expect = chai.expect;
const { getExpenses, addExpense, resetExpenses } = require('../expenses'); // Adjust path as needed

describe('Expense Tracker Backend', () => {
  let req, res;

  beforeEach(() => {
    resetExpenses(); // Reset expenses before each test
    req = {};
    res = {
      statusCode: 200,
      data: null,
      json(data) {
        this.data = data;
        return this;
      },
      status(code) {
        this.statusCode = code;
        return this;
      },
      send(data) {
        this.data = data;
        return this;
      }
    };
  });

  it('should return an empty array of expenses initially', () => {
    getExpenses(req, res);
    expect(res.statusCode).to.equal(200);
    expect(res.data).to.be.an('array').that.is.empty;
  });

  it('should add a new expense and return it', () => {
    req.body = { description: 'Groceries', amount: 50, category: 'Food' };
    addExpense(req, res);
    expect(res.statusCode).to.equal(201);
    expect(res.data).to.deep.equal({ description: 'Groceries', amount: 50, category: 'Food' });
  });

  it('should return all expenses after adding some', () => {
    req.body = { description: 'Groceries', amount: 50, category: 'Food' };
    addExpense(req, res);

    req.body = { description: 'Dinner', amount: 30, category: 'Food' };
    addExpense(req, res); // This call modifies 'res'

    // Re-initialize 'res' to ensure statusCode is reset to 200 for the getExpenses call
    res = {
      statusCode: 200,
      data: null,
      json(data) {
        this.data = data;
        return this;
      },
      status(code) {
        this.statusCode = code;
        return this;
      },
      send(data) {
        this.data = data;
        return this;
      }
    };
    getExpenses(req, res);
    expect(res.statusCode).to.equal(200);
    expect(res.data).to.have.lengthOf(2);
    expect(res.data[0]).to.deep.equal({ description: 'Groceries', amount: 50, category: 'Food' });
    expect(res.data[1]).to.deep.equal({ description: 'Dinner', amount: 30, category: 'Food' });
  });
});
