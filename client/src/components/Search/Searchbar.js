import styled from "styled-components";
import { IconContext } from "react-icons";
import { BiSearchAlt } from "react-icons/bi";
import { ActionBtn } from "../Header/Header";

const Searchbar = () => {

    return (
      <Searchform action="" method="" role="search">
        <Searchinput
          type="search"
          name="q"
          placeholder="Search for a book..."
          spellcheck="true"
          required
        ></Searchinput>
        <ActionBtn>
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