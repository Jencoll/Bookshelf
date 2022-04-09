import styled from "styled-components";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import GlobalStyles from "./GlobalStyles";
import Header from "./components/Header/Header";
import Menu from "./components/Menu/Menu";
import Contacts from "./components/Contacts/Contacts";

const App = () => {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Main>
        <Header /> 
        <Menu />  
        <Contacts /> 

      </Main>

   </BrowserRouter>
  )
  
};


const Main = styled.div`
  position: relative;
  /* background-color: blanchedalmond; */
`;

export default App;