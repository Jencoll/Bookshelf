import styled from "styled-components";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { useState } from "react";
import GlobalStyles from "./GlobalStyles";
import Header from "./components/Header/Header";
import Menu from "./components/Menu/Menu";
import Contacts from "./components/Contacts/Contacts";
import SingleBook from "./components/Books/SingleBook";

const App = () => {
  const [foundBooks, setFoundBooks] = useState([]);

  return (
    <BrowserRouter>
      <GlobalStyles />
      <Main>
        <Header /> 
        <Menu />  
        <Contacts /> 
        <Switch>
          <Route exact path="/">
            {/* homepage */}
          </Route>
          <Route path="/book/:isbn">
            <SingleBook />
          </Route>
        </Switch>
      </Main>

   </BrowserRouter>
  )
  
};


const Main = styled.div`
  position: relative;
  /* background-color: blanchedalmond; */
`;

export default App;