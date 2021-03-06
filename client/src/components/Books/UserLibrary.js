import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import { UsersContext } from "../UsersContext";
import { BooksContext } from "../BooksContext";
import BookThumbnail from "./BookThumbnail";
import Spinner from "../StateHandling/Spinner";

const UserLibrary = ({resetFilter }) => {
  const { currentUserProfile } = useContext(UsersContext);
  const { books, setType, loading } = useContext(BooksContext);
  const userBooks = currentUserProfile?.userLibrary;
  const [displayBooks, setDisplayBooks] = useState([]);

  useEffect(() => {
    if (resetFilter) {
      setType("");
    }
  }, []);

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

  if (loading) {
    return <Spinner />
  };

  return (
    <LibraryWrapper>
      {displayBooks && displayBooks.length > 0 && (
        <BookList>
          {displayBooks?.map((displayBook) => (
            <BookThumbnail displayBook={displayBook} key={displayBook?.isbn} />
          ))}
        </BookList>
      )}
    </LibraryWrapper>
  );
};

const LibraryWrapper = styled.div`
  position: relative;
  width: 100%;
  height: calc(100% - 70px);
  padding: 24px;

  @media (min-width: 770px) {
    left: 125px;
    width: calc(100% - 125px);
  }
`;

const BookList = styled.ul`
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(1, 1fr);
  grid-auto-columns: minmax(200px, 250px);
  grid-template-rows: repeat(auto-fit, minmax(200px, 1fr));
  width: 100%;
  margin: 0 auto;
  justify-items: center;
  text-align: center;

  @media (min-width: 450px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 650px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 910px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (min-width: 1100px) {
    grid-template-columns: repeat(5, 1fr);
  }

  @media (min-width: 1350px) {
    grid-template-columns: repeat(6, 1fr);
  }
`;

export default UserLibrary;
