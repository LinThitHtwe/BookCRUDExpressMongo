const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Book = require("./models/book");

const app = express();
app.use(express.static("public"));

const dbURI = "mongodb+srv://linthit:thit72htwe@testmongo.ghtm1ao.mongodb.net/";
mongoose
  .connect(dbURI)
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

app.use(bodyParser.urlencoded({ extended: false }));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  Book.find()
    .sort({ createdAt: -1 })
    .then((result) => res.render("home", { books: result }))
    .catch((err) => console.log(err));
});

app.get("/add", (req, res) => {
  res.render("add");
});

app.post("/add", (req, res) => {
  const book = new Book(req.body);
  book
    .save()
    .then((result) => res.redirect("/"))
    .catch((err) => console.log(err));
});

app.get("/update/:id", (req, res) => {
  const id = req.params.id;
  Book.findById(id)
    .then((result) => res.render("updatepage", { book: result }))
    .catch((err) => console.log(err));
});

app.post("/update/:id", (req, res) => {
  const id = req.params.id;
  const { title, author, genre, price } = req.body;
  Book.findByIdAndUpdate(id, { title, author, genre, price })
    .then((result) => res.redirect("/"))
    .catch((err) => console.log(err));
});

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  Book.findOneAndDelete(id)
    .then((result) => {
      res.json({ redirect: "/" });
    })
    .catch((err) => console.log(err));
});

app.use((req, res) => {
  res.status(404).render("404");
});
