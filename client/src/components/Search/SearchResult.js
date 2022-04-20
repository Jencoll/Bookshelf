import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useContext } from "react";
import { BooksContext } from "../BooksContext";

const SearchResult = ({ foundBook }) => {
  const { setSearchQuery, setFoundBooks } = useContext(BooksContext);
  let history = useHistory();

  return (
    <Result
      onClick={() => {
        history.push(`/book/${foundBook.isbn}`);
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
