import styled from "styled-components";
import { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { BooksContext } from "../BooksContext";

const SingleBook = () => {
    const {isbn} = useParams();
    const {foundBook} = useContext(BooksContext);
    const [book, setBook] = useState(null);
    
    // get a book from its ISBN (with the Google API)
    useEffect(() => {
      const displayBook = async () => {
        try {
            let response = await fetch(`/api/get-book/${isbn}`);
            let data = await response.json();
            // console.log(data.book);
            setBook(data.book);
        } catch (err) {
            console.log(err.message);
        }
      }

      displayBook();
    }, [isbn])
    
    console.log(book)
    
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
                <Infos>Publisher: {book.publisher}</Infos>
                {book.collection && <Infos>Collection: {book.collection}</Infos>}
                <Infos>Publication: {book.yearOfPublication}</Infos> 
                <Infos>Language: {book.language}</Infos>
                <Infos>{book.pages} pages</Infos>
                {book.format && <Infos>{book.format}</Infos>}
                <Infos>{book.description}</Infos>
                <AddBook>Add</AddBook>
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
    display: flex;
    justify-content: space-evenly;
    top: 70px;
    left: 125px;
    width: calc(100% - 400px);
    padding: 2em;
`;

const Coverwrapper = styled.figure` 
    width: 20%;
    height: auto;
`;

const Cover = styled.img` 
    width: 100%;
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
