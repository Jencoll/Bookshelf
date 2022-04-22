import styled from "styled-components";
import { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { BooksContext } from "../BooksContext";
import { UsersContext } from "../UsersContext";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";
import BookActions from "./BookActions";
import Spinner from "../StateHandling/Spinner";

const SingleBook = () => {
    const {isbn} = useParams();
    const { book, setBook, setBookIsbn } = useContext(BooksContext);
    const { currentUserProfile } = useContext(UsersContext);
    
    // get a book from its ISBN (with the Google API)
    useEffect(() => {
      setBookIsbn(isbn);
      
      const displayBook = async () => {
        try {
            let response = await fetch(`/api/get-book/${isbn}`);
            let data = await response.json();
            setBook(data.book);
        } catch (err) {
            console.log(err.message);
        }
      }

      displayBook();
    }, [isbn]);
    
    let userBook = currentUserProfile?.userLibrary.find(b => b.isbn === book?.isbn);
    
    // convert year of publication, language, stars
    return (
      <>
        {book ? (
          <SingleBookWrapper>
            <Coverwrapper>
              <Cover src={book.imageSrc}></Cover>
            </Coverwrapper>
            <BookDetails>
              <BookTitle>{book.title}</BookTitle>
              {book.subtitle && <BookSubtitle>{book.subtitle}</BookSubtitle>}
              <Authors>{book.authors}</Authors>
              <Stars>{book.stars} stars</Stars>
              <Infos>Category: {userBook?.category}</Infos>
              <Infos>Publisher: {book.publisher}</Infos>
              {book.collection && <Infos>Collection: {book.collection}</Infos>}
              <Infos>Publication: {book.yearOfPublication}</Infos>
              <Infos>Language: {book.language}</Infos>
              <Infos>{book.pages} pages</Infos>
              {book.format && <Infos>{book.format}</Infos>}
              <Infos>{book.description}</Infos>
              <BookActions book={book} />
            </BookDetails>
          </SingleBookWrapper>
        ) : (
          <Spinner />
        )}
      </>
    );
};

const SingleBookWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  gap: 30px;
  width: 100%;
  padding: 2em;

  @media (min-width: 770px) {
    flex-direction: row;
    align-items: flex-start;
    gap: 0px;
    left: 125px;
    width: calc(100% - 125px);
  }
`;

const Coverwrapper = styled.figure`
  position: relative;
  /* width: 20%; */
  min-width: 200px;
  max-width: 280px;
  height: auto;

  &::before,
  &::after {
    content: "";
    position: absolute;
    z-index: -1;
    box-shadow: 0 0 10px rgb(155 187 174 / 20%);
    top: -5%;
    bottom: -5%;
    left: -5%;
    right: -5%;
    border-radius: 10px / 10px;
  }

  &::after {
    right: 10px;
    left: auto;
    transform: skew(8deg) rotate(3deg);
  }
`;

const Cover = styled.img` 
    width: 100%;
    border-radius: 5px;
`;

const BookDetails = styled.div` 
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    gap: 16px;
    max-width: 500px;
    line-height: 1.5;
    padding: 0 20px;
`;

const BookTitle = styled.h2` 
    font-size: 24px;
    font-weight: 600;
    font-style: italic;
`;

const BookSubtitle = styled.h3`
    font-size: 20px;
    font-weight: 500;
    padding: 0 10px;
`;

const Authors = styled.h3`
    font-size: 20px;
    font-weight: 500;
`;

const Stars = styled.p` 
    font-size: 16px;
`;

const Infos = styled.p`
    font-size: 16px;
`;

export default SingleBook;
