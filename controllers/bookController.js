const Book = require("../models/book");

const home_page = (req, res) => {
  Book.find()
    .sort({ createdAt: -1 })
    .then((result) => res.render("home", { books: result }))
    .catch((err) => console.log(err));
};

const show_add_book = (req, res) => {
  res.render("add");
};

const add_book = (req, res) => {
  const book = new Book(req.body);
  book
    .save()
    .then((result) => res.redirect("/"))
    .catch((err) => console.log(err));
};

const show_update_book = (req, res) => {
  const id = req.params.id;
  Book.findById(id)
    .then((result) => res.render("updatepage", { book: result }))
    .catch((err) => console.log(err));
};

const update_book = (req, res) => {
  const id = req.params.id;
  const { title, author, genre, price } = req.body;
  Book.findByIdAndUpdate(id, { title, author, genre, price })
    .then((result) => res.redirect("/"))
    .catch((err) => console.log(err));
};

const delete_book = (req, res) => {
  const id = req.params.id;
  Book.findOneAndDelete(id)
    .then((result) => {
      res.json({ redirect: "/" });
    })
    .catch((err) => console.log(err));
};

module.exports = {
  home_page,
  show_add_book,
  add_book,
  show_update_book,
  update_book,
  delete_book,
};
