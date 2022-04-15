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

  useEffect(() => {
    if (userBooks && books) {
      let db = userBooks
        .map((userBook) => {
          return books.find((b) => b.isbn === userBook.isbn);
        })
        .filter((b) => b !== undefined);

      setDisplayBooks(db);
    }
  }, [currentUserProfile, userBooks, books]);

  return (
    <LibraryWrapper>
      {displayBooks && displayBooks.length > 0 && (
        <BookList>
          {displayBooks?.map((displayBook) => (
            <BookThumbnail displayBook={displayBook} key={displayBook?.isbn} />
          ))}
        </BookList>
      )}

      {/* {currentUserProfile.userLibrary} */}
    </LibraryWrapper>
  );
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