import styled from "styled-components";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { BooksContext } from "../BooksContext";
import { ActionBtn } from "../Header/Header";
import {
  BiBookAdd,
  BiBookReader,
  BiBookAlt,
  BiBookHeart,
  BiEditAlt,
} from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";

const BookActions = () => {
    const {
      addFoundBookToDatabase,
      addOrModifyUserBook,
      bookIsbn,
      deleteBookFromUserLibrary,
    } = useContext(BooksContext);
    let history = useHistory();    
    
    return (
      <ActionsWrapper>
        {/* Add book to user library */}
        <ActionBtndiv>
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
            <BiBookAdd style={{ color: "#386C5F" }} />
          </ActionBtn>
          <span>Library</span>
        </ActionBtndiv>

        {/* set book to is reading */}
        <ActionBtndiv>
          <ActionBtn>
            <BiBookReader style={{ color: "#386C5F" }} />
          </ActionBtn>
          <span>Reading</span>
        </ActionBtndiv>
        {/* set book to read */}
        <ActionBtndiv>
          <ActionBtn>
            <BiBookAlt style={{ color: "#386C5F" }} />
          </ActionBtn>
          <span>Read</span>
        </ActionBtndiv>
        {/* add book to wishlist */}
        <ActionBtndiv>
          <ActionBtn>
            <BiBookHeart style={{ color: "#386C5F" }} />
          </ActionBtn>
          <span>Wishlist</span>
        </ActionBtndiv>
        {/* edit book info */}
        <ActionBtndiv>
          <ActionBtn
            onClick={() => {
              history.push(`/modify-book-form`);
            }}
          >
            <BiEditAlt style={{ color: "#386C5F" }} />
          </ActionBtn>
          <span>Edit</span>
        </ActionBtndiv>
        {/* delete book from user library */}
        <ActionBtndiv>
          <ActionBtn
            onClick={() => {
              deleteBookFromUserLibrary({ isbn: bookIsbn });
              history.push("/books");
            }}
          >
            <AiOutlineDelete style={{ color: "#386C5F" }} />
          </ActionBtn>
          <span>Delete</span>
        </ActionBtndiv>
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
        font-size: 12px;
        
    }
`;

export default BookActions;