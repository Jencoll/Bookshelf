import styled from "styled-components";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { BooksContext } from "../BooksContext";
import Action from "./Action";
import BookActionIcon from "./BookActionIcon";
import { ActionBtn } from "../Header/Header";
import { BiBookAdd, BiBookReader, BiBookAlt, BiBookHeart } from "react-icons/bi";

const BookActions = () => {
    const {
      handleToggleAction,
      addFoundBookToDatabase,
      addOrModifyUserBook,
      bookIsbn,
    } = useContext(BooksContext);
    let history = useHistory();    
    
    return (
      <ActionsWrapper>
        <ActionBtndiv>
          {/* Add book to user library */}
          <ActionBtn
            onClick={() => {
              addFoundBookToDatabase();
              addOrModifyUserBook({
                isbn: bookIsbn,
                borrowed: false,
                lent: false,
                bookshelf: "",
                category: "",
                tags: [],
                read: false,
                reading: false,
                wishlist: false,
              });
              history.push("/books");
              //   display messages : in the library already or book added (and redirect to the bookshelf)
            }}
          >
            <BiBookAdd />
          </ActionBtn>
          <span>Library</span>
        </ActionBtndiv>
        <ActionBtndiv>
          {/* set book to is reading */}
          <ActionBtn>
            <BiBookReader />
          </ActionBtn>
          <span>Reading</span>
        </ActionBtndiv>
        <ActionBtndiv>
          {/* set book to read */}
          <ActionBtn>
            <BiBookAlt />
          </ActionBtn>
          <span>Read</span>
        </ActionBtndiv>
        <ActionBtndiv>
          {/* add book to wishlist */}
          <ActionBtn>
            <BiBookHeart />
          </ActionBtn>
          <span>Wishlist</span>
          <ActionBtn onClick={() => {history.push(`/modify-book-form`)}}>
            Edit
          </ActionBtn>
        </ActionBtndiv>
        {/* <Action onClick={(e) => handleToggleAction(e, "inUserLibrary")}> */}
        {/* <BookActionIcon kind="addToLibrary" /> */}
        {/* </Action> */}
        {/* // <Action onClick={(e) => handleToggleAction(e, "reading")}> */}
        {/* </Action> */}
        {/* <Action onClick={(e) => handleToggleAction(e, "isRead")}>
          <BookActionIcon kind="read" />
        </Action>
        <Action onClick={(e) => handleToggleAction(e, "inWishlist")}>
          <BookActionIcon kind="addToWishlist" />
        </Action> */}
      </ActionsWrapper>
    );
};


const ActionsWrapper = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    min-width: 320px;
    max-width: 500px;

`;

const ActionBtndiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    height: 70px;
    text-align: center;

    span {
        width: 40px;
        line-height: 1;
        font-size: 14px;
        
    }
`;

export default BookActions;