"use strict";
require("dotenv").config({ path: ".env" });

const { v4: uuidv4 } = require("uuid");
const { MongoClient } = require("mongodb");
const { default: axios } = require("axios");
const { MONGO_URI, key } = process.env;

const client = new MongoClient(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = client.db("bookshelf");

// Endpoint for accessing bookshelves collection
const booksCollection = db.collection("books");

// get an array of books with many options in the query (to filter the books depending on the option chosen)
const getBooks = async ({ query: { start, limit, type, filter } }, res) => {

};

// get a book by its isbn
const getBook = async ({ query: { isbn } }, res) => {

    try {
        await client.connect();
        console.log("connected");
        const singleBook = await booksCollection.findOne({ isbn });
        console.log(singleBook)
        if (!singleBook) {
            res.status(404).json({ status: 404, message: "Book not found." });
        } else {
            res.status(200).json({ status: 200, book: singleBook });
        }
    } catch (err) {
        console.log("Something went wrong: ", err.message);
    } finally {
        client.close();
        console.log("disconnected");
    };
};

// const getUser = async ({ query: { userId } }, res) => {
//   try {
//     await client.connect();
//     const singleUser = await userCollection.findOne({ _id: userId });
//     if (!singleUser) {
//       res.status(404).json({ status: 404, message: "User not found." });
//     } else {
//       res.status(200).json({ status: 200, user: singleUser });
//     }
//   } catch (err) {
//     console.log(err.message);
//   } finally {
//     client.close();
//   }
// };

// add a book in the home library
const addBook = async (req, res) => {
  // use a switch to add a book whether manually or by search in the database and/or in Google Books API
  // in fact, the search in the database should be performed first, and then, if no book is found, the search is performed in the Google Books API (does it make sense?)
  // if it is by search in the database, then the user can write in input the author name, the book title or the ISBN number (so another switch here)
  const {
    isbn,
    title,
    subtitle,
    authors,
    translators,
    publisher,
    collection,
    yearOfPublication,
    firstYearOfPub,
    language,
    country,
    price,
    imageSrc,
    pages,
    format,
    description,
    stars,
    comments,
    quotes
  } = req.body;
  const newId = uuidv4();

  if (!isbn || !title || !authors) {
    return res.status(400).json({ status: 400, message: "Incomplete request" });
  }

  try {
    await client.connect();
    console.log("connected");
    const existingBook = await booksCollection.findOne({ isbn });
    if (!existingBook) {
      let newBook = {
        _id: newId,
        isbn,
        title,
        subtitle,
        authors,
        translators,
        publisher,
        collection,
        yearOfPublication,
        firstYearOfPub,
        language,
        country,
        price,
        imageSrc,
        pages,
        format,
        description,
        stars,
        comments,
        quotes
      };

      const book = await booksCollection.insertOne(newBook);
      res.status(201).json({
        status: 201,
        data: book,
        message: "Book created successfully",
      });
    } else {
      res.status(200).json({
        status: 200,
        message: "Book already exists",
        data: existingBook,
      });
    }
  } catch (err) {
    console.log("Cannot add book: ", err.message);
  } finally {
    client.close();
    console.log("disconnected");
  }
};
/* book format
 {
    isbn: "isbn",
    title: "title",
    subtitle: "subtitle",
    authors: ["author1", "author2"],
    translators: ["translator1", "translator2"],
    publisher: "publisher name",
    collection: "collection name",
    yearOfPublication: year,
    firstYearOfPub: year,
    language: "language",
    country: "country of publication",
    price: "$XX.XX", // if possible, try localize the format
    imageSrc: "img url for book cover",
    pages: number of pages,
    format: "pocket", "hard cover", etc.,
    description: "description of the book; provided by Google Books API when searching a book, it can also be provided by the user in a textarea",
    stars: number of stars,
    comments: [{"comment1"}, {"comment2"}], // in the FE, user's comment has to be differentiated from other users' comments
    quotes: [{"quote1"}, {"quote2"}],
 }

 */

// Endpoint for performing a search request to Google Books API
const searchBook = async (req, res) => {
  axios.get(`https://www.googleapis.com/books/v1/volumes?q=inauthor:keyes&key=${key}`);
};

// End of endpoints
module.exports = {
  searchBook,
  addBook,
  getBooks,
  getBook,
};
