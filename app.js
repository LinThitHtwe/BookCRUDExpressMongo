const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const bookController = require("./controllers/bookController");
const errorController = require("./controllers/errorController");

const env = require("dotenv").config();

const app = express();
app.use(express.static("public"));

const dbURI = `mongodb+srv://${process.env.DBUSERNAME}:${process.env.DBPASSWORD}@testmongo.ghtm1ao.mongodb.net/`;
mongoose
  .connect(dbURI)
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

app.use(bodyParser.urlencoded({ extended: false }));
app.set("view engine", "ejs");

app.get("/", bookController.home_page);

app.get("/add", bookController.show_add_book);

app.post("/add", bookController.add_book);

app.get("/update/:id", bookController.show_update_book);

app.post("/update/:id", bookController.update_book);

app.delete("/delete/:id", bookController.delete_book);

app.use(errorController.page_not_found);
