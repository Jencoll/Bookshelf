import styled from "styled-components";
import { useState, useContext, useEffect, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import LoginBox from "../Login/LoginBox";
import Searchbar from "../Search/Searchbar";
import { BiBookAdd } from "react-icons/bi";
import SearchResult from "../Search/SearchResult";
import { BooksContext } from "../BooksContext";

const Header = () => {
  const { foundBooks, setFoundBooks, selectBook, searchQuery, setSearchQuery } = useContext(BooksContext);
  const [isClosed, setIsClosed] = useState(false);
  let history = useHistory();
  let booksRef = useRef(null);
  
  // does not work properly
  const handleToggleList = (e) => {
    // let list = document.getElementById("list");
    // if (list && e.target !== list) {
    //   setIsClosed();
    //   list.style.display = "none";
    //   setSearchQuery("");
    //   setFoundBooks(null);
    // }
    if (booksRef.current && !booksRef.current.contains(e.target)) {
        setSearchQuery("");
        setFoundBooks(null);
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleToggleList)
  
    return () => {
      window.removeEventListener("click", handleToggleList);
    }
  }, [])
  

  return (
    <Headerwrapper>
      <TitleLink to="/">Home</TitleLink>
      <BookActionWrapper>
        {/* onclick, opens a modal form where the user is asked to enter manually
        or with scanned image the information about the book */}
        <ActionBtn
          onClick={(e) => {
            e.stopPropagation();
            history.push("/add-book-form");
          }}
        >
          <BiBookAdd />
        </ActionBtn>
        <Searchbar />
        {/* as foundBooks is an empty array that always exists, it will always display, but we can ask it not to display if its length is more than 0 */}
        {foundBooks && foundBooks.length > 0 && (
          <BookList
            ref={booksRef}
            id="list"
            enabled
          >
            {foundBooks.map((foundBook) => (
              <SearchResult foundBook={foundBook} key={foundBook.isbn} />
            ))}
          </BookList>
        )}
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
  background-color: #fff;
  box-shadow: 0 1px 4px rgb(0 0 0 / 10%), 0 0 40px rgb(0 0 0 / 1%) inset;
  border-radius: 10px / 10px;

  &::before,
  &::after {
    content: "";
    position: absolute;
    z-index: -1;
    box-shadow: 0 0 10px rgb(0 0 0 / 20%);
    top: 0;
    bottom: 0;
    left: 1%;
    right: 1%;
    border-radius: 10px / 10px;
  }

  &::after {
    right: 10px;
    left: auto;
    transform: skew(8deg) rotate(3deg);
  }

  display: ${(props) => (props.enabled ? "block" : "none")};
`;

export default Header;
