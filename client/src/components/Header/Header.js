import styled from "styled-components";
import { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import LoginBox from "../Login/LoginBox";
import Searchbar from "../Search/Searchbar";
import { BiBookAdd } from "react-icons/bi";
import SearchResult from "../Search/SearchResult";
import { BooksContext } from "../BooksContext";

const Header = () => {
  const { foundBooks, setFoundBooks, selectBook, searchQuery } = useContext(BooksContext);
  const [isClosed, setIsClosed] = useState(false);
  let history = useHistory();
  // console.log(foundBooks);

  //  const openForm = () => {
  //    console.log("form open");

  //   //  fetch("/add-book-form", {
  //   //    method: "POST", 
  //   //    headers: {
  //   //      "Accept": "application/json",
  //   //      "Content-Type": "application/json",
  //   //    },
  //   //    body: JSON.stringify()
  //   //  })
  //  };

  return (
    <Headerwrapper>
      <TitleLink to="/">Home</TitleLink>
      <BookActionWrapper>
        {/* onclick, opens a modal form where the user is asked to enter manually
        or with scanned image the information about the book */}
        <ActionBtn onClick={(e) => {
          e.stopPropagation();
          history.push("/add-book-form")
        }}>
          <BiBookAdd />
        </ActionBtn>
        <Searchbar />
        {/* as foundBooks is an empty array that always exists, it will always display, but we can ask it not to display if its length is more than 0 */}
        {foundBooks && foundBooks.length > 0 ? (
          <BookList enabled>
            {foundBooks.map((foundBook) => (
              <SearchResult foundBook={foundBook} key={foundBook.isbn} />
            ))}
          </BookList>
        ) : <BookList></BookList>}
      </BookActionWrapper>
      <LoginBox />
    </Headerwrapper>
  );
};

const Headerwrapper = styled.header`
  /* position: fixed; */
  overflow: hidden;
  display: flex;
  flex-direction: column-reverse;
  width: calc(100%);
  height: 140px;
  /* line-height: 70px; */
  align-items: center;
  justify-content: space-evenly;
  padding-left: 24px;
  box-shadow: 2px -1px 11px #e5e5e5;
  background-color: #fff;
  z-index: 3;

  @media (min-width: 770px) {
    width: calc(100% - 125px);
    height: 70px;
    justify-content: space-between;
    flex-direction: row;
    margin-left: 125px;
  }
`;

const TitleLink = styled(Link)`
  display: none;

  @media (min-width: 830px) {
    display: block;
    font-size: 1.3em;
    text-decoration: none;
    color: #000;
    font-weight: 600;
  }
`;

const BookActionWrapper = styled.div` 
    display: flex;
`;

export const ActionBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  background: #fff;
  color: #000;
  height: 36px;
  width: 36px;
  padding: 6px;
  border: 0.5px solid #000;
  border-radius: 5px;
  cursor: pointer;
`;

const BookList = styled.ul`
  position: absolute;
  top: 70px;
  z-index: 3;
  box-shadow: 1px 1px 3px aliceblue;
  padding: 1em;
  border-radius: 5px;
  background-color: blanchedalmond;

  display: ${(props) => (props.enabled ? "block" : "none")};
`;

export default Header;
