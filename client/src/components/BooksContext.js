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
  const [inUserLibrary, setInUserLibrary] = useState(false);
  const { currentUserId, setCurrentUserProfile } = useContext(UsersContext);
  const [type, setType] = useState(null);
  const [filter, setFilter] = useState(null);
  const [start, setStart] = useState(0);
  const [limit, setLimit] = useState(0);
  // const [formElements, setFormElements] = useState(null);

  //   search books from Google API (for now)
  const searchBook = async () => {
    try {
      const response = await fetch(`/api/search-book?q=${searchQuery}`);
      console.log("on tente de faire une autre recherche");
      let data = await response.json();
      console.log("la recherche donne ", data.books);
      setFoundBooks(data.books);
    } catch (err) {
      console.log("Something went wrong: ", err.message);
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
      console.log("data is: ", data);
      setCurrentUserProfile(data.user);
    } catch (err) {
      console.log("Error: ", err.message);
    }
  };

  // add a foundBook to the database
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
      console.log(response);
      let data = await response.json();
      let foundBookAdded = data;
      console.log(foundBookAdded, " is book added");
      // foundBookAdded.then(() => {setBook(foundBookAdded)})
      setBook(foundBookAdded);
    } catch (err) {
      console.log("Something went wrong: ", err.message);
    }  

  };

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
              authors: book.author,
              translators: book.translator,
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
              comments: book.comment,
              quotes: book.quotes,
            }),
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );
        // console.log(response);
        let data = await response.json();
        let createdBook = data.data;
        setBook(createdBook);
      } catch (err) {
        console.log(err.message);
      }
  };

  // add to the database a book that was manually created by the user with the Form
  // useEffect(() => {
  //   const addBookToDatabase = async () => {
  //     try {
  //       const response = await fetch("/api/add-book", {
  //         method: "POST",
  //         body: JSON.stringify({
  //           isbn: formElements.isbn?.value,
  //           title: formElements.title?.value,
  //           subtitle: formElements.subtitle.value,
  //           authors: formElements.author?.value,
  //           translators: formElements.translator.value,
  //           publisher: formElements.publisher.value,
  //           collection: formElements.collection.value,
  //           yearOfPublication: formElements.yearOfPublication.value,
  //           firstYearOfPub: formElements.firstYearOfPub.value,
  //           language: formElements.language.value,
  //           country: formElements.country.value,
  //           price: formElements.price.value,
  //           imageSrc: formElements.imageSrc.value,
  //           pages: formElements.pages.value,
  //           format: formElements.format.value,
  //           description: formElements.description.value,
  //           stars: formElements.stars.value,
  //           comments: formElements.comment.value,
  //           quotes: formElements.quotes.value,
  //         }),
  //         headers: {
  //           Accept: "application/json",
  //           "Content-Type": "application/json",
  //         },
  //       });
  //       // console.log(response);
  //       let data = await response.json();
  //       let createdBook = data.data;
  //       setBook(createdBook);

  //     } catch (err) {
  //       console.log(err.message);
  //     }
  //   };
  
  //   if (formElements) {
  //     addBookToDatabase();
  //   }
  // }, [formElements]);

  // retrieve books from database, using options (all books, with start and limit, by category, by tag)
  useEffect(() => {
    const retrieveBooks = async () => {
      try {
        const response = await fetch("/api/get-books");
        let data = await response.json();
        // console.log(data.books, " set books here");
        setBooks(data.books);
      } catch (err) {
        console.log(err.message);
      };
    };
    retrieveBooks();

  }, [book]);

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
        // addBookToDatabase,
        selectBook,
        book,
        setBook,
        // handleToggleAction,
        addOrModifyUserBook,
        searchBook,
        setBookIsbn,
        bookIsbn,
        // setFormElements,
        books,
        addFoundBookToDatabase,
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
      }}
    >
      {children}
    </BooksContext.Provider>
  );
};
