const mongoose = require('mongoose');

const DetailSchema = new mongoose.Schema({
  cname: {
    type: String,
    required: true
  },
  cemail: {
    type: String,
    required: true
  },
  cphone: {
    type: String,
    required: true
  },
  cgstnumber: {
    type: String,
    required: true
  },
  cbilling: {
    type: String,
    required: true
  }

});

const Detail = mongoose.model('Detail', DetailSchema);

module.exports = Detail;
