import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import { useState, useContext } from "react";
import { BooksContext } from "../BooksContext";

const SearchResult = ({ foundBook, setIsClosed }) => {
  // const [author, setAuthor] = useState("");
  const { setSelectBook, selectBook, setSearchQuery, setFoundBooks } = useContext(BooksContext);
  // console.log(foundBook.isbn);
  let history = useHistory();
  console.log(foundBook, "is found book")
  return (
    <Result
      onClick={() => {
        history.push(`/book/${foundBook.isbn}`);
        console.log("this is the isbn: ", foundBook.isbn);
        setSearchQuery("");
        setFoundBooks(null);
      }}
    >
      {foundBook?.title}
      <Bookdiv>
        <Cover src={foundBook.imageSrc}></Cover>
        <Title>{foundBook.title}</Title>
        {foundBook.authors?.map((author) => {
          return <Author key={author}>{author}</Author>;
        })}
      </Bookdiv>
    </Result>
  );
};

const Result = styled.li`
  position: relative;
  width: 320px;
  padding: 0.5em;
  line-height: 1.2;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #9bbbae;
    color: #fff;
    font-weight: 600;
  }

  &:hover > div {
    display: flex;
  }

  /* &::before {
    content: "bonjour";
    position: absolute;
    display: none;
    left: -55px;
    background-color: green;
    width: 50px;
  }
  &:hover::before {
    display: block;
  } */
`;

const ResultLink = styled(Link)`
    text-decoration: none;
    color: #000;
    font-weight: 500;
`;

const Bookdiv = styled.div`
    display: none;
    position: absolute;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    top: 0;
    left: -250px;
    width: 200px;
    height: 300px;
    background-color: #fff;

    /* z-index: 5; */

`;

const Cover = styled.img`
    width: 120px;
`;

const Title = styled.h2`
  font-size: 16px;
  font-style: italic;
  max-width: 180px;
  padding: 8px;
  font-weight: 600;
`;

const Author = styled.h3`
    font-size: 14px;
    font-weight: 500;
`;

export default SearchResult;
