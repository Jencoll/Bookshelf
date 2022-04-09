import styled from "styled-components";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import GlobalStyles from "./GlobalStyles";
import Header from "./components/Header/Header";
import Menu from "./components/Menu/Menu";

const App = () => {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Main>
        <Header /> 
        <Menu />   

      </Main>

   </BrowserRouter>
  )
  
};


const Main = styled.div`
  /* background-color: blanchedalmond; */
`;

export default App;