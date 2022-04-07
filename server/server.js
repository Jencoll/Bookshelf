"use strict";

const bodyParser = require("body-parser");
const express = require("express");
const morgan = require("morgan");
// const cors = require("cors");
const helmet = require("helmet");
const axios = require("axios");
const PORT = 8000;


const { getUsers, getUser, addUser, modifyUser, deleteUser } = require("./handlers");
const app = express();

app.use(morgan("tiny"));
app.use(helmet());
// app.use(cors());
app.use(bodyParser.json());

// Endpoints

/*------------------
| users db endpoints |
------------------*/
app.get("/api/get-users", getUsers); // get a list of all users
app.get("/api/get-user", getUser); // get a user by its ID
app.post("/api/add-user", addUser); // create a user
app.patch("/api/modify-user", modifyUser); // modify user information
app.delete("/api/delete-user", deleteUser); // delete a user from the list of users

/*-------------------------
| bookshelves db endpoints |
--------------------------*/
app.get("/api/get-books"); // get a list of all books, with many options in the query
app.get("/api/get-book"); // get a book by its ID
app.post("/api/add-book"); // add a book
app.patch("/api/modify-book"); // modify values of a single book
app.delete("/api/delete-book"); // delete a book from the bookshelves(not sure it's useful; maybe in the case where a fake book is created)

/*-------------------------
| Google Books API db endpoints |
--------------------------*/
axios.get(`https://www.googleapis.com/books/v1/volumes?q=search+terms`);





 /*--------------------
  | catch-all endpoint |
  --------------------*/
 app.get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "404: User no longer in Kansas.",
    });
  });


app.listen(PORT, () => console.log(`Listening on port ${PORT}.`));