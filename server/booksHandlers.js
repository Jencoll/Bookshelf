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

// A function to convert Google Book API response into our book format
const googleBookToBook = (googleBook) => {
  let industryIdentifiers = googleBook.volumeInfo.industryIdentifiers;
  // setting isbn
  // let isbn = "";

  // forEach ou for ordinaire
  let ii = industryIdentifiers.find(x => x.type === "ISBN_13");
  if (!ii)
    ii = industryIdentifiers.find((x) => x.type === "ISBN_10");
  if (!ii)
    ii = industryIdentifiers[0];

  let isbn = ii ? ii.identifier : "not found";

  // setting images options
  let imageLinks = googleBook.volumeInfo?.imageLinks;
  let imageUrl = null;

  // Select the medium size before any other sizes
  if (imageLinks?.medium) {
    imageUrl = imageLinks.medium;
  } else if (imageLinks?.small) {
    imageUrl = imageLinks.small;
  } else if (imageLinks?.thumbnail) {
    imageUrl = imageLinks.thumbnail;
  } else if (imageLinks?.smallThumbnail) {
    imageUrl = imageLinks.smallThumbnail;
  } else if (imageLinks?.large) {
    imageUrl = imageLinks.large;
  } else if (imageLinks?.extraLarge) {
    imageUrl = imageLinks.extraLarge;
  } else {
    imageUrl = "";
    console.log("No image provided.");
  }

  // return a book format from Google API 
  // (create a function that converts the response to a book format)
  return {
    isbn,
    title: googleBook.volumeInfo.title,
    subtitle: googleBook.volumeInfo.subtitle,
    authors: googleBook.volumeInfo.authors,
    translators: "",
    stars: googleBook.volumeInfo.averageRating,
    publisher: googleBook.volumeInfo.publisher,
    collection: "",
    yearOfPublication: googleBook.volumeInfo.publishedDate,
    firstYearOfPub: "",
    language: googleBook.volumeInfo.language,
    // category: googleBook.volumeInfo.mainCategory,
    country: "",
    price: "",
    imageSrc: imageUrl,
    pages: googleBook.volumeInfo.pageCount,
    format: "",
    description: googleBook.volumeInfo.description,
    comments: [],
    quotes: [],
  };
};

// get an array of books with many options in the query (to filter the books depending on the option chosen)
const getBooks = async ({ query: { userId, start, limit, type, filter } }, res) => {
  // start = parseInt(req.query.start);
  // limit = parseInt(req.query.limit);
  let range = start + limit;

  try {
    await client.connect();
    console.log("connected");
    let matchedBooks = null;
    const userCollection = await db.collection("users"); 
    const existingUser = await userCollection.findOne({ _id: userId });
    if (!existingUser) {
      return res.status(404).json({ status: 404, message: "User not found." });
    }
    let userLibrary = existingUser.userLibrary;

    switch (type) {
      case "category": 
        let filteredUserLibrary = userLibrary.filter(b => b.category === filter);
        console.log(filteredUserLibrary, " est la liste filtrée");
        let allBooks = await booksCollection.find().toArray();
        matchedBooks = allBooks.filter(b => filteredUserLibrary.find(bk => bk.isbn === b.isbn));
        break;
      case "wishlist":
        matchedBooks = await booksCollection.find({ wishlist: filter }).toArray();
        break;
      case "tag": 
        matchedBooks = await booksCollection.find({ tag: filter }).toArray();
        break;
      case "bookshelf":
        matchedBooks = await booksCollection.find({ bookshelf: filter }).toArray();
        break;
      default: 
        matchedBooks = await booksCollection.find().toArray();
        break;
    }
    if (matchedBooks.length > 24 && matchedBooks.length < 100 && !start && !limit) {
      res.status(200).json({ status: 200, books: matchedBooks.slice(0, 99) });
    } else if (start && limit) {
      res.status(200).json({ status: 200, start, limit, books: matchedBooks.slice(start, limit)});
    } else if (start && !limit) {
      limit = start + 24;
      res.status(200).json({ status: 200, start, limit, books: matchedBooks.slice(start, limit)});
    } else if (!start && limit) {
      start = 0;
      res.status(200).json({ status: 200, start, limit, books: matchedBooks.slice(start, limit) });
    } else if (range && matchedBooks.length < range && start && limit) {
      let gap = matchedBooks.length - start;
      res.status(200).json({ status: 200, start, limit: gap, books: matchedBooks.slice(start, limit) });
    } else if (matchedBooks.length > 0 && matchedBooks.length <= 24) {
      res.status(200).json({ status: 200, books: matchedBooks });
    } else {
      res.status(400).json({ status: 400, message: "Bad request", books: matchedBooks });
    }
  } catch (err) {
    console.log("Something went wrong: ", err.message);
  } finally {
    client.close();
    console.log("disconnected");
  };

};

