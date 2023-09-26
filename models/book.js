const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema(
  {
    title: { type: String, required: true },

    author: { type: String, required: true },

    genre: { type: String, required: true },

    price: { type: String, required: true },
  },
  { timestamp: true }
);

const Book = mongoose.model("Book", bookSchema);
module.exports = Book;
