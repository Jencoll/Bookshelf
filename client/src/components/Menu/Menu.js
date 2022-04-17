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
  /* flex-direction: column; */
  /* width: 125px;
  height: 100vh; */
  background-color: #e5e5e5;

  @media (min-width: 770px) {
    top: 0;
    flex-direction: column;
    gap: 60px;
    width: 125px;
    height: 100vh;
  }
`;

const MenuLink = styled(NavLink)`
  width: 50px;
  height: fit-content;
  text-decoration: none;
  color: #000;
  font-weight: 600;

  @media (min-width: 770px) {
    box-shadow: 2px -1px 11px #fff;
    padding: 12px;
    width: fit-content;
    border-radius: 999px;
  }
`;

export default Menu;
