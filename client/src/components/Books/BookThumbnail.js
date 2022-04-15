import styled from "styled-components";

const BookThumbnail = ({displayBook}) => {
    // console.log(displayBook)
    return (
        <BookLi>
            {displayBook?.imageSrc}
            {displayBook?.title}
        </BookLi>
    )
};

const BookLi = styled.li`
    padding: 12px;
`;

export default BookThumbnail;