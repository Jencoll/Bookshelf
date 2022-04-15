import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import { UsersContext } from "../UsersContext";
import { BooksContext } from "../BooksContext";
import BookThumbnail from "./BookThumbnail";

const UserLibrary = () => {
    const { currentUserProfile } = useContext(UsersContext);
    const { books } = useContext(BooksContext);
    const userBooks = currentUserProfile?.userLibrary;
    const [displayBooks, setDisplayBooks] = useState([]);
    // let displayBooks = [];
    
    
    useEffect(() => {
    //   const userBooks = currentUserProfile?.userLibrary;
      console.log("user books: ", userBooks);
      console.log(books, " are books in db");
      for (let i = 0; i < userBooks?.length; i++) {
        for (let j = 0; j < books?.length; j++) {
          if (userBooks[i].isbn === books[j].isbn) {
            // console.log("match user " + userBooks[i].isbn + " match db " + books[j].isbn);
            // displayBooks.push(books[j]);
            console.log("book j: ", books[j]);
            setDisplayBooks((db) => [...db, books[j]]);
          }
        }
      }

    //   userBooks?.forEach((userBook) => {
    //     const findUserBook = async () => {
    //         try {
    //             const response = await fetch(`/api/get-book/${userBook?.isbn}`);
    //             let data = await response.json();
    //             console.log(data.book);
    //             setDisplayBooks((db) => [...db, data.book]);
    //         } catch (err) {
    //             console.log(err.message);
    //         }
    //     }

    //     findUserBook();
    //   })     

      //   console.log(displayBooks);
      console.log("refresh");
    }, [currentUserProfile]);
    
 
    // console.log(currentUserProfile?.userLibrary);
    // console.log(books);
    console.log(displayBooks);

    return (
        <LibraryWrapper>
            {displayBooks && displayBooks.length > 0 &&
                <BookList>
                    {displayBooks?.map((displayBook) => (
                        <BookThumbnail displayBook={displayBook} key={displayBook?.isbn} />
                    ))}
                </BookList>
            } 
            
            
            {/* {currentUserProfile.userLibrary} */}
        </LibraryWrapper>
    )

};

const LibraryWrapper = styled.div`
  position: relative;
  left: 125px;
  width: calc(100% - 400px);
  height: calc(100% - 70px);
  padding: 24px;
`;

const BookList = styled.ul` 
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(5, 1fr);
    grid-auto-columns: minmax(150px, 250px);
    grid-template-rows: repeat(auto-fit, minmax(200px, 1fr));
    width: 100%;
    margin: 0 auto;
    justify-items: center;
    text-align: center;
    

    background-color: azure;
`;

export default UserLibrary;