import styled from "styled-components";

const Recommendations = () => {

    // retrieve books with 4 & 5 stars and show book cover, title, author and 2 lines of user comment about this book (with ... to show it continues), with the avatar of the user who is recommending this book

    return (
        <Recwrapper>
            <Bookcard>
                
            </Bookcard>
        </Recwrapper>
    )
};

const Recwrapper = styled.div` 
    display: flex;
    flex-direction: column;
    width: 200px;
    height: 400px;
    border-radius: 5px;


    background-color: burlywood;
`;

const Bookcard = styled.div` 
    width: 200px;
    height: 100px;
    background-color: aliceblue;

    border-radius: 10px;
`;

export default Recommendations;