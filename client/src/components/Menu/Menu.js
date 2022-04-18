import styled from "styled-components";
import { NavLink } from "react-router-dom";

const Menu = () => {
  return (
    <MenuWrapper>
      <MenuLink exact to="/">
        Home
      </MenuLink>
      <MenuLink to="/books">Books</MenuLink>
      <MenuLink to="/contacts">Contacts</MenuLink>
    </MenuWrapper>
  );
};

const MenuWrapper = styled.aside`
  display: flex;
  position: fixed;
  align-items: center;
  justify-content: center;
  bottom: 0;
  height: 70px;
  width: 100%;
  gap: 30px;
  z-index: 3;
  background-color: #c2d6cf;

  @media (min-width: 770px) {
    top: 0;
    flex-direction: column;
    gap: 60px;
    width: 125px;
    height: 100%;
  }
`;

const MenuLink = styled(NavLink)`
  width: 50px;
  height: fit-content;
  text-decoration: none;
  color: #fff;
  font-weight: 600;
  text-transform: uppercase;
  
  @media (min-width: 770px) {
    background-color: #9BBBAE;
    box-shadow: 2px 2px 4px 1px #fff;
    padding: 14px 8px;
    width: fit-content;
    border-radius: 10px;

    &:active {
      box-shadow: 2px 2px 4px -2px #fff;
    }
  }
`;

export default Menu;
