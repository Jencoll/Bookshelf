import styled from "styled-components";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { useState } from "react";
import GlobalStyles from "./GlobalStyles";
import Header from "./components/Header/Header";
import Menu from "./components/Menu/Menu";
import Contacts from "./components/Contacts/Contacts";
import SingleBook from "./components/Books/SingleBook";
import Homepage from "./Homepage";
import AddBookForm from "./components/Header/AddBookForm";

const App = () => {

  return (
    <BrowserRouter>
      <GlobalStyles />
      <Main>
        <Header /> 
        <Menu />  
        <Contacts /> 
        <Switch>
          <Route exact path="/">
            <Homepage />
          </Route>
          <Route path="/book/:isbn">
            <SingleBook />
          </Route>
          <Route path="/add-book-form">
            <AddBookForm />
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