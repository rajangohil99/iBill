const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({

    pname: {
    type: String,
    required: true
  },
  pprice: {
    type: String,
    required: true
  },
  pquantity: {
    type: String,
    required: true
  },
  ptotal: {
    type: String,
    required: true
  }
});

const Expense = mongoose.model('Expense', ExpenseSchema);

module.exports = Expense;

