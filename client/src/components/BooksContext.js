import { createContext, useEffect, useState } from "react";
import usePersistedState from "./usePersistedState";

export const BooksContext = createContext();

export const BooksProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [executeQuery, setExecuteQuery] = useState(false);
  const [foundBooks, setFoundBooks] = useState([]);
  const [foundBook, setFoundBook] = useState(null);
  const [bookIsbn, setBookIsbn] = useState(null);

//   search books from Google API (for now)
  useEffect(() => {
    const searchBook = async () => {
      try {
        // console.log(searchQuery);
        const response = await fetch(`/api/search-book?q=${searchQuery}`);
        let data = await response.json();
        let books = data.books;
        // console.log(books);
        setFoundBooks(books);
      } catch (err) {
        console.log("Something went wrong: ", err.message);
      }
    };
    if (executeQuery) {
      searchBook();
    }
    setExecuteQuery(false);
  }, [executeQuery]);

  const selectBook = (book) => {
    setFoundBook(book);
  }


//   set single found book for each book of the foundBooks list
//   foundBooks.forEach((book) => {
//       setFoundBook(book);
//   });
// useEffect(() => {
    // foundBooks.forEach((book) => {
    //     console.log(book)
    //     setBookIsbn(book.isbn);
    // })
// }, []);

//   console.log(foundBook);

  return (
    <BooksContext.Provider
      value={{
        foundBooks,
        setFoundBooks,
        searchQuery,
        setSearchQuery,
        setExecuteQuery,
        selectBook,
      }}
    >
      {children}
    </BooksContext.Provider>
  );
};
