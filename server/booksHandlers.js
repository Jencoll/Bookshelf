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

  // industryIdentifiers?.map((industryIdentifier) => {
  //   if (industryIdentifier.type === "ISBN_13") {
  //     return (isbn = industryIdentifier.identifier);
  //   } else if (industryIdentifier.type === "ISBN_10") {
  //     return (isbn = industryIdentifier.identifier);
  //   } else {
  //     // modifier le : pour un tiret dans le ISBN
  //     return (isbn = industryIdentifier.identifier);
  //   }
  // });

  // setting images options
  let imageLinks = googleBook.volumeInfo.imageLinks;
  let imageUrl = null;
  if (!imageLinks) {
    imageUrl = null;
  }
  // Select the medium size before any other sizes
  else if (imageLinks.medium) {
    imageUrl = imageLinks.medium;
  } else if (imageLinks.small) {
    imageUrl = imageLinks.small;
  } else if (imageLinks.thumbnail) {
    imageUrl = imageLinks.thumbnail;
  } else if (imageLinks.smallThumbnail) {
    imageUrl = imageLinks.smallThumbnail;
  } else if (imageLinks.large) {
    imageUrl = imageLinks.large;
  } else if (imageLinks.extraLarge) {
    imageUrl = imageLinks.extraLarge;
  } else {
    console.log("No image provided.");
  }

  // return a book format from Google API (create a function that converts the response to a book format)
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
const getBooks = async ({ query: { start, limit, type, filter } }, res) => {};

// get a book by its isbn
const getBook = async (req, res) => {
  let { isbn } = req.params;
  console.log("Simon va être content", isbn);
  try {
    await client.connect();
    console.log("connected");
    // const singleBook = await booksCollection.findOne({ isbn });
    const bookData = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=isbn:"${isbn}"&key=${key}`
    );
    if (!bookData || bookData.data.totalItems === 0) {
      res.status(404).json({ status: 404, message: "Book not found." });
    } else {
      res
        .status(200)
        .json({ status: 200, book: googleBookToBook(bookData.data.items[0]) });
    }
  } catch (err) {
    console.log("Something went wrong: ", err.stack);
  } finally {
    client.close();
    console.log("disconnected");
  }
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
  // maxresults = 10 for now;
  // set language restrictions to allow other languages than just English, when there are translations
  console.log(req.query);
  try {
    let response = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q="${req.query.q}"&maxResults=15&key=${key}`
    );

    let items = await response.data.items;

    let books = items.map((item) => {
      return googleBookToBook(item);
      // let industryIdentifiers = item.volumeInfo.industryIdentifiers;
      // // setting isbn
      // let isbn = "";
      // industryIdentifiers?.map((industryIdentifier) => {
      //   if (industryIdentifier.type === "ISBN_13") {
      //     return (isbn = industryIdentifier.identifier);
      //   } else if (industryIdentifier.type === "ISBN_10") {
      //     return (isbn = industryIdentifier.identifier);
      //   } else {
      //     return (isbn = industryIdentifier.identifier);
      //   }
      // });

      // // setting images options
      // let imageLinks = item.volumeInfo.imageLinks;
      // let imageUrl = null;
      // if (!imageLinks) {
      //   imageUrl = null;
      // } else 
      // // Select the medium size before any other sizes
      // if (imageLinks.medium) {
      //   imageUrl = imageLinks.medium;
      // } else if (imageLinks.small) {
      //   imageUrl = imageLinks.small;
      // } else if (imageLinks.thumbnail) {
      //   imageUrl = imageLinks.thumbnail;
      // } else if (imageLinks.smallThumbnail) {
      //   imageUrl = imageLinks.smallThumbnail;
      // } else if (imageLinks.large) {
      //   imageUrl = imageLinks.large;
      // } else if (imageLinks.extraLarge) {
      //   imageUrl = imageLinks.extraLarge;
      // } else {
      //   console.log("No image provided.");
      // }

      // // return a book format from Google API (create a function that converts the response to a book format)
      // return {
      //   isbn,
      //   title: item.volumeInfo.title,
      //   subtitle: item.volumeInfo.subtitle,
      //   authors: item.volumeInfo.authors,
      //   translators: "",
      //   publisher: item.volumeInfo.publisher,
      //   collection: "",
      //   yearOfPublication: item.volumeInfo.publishedDate,
      //   firstYearOfPub: "",
      //   language: item.volumeInfo.language,
      //   country: "",
      //   price: "",
      //   imageSrc: imageUrl,
      //   pages: item.volumeInfo.pageCount,
      //   format: "",
      //   description: item.volumeInfo.description,
      //   comments: [],
      //   quotes: [],
      // };
    });

    // console.log(books);
    res.status(200).json({ status: 200, books });
  } catch (err) {
    console.log("Something went wrong: ", err.message);
  }
};



// End of endpoints
module.exports = {
  searchBook,
  addBook,
  getBooks,
  getBook,
};
