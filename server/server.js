"use strict";

const bodyParser = require("body-parser");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const PORT = 8000;

// users handlers
const {
  getUsers,
  // getUser,
  addUser,
  modifyUser,
  deleteUser,
  loginUser,
  // getRandOnlineUsers,
  // getCurrentUser,
  addOrModifyUserBook,
  removeBookFromUserLibrary,
  // addUserBookshelf,
} = require("./userHandlers");

// books handlers
const {
  searchBook,
  addBook,
  getBooks,
  getBook,
  editBook,
} = require("./booksHandlers");

const app = express();

app.use(morgan("tiny"));
app.use(helmet());
app.use(cors());
app.use(express.json());

// Endpoints

/*------------------
| users db endpoints |
------------------*/
app.post("/api/login", loginUser); // get and validate login user info
app.get("/api/get-users", getUsers); // get a list of all users
// app.get("/api/get-user/:_id", getUser); // get a user by its ID
// app.get("/api/get-online-users", getRandOnlineUsers); // get a random list of online users
// app.get("/api/get-current-user", getCurrentUser); // get the current user profile (with his/her first name as handle)
app.post("/api/add-user", addUser); // create a user
app.patch("/api/modify-user/:_id", modifyUser); // modify user information
app.delete("/api/delete-user/:_id", deleteUser); // delete a user from the list of users
app.put("/api/add-or-modify-user-book/:_id", addOrModifyUserBook); // with user ID
app.patch("/api/remove-book-from-user-library/:_id", removeBookFromUserLibrary);
// app.post("/api/add-bookshelf/:_id", addUserBookshelf); 

/*-------------------
| books db endpoints |
--------------------*/
app.get("/api/get-books", getBooks); // get a list of all books, with many options in the query
app.get("/api/get-book/:isbn", getBook); // get a book from Google API by its isbn
app.post("/api/add-book", addBook); // add a book to the database
app.patch("/api/modify-book", editBook); // modify values of a single book
app.delete("/api/delete-book"); // delete a book from the bookshelves(not sure it's useful; maybe in the case where a fake book is created)

/*-------------------------
| Google Books API db endpoints |
--------------------------*/
app.get("/api/search-book", searchBook);

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