import styled from "styled-components";
import { useEffect, useState, useContext } from "react";
import { IconContext } from "react-icons";
import { BiSearchAlt } from "react-icons/bi";
import { ActionBtn } from "../Header/Header";
import { BooksContext } from "../BooksContext";

const Searchbar = () => {
  const { foundBooks, setFoundBooks, setSearchQuery, setExecuteQuery } = useContext(BooksContext);

  // const [searchQuery, setSearchQuery] = useState("");
  // const [executeQuery, setExecuteQuery] = useState(false);

  // useEffect(() => {
  //   const searchBook = async () => {
  //     try {
  //       console.log(searchQuery);
  //       const response = await fetch(`/api/search-book?q=${searchQuery}`);
  //       let data = await response.json();
  //       let books = data.books;
  //       console.log(books);
  //       setFoundBooks(books);
  //     } catch (err) {
  //       console.log("Something went wrong: ", err.message);
  //     }
  //   }
  //   if (executeQuery) {
  //     searchBook();
  //   };
  //   setExecuteQuery(false);
  // }, [executeQuery]);

  const handleUserInput = (e) => {
    setSearchQuery(e.target.value);
  };

    return (
      <Searchform action="" method="" role="search">
        <Searchinput
          type="search"
          name="q"
          placeholder="Search for a book..."
          spellcheck="true"
          required
          onChange={(e) => handleUserInput(e)}
        ></Searchinput>
        <ActionBtn onClick={(e) => {
          e.preventDefault();
          setExecuteQuery(true);
        }}>
          <IconContext.Provider value={{ size: "1.5em" }}>
            <BiSearchAlt />
          </IconContext.Provider>
        </ActionBtn>
      </Searchform>
    );
};

const Searchform = styled.form`
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    width: 240px;  

    @media (min-width: 600px) {
        width: 320px;
    }
`;

const Searchinput = styled.input`
    width: 175px;

  @media (min-width: 600px) {
    width: 250px;
  }
`;


export default Searchbar;