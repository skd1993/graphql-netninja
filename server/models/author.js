const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const authorSchema = new Schema({
  name: String,
  age: Number,
  // id : mongoDb automatically adds it so no need to add explicitly
});

module.exports = mongoose.model('Author', authorSchema);