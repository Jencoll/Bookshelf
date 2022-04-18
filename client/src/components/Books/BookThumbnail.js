import styled from "styled-components";
import { useHistory } from "react-router-dom";

const BookThumbnail = ({ displayBook }) => {
  let history = useHistory();
  return (
    <BookLi
      onClick={() => {
        history.push(`/book/${displayBook.isbn}`);
      }}
    >
      {displayBook.imageSrc ? (
        <img alt="book cover" src={displayBook?.imageSrc}></img>
      ) : (
        <EmptyCover>{displayBook?.title}</EmptyCover>
      )}
    </BookLi>
  );
};

const BookLi = styled.li`
  position: relative;
  padding: 12px;
  cursor: pointer;
  width: 180px;
  display: flex;
  align-items: center;

  &::before,
  &::after {
    content: "";
    position: absolute;
    z-index: -1;
    box-shadow: 0 0 10px rgb(155 187 174 / 20%);
    top: 5%;
    bottom: 5%;
    left: 5%;
    right: 5%;
    border-radius: 10px / 10px;
  }

  &::after {
    right: 10px;
    left: auto;
    transform: skew(8deg) rotate(3deg);
  }

  img {
    width: 100%;
    border-radius: 5px;
  }
`;

const EmptyCover = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 180px;
  height: 260px;
  border-radius: 5px;
  padding: 5px;
`;

export default BookThumbnail;
