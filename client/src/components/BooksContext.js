import { createContext, useContext, useEffect, useState } from "react";
import usePersistedState from "./usePersistedState";
import { UsersContext } from "./UsersContext";

export const BooksContext = createContext();

export const BooksProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [executeQuery, setExecuteQuery] = useState(false);
  const [foundBooks, setFoundBooks] = useState([]);
  const [foundBook, setFoundBook] = useState(null);
  const [bookIsbn, setBookIsbn] = useState(null);
  const [inWishlist, setInWishlist] = useState(false);
  const [isRead, setIsRead] = useState(false);
  const [reading, setReading] = useState(false);
  const [inUserLibrary, setInUserLibrary] = useState(false);
  const { currentUserId, setCurrentUserProfile } = useContext(UsersContext);
  const [count, setCount] = useState(0);

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

  // function to set foundBook when the user selects the book title, during the Search
  const selectBook = (book) => {
    setFoundBook(book);
  };

  // add book to the user library with its ISBN
  const addBookToUserLibrary = async (isbn) => {
    try {
      const response = await fetch(
        `/api/add-book-to-user-library/${currentUserId}`,
        {
          method: "PATCH",
          body: JSON.stringify({
            isbn,
          }),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      if (response.status === 400) {
        // return Error with this message: <p>This book is already in your library.</p>;
        alert("This book is already in your library!");
      }
      console.log(isbn);
      let data = await response.json();
      console.log(data.user);
      // setCurrentUserProfile(data.user)
    } catch (err) {
      console.log("Error: ", err.message);
    }
  };

  // const openForm = () => {
  //   console.log("form open");
  //   return <addBookForm />
  // }

  // const handleToggleAction = (e, kind) => {
  //   // let kind = null;
  //   e.stopPropagation();
  //   switch (kind) {
  //     case "inWishlist":
  //       setInWishlist(!inWishlist);
  //       break;
  //     case "reading":
  //       setReading(!reading);
  //       break;
  //     case "isRead":
  //       setIsRead(!isRead);
  //       break;
  //     case "inUserLibrary":
  //       setInUserLibrary(!inUserLibrary);
  //       break;
  //     default:
  //       console.log("Kind not set.");
  //   }
  // };

  return (
    <BooksContext.Provider
      value={{
        foundBooks,
        setFoundBooks,
        searchQuery,
        setSearchQuery,
        setExecuteQuery,
        selectBook,
        // handleToggleAction,
        count,
        setCount,
        addBookToUserLibrary,
        setBookIsbn,
        bookIsbn,
        // openForm,
      }}
    >
      {children}
    </BooksContext.Provider>
  );
};
