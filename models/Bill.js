const mongoose = require('mongoose');

const BillSchema = new mongoose.Schema({
    bnumber: {
    type: String,
    required: true
  },
  bname: {
    type: String,
    required: true
  },
  bquantity: {
    type: String,
    required: true
  },
  bprice: {
    type: String,
    required: true
  },
  btotal: {
    type: String,
    required: true
  }

});

const Bill = mongoose.model('Billin', BillSchema);

module.exports = Bill;
