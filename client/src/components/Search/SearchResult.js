import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import { useState, useContext } from "react";
import { BooksContext } from "../BooksContext";

const SearchResult = ({ foundBook }) => {
  // const [author, setAuthor] = useState("");
  const { setSelectBook, selectBook } = useContext(BooksContext);
  console.log(foundBook.isbn);
  let history = useHistory();

  return (
    <Result>
      {/* set the corresponding link */}
      <ResultLink
        // onClick={() => {
        //   setSelectBook(foundBook);
        //   history.push(`/book/${foundBook.isbn}`);
        // }}
        to={`/book/${foundBook.isbn}`}
        // Close the UL on click
      >
        {foundBook?.title}
      </ResultLink>
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

  &:hover {
    background-color: goldenrod;
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
    justify-content: flex-start;
    top: 0;
    left: -250px;
    width: 200px;

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
