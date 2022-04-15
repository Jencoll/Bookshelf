import styled from "styled-components";

const BookThumbnail = ({displayBook}) => {

    return (
        <BookLi>
            {displayBook?.title}
        </BookLi>
    )
};

const BookLi = styled.li`
    padding: 12px;
`;

export default BookThumbnail;