import styled from "styled-components";
import { useHistory } from "react-router-dom";


const BookThumbnail = ({displayBook}) => {

    let history = useHistory();
    console.log(displayBook.imageSrc, " est l'image source")
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
  padding: 12px;
  cursor: pointer;
  width: 180px;
  display: flex;
  align-items: center;

  img {
    width: 100%;
  }
`;

const EmptyCover = styled.div` 
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 160px;
    max-width: 180px;
    width: 160px;
    height: 260px;
    border: 1px solid #000;
    border-radius: 5px;
    
`;

export default BookThumbnail;