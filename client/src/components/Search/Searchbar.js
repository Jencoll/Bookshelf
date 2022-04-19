import styled from "styled-components";
import { useEffect, useState, useContext } from "react";
import { IconContext } from "react-icons";
import { BiSearchAlt } from "react-icons/bi";
import { ActionBtn } from "../Header/Header";
import { BooksContext } from "../BooksContext";
import { UsersContext } from "../UsersContext";

const Searchbar = () => {
  const {
    searchQuery,
    setSearchQuery,
    searchBook,
  } = useContext(BooksContext);
  const { currentUserProfile } = useContext(UsersContext);

  const handleUserInput = (e) => {
    setSearchQuery(e.target.value);
  };

    return (
      <Searchform action="" method="" role="search">
        <Searchinput
          value={searchQuery}
          type="search"
          name="q"
          placeholder="Search for a book..."
          spellcheck="true"
          required
          onChange={(e) => handleUserInput(e)}
        ></Searchinput>
        <ActionBtn onClick={(e) => {
          e.preventDefault();
          searchBook();
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
  border: none;
  box-shadow: 1px 1px 1px 2px #9bbbae;

  &:focus {
    outline: 3px solid #9bbbae;
  }

  @media (min-width: 600px) {
    width: 250px;
  }
`;

export default Searchbar;