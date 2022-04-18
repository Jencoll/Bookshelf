import styled from "styled-components";
import { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { BooksContext } from "../BooksContext";
import { UsersContext } from "../UsersContext";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";
import BookActions from "./BookActions";

const SingleBook = () => {
    const {isbn} = useParams();
    const {foundBook, book, setBook, setBookIsbn, bookIsbn} = useContext(BooksContext);
    // const [book, setBook] = useState(null);
    const { currentUserId, currentUserProfile } = useContext(UsersContext);
    
    // get a book from its ISBN (with the Google API)
    useEffect(() => {
      setBookIsbn(isbn);
      
      const displayBook = async () => {
        try {
            let response = await fetch(`/api/get-book/${isbn}`);
            let data = await response.json();
            console.log(data.book);
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

              {/* {book.stars * <Stars>{BsStarFill}</Stars>} */}

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
          <div>Loading</div>
        )}
      </>
    );

};

const SingleBookWrapper = styled.div`  
    position: absolute;
    position: relative;
    display: flex;
    justify-content: space-evenly;
    left: 125px;
    /* width: calc(100% - 400px); */
    width: calc(100% - 125px);
    padding: 2em;
`;

const Coverwrapper = styled.figure` 
    width: 20%;
    height: auto;
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
`;

const BookTitle = styled.h2` 
    font-size: 24px;
    font-weight: 600;
    font-style: italic;
`;

const BookSubtitle = styled.h3`
    font-size: 20px;
    font-weight: 500;
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

const AddBook = styled.button` 

`;


export default SingleBook;
