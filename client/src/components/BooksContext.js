import { createContext, useContext, useEffect, useState } from "react";
import usePersistedState from "./usePersistedState";
import { UsersContext } from "./UsersContext";

export const BooksContext = createContext();

export const BooksProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [foundBooks, setFoundBooks] = useState([]);
  const [foundBook, setFoundBook] = useState(null);
  const [books, setBooks] = useState([]);
  const [book, setBook] = useState(null);
  const [bookIsbn, setBookIsbn] = useState(null);
  const [inWishlist, setInWishlist] = useState(false);
  const [isRead, setIsRead] = useState(false);
  const [reading, setReading] = useState(false);
  const { currentUserId, setCurrentUserProfile } = useContext(UsersContext);
  const [type, setType] = useState("category");
  const [filter, setFilter] = useState(null);
  const [start, setStart] = useState(0);
  const [limit, setLimit] = useState(100);
  const [resultsLength, setResultsLength] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errorMsgBooks, setErrorMsgBooks] = useState(false);

  //   search books from Google API (for now)
  const searchBook = async () => {
    try {
      const response = await fetch(`/api/search-book?q=${searchQuery}`);
      let data = await response.json();
      setFoundBooks(data.books);
      if (response.status !== 200) {
        setErrorMsgBooks(true);
      } else {
        setErrorMsgBooks(false);
      }
    } catch (err) {
      console.log("Something went wrong: ", err.message);
      setErrorMsgBooks(true);
    }
  };

  // function to set foundBook when the user selects the book title, during the Search
  const selectBook = (book) => {
    setFoundBook(book);
  };

  // add book to the user library with its ISBN
  const addOrModifyUserBook = async (userBook) => {
    try {
      const response = await fetch(
        `/api/add-or-modify-user-book/${currentUserId}`,
        {
          method: "PUT",
          body: JSON.stringify(userBook),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 400) {
        // return Error with this message: <p>This book is already in your library.</p>;
        alert("This book is already in your library!");
      }
      let data = await response.json();
      setCurrentUserProfile(data.user);
    } catch (err) {
      console.log("Error: ", err.message);
    }
  };

  // remove a book from a user's library (but the book stays in the database for other users use)
  const deleteBookFromUserLibrary = async (bookIsbn) => {
    try {
      const response = fetch(
        `/api/remove-book-from-user-library/${currentUserId}`,
        {
          method: "PATCH",
          body: JSON.stringify(bookIsbn),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error(`Error! Status: ${response.status}`);
      }
      let data = await response.json();
      setCurrentUserProfile(data.user);
    } catch (err) {
      console.log("Error: ", err.message);
    }
  };

  // add a foundBook (from Google API) to the database
  const addFoundBookToDatabase = async () => {
      console.log("This is the book: ", book, "and its image: ", book.imageSrc);
    try {
      const response = await fetch("/api/add-book", {
        method: "POST",
        body: JSON.stringify({
          isbn: book.isbn,
          title: book.title,
          subtitle: book.subtitle,
          authors: book.authors,
          translators: book.translator,
          publisher: book.publisher,
          collection: book.collection,
          yearOfPublication: book.yearOfPublication,
          firstYearOfPub: book.firstYearOfPub,
          language: book.language,
          category: book.mainCategory,
          country: book.country,
          price: book.price,
          imageSrc: book.imageSrc,
          pages: book.pages,
          format: book.format,
          description: book.description,
          stars: book.stars,
          comments: book.comment,
          quotes: book.quotes,
        }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      let data = await response.json();
      let foundBookAdded = data;
      setBook(foundBookAdded);
    } catch (err) {
      console.log("Something went wrong: ", err.message);
    }  
  };

  // add or modify book in the books database
  const addOrModifyBook = async (book, toEdit) => {
      try {
        const response = await fetch(
          toEdit ? "/api/modify-book" : "/api/add-book",
          {
            method: toEdit ? "PATCH" : "POST",
            body: JSON.stringify({
              isbn: book.isbn,
              title: book.title,
              subtitle: book.subtitle,
              authors: book.authors,
              translators: book.translators,
              publisher: book.publisher,
              collection: book.collection,
              yearOfPublication: book.yearOfPublication,
              firstYearOfPub: book.firstYearOfPub,
              language: book.language,
              country: book.country,
              category: book.mainCategory,
              price: book.price,
              imageSrc: book.imageSrc,
              pages: book.pages,
              format: book.format,
              description: book.description,
              stars: book.stars,
              comments: book.comments,
              quotes: book.quotes,
            }),
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );
        let data = await response.json();
        let createdBook = data.data;
        setBook(createdBook);
      } catch (err) {
        console.log(err.message);
      }
  };

  // retrieve books from database, using options (all books, with start and limit, by category, by tag)
  useEffect(() => {
    const retrieveBooks = async () => {
      setLoading(true);
      let response = null;
      try {
        if (type === "" || filter === "All") {
          response = await fetch(
            `/api/get-books?userId=${currentUserId}&start=${start}&limit=${limit}`
          );
        } else {
          response = await fetch(
            `/api/get-books?userId=${currentUserId}&start=${start}&limit=${limit}&type=${type}&filter=${filter}`
          );
        }
        if (!response.ok) {
          throw new Error(`Error! Status: ${response.status}`);
        }
        let data = await response.json();
        setBooks(data.books);
        setResultsLength(data.books.length);
      } catch (err) {
        console.log(err.message);
      };
      setLoading(false);
    };
    retrieveBooks();

  }, [start, limit, type, filter]);

  return (
    <BooksContext.Provider
      value={{
        foundBooks,
        setFoundBooks,
        searchQuery,
        setSearchQuery,
        selectBook,
        book,
        setBook,
        addOrModifyUserBook,
        searchBook,
        setBookIsbn,
        bookIsbn,
        books,
        addFoundBookToDatabase,
        loading,
        errorMsgBooks,
        setErrorMsgBooks,
        // openForm,
        addOrModifyBook,
        type,
        setType,
        filter,
        setFilter,
        limit,
        setLimit,
        start,
        setStart,
        deleteBookFromUserLibrary,
      }}
    >
      {children}
    </BooksContext.Provider>
  );
};