// get a book by its isbn
const getBook = async (req, res) => {
  let { isbn } = req.params;
  try {
    await client.connect();
    console.log("connected");
    const singleBook = await booksCollection.findOne({ isbn });

    if (singleBook) {
      res.status(200).json({ status: 200, book: singleBook });
    } else {
      const bookData = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}&key=${key}`
      );
      if (!bookData || bookData.data.totalItems === 0) {
        res.status(404).json({ status: 404, message: "Book not found from Google Search nor local search." });
      } else {
        res
          .status(200)
          .json({
            status: 200,
            book: googleBookToBook(bookData.data.items[0]),
          });
      }

    }

     
  } catch (err) {
    console.log("Something went wrong: ", err.stack);
  } finally {
    // client.close();
    console.log("disconnected");
  }
};

// add a book in the database
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
    // category,
    country,
    price,
    imageSrc,
    pages,
    format,
    description,
    stars,
    comments,
    quotes,
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
        // category,
        country,
        price,
        imageSrc,
        pages,
        format,
        description,
        stars,
        comments,
        quotes,
      };

      const book = await booksCollection.insertOne(newBook);
      res.status(201).json({
        status: 201,
        data: newBook,
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

const editBook = async (req, res) => {
  // const isbn = req.params.isbn;
  const {
    isbn,
    // title,
    // subtitle,
    // authors,
    // translators,
    // publisher,
    // collection,
    // yearOfPublication,
    // firstYearOfPub,
    // language,
    // country,
    // price,
    // imageSrc,
    // pages,
    // format,
    // description,
    // stars,
    // comments,
    // quotes,
  } = req.body;
  console.log("mon req.body est ", req.body);
  if (!isbn) {
    return res.status(400).json({ status: 400, message: "Incomplete request" });
  }

  try {
    await client.connect();
    console.log("connected");
    const existingBook = await booksCollection.findOne({ isbn });
    if (existingBook) {
      const book = await booksCollection.updateOne({ isbn }, { $set: req.body });
      console.log(book);
      res.status(200).json({
        status: 200,
        data: existingBook,
        message: "Book edited successfully",
      });
    } else {
      res.status(404).json({
        status: 404,
        message: "Book doesn't exist",
        data: isbn,
      });
    } 
  } catch (err) {
    console.log("Cannot modify book: ", err.message);
  } finally {
    client.close();
    console.log("disconnected");
  }
};

const deleteBook = async (req, res) => {
  const { isbn } = req.body;
  try {
    await client.connect();
    console.log("connected");
    const existingBook = await booksCollection.findOne({ isbn });
    if (!existingBook) {
      return res.status(404).json({ status: 404, message: "Book not found." });
    } else {
      await booksCollection.deleteOne({ _id: isbn });
      res.status(200).json({ status: 200, message: "Book deleted from database." });
    }
  } catch (err) {
    res.status(400).json({ status: 400, message: "An error occurred: ", err });
  } finally {
    client.close();
    console.log("disconnected");
  }
}

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
  //&langRestrict=${language}
  // set language restrictions to allow other languages than just English, when there are translations
  console.log("voici mon req.query: ", req.query);
  try {
    // const existingBookInDb = await booksCollection.findOne(req.query);
    // console.log("est-ce que j'obtiens quelque chose? ", existingBookInDb)
    // return;
    let response = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${req.query.q}&maxResults=20&key=${key}`
    );

    let items = await response.data.items;

    let books = items.map((item) => {
      return googleBookToBook(item);
    });

    res.status(200).json({ status: 200, books });
  } catch (err) {
    res.status(400).json({ status: 400, message: err.message });
  }
};

// End of endpoints
module.exports = {
  searchBook,
  addBook,
  getBooks,
  getBook,
  editBook,
  deleteBook,
};
