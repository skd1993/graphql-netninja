const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  name: String,
  genre: String,
  authorid: String
  // id : mongoDb automatically adds it so no need to add explicitly
});

module.exports = mongoose.model('Book', bookSchema);