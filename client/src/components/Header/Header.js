import styled from "styled-components";
import { useState } from "react";
import LoginBox from "../Login/LoginBox";
import Searchbar from "../Search/Searchbar";
import { BiBookAdd } from "react-icons/bi";

const Header = () => {
  const [foundBooks, setFoundBooks] = useState([]);

  return (
    <Headerwrapper>
      <Title>Home</Title>
      <BookActionWrapper>
        {/* onclick, opens a modal form where the user is asked to enter manually
        or with scanned image the information about the book */}
        <ActionBtn>
          <BiBookAdd />
        </ActionBtn>
        <Searchbar foundBooks={foundBooks} setFoundBooks={setFoundBooks} />
        <ul>
          {foundBooks.map(foundBook => (
            <li>{foundBook.title}</li>
          ))}
        </ul>
      </BookActionWrapper>
      <LoginBox />
    </Headerwrapper>
  );
};

const Headerwrapper = styled.header`
  display: flex;
  flex-direction: column-reverse;
  width: calc(100%);
  height: 140px;
  /* line-height: 70px; */
  align-items: center;
  justify-content: space-evenly;
  padding-left: 24px;
  box-shadow: 2px -1px 11px #e5e5e5;

  @media (min-width: 770px) {
    width: calc(100% - 125px);
    height: 70px;
    justify-content: space-between;
    flex-direction: row;
    margin-left: 125px;
  }

`;

const Title = styled.h2`
    display: none;

    @media (min-width: 830px) {
        display: block;
        font-size: 1.3em;
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

export default Header;
