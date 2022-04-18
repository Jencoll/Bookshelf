import styled from "styled-components";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import GlobalStyles from "./GlobalStyles";
import Header from "./components/Header/Header";
import Menu from "./components/Menu/Menu";
import Contacts from "./components/Contacts/Contacts";
import SingleBook from "./components/Books/SingleBook";
import Homepage from "./Homepage";
import AddBookForm from "./components/Header/AddBookForm";
import UserLibrary from "./components/Books/UserLibrary";
import CloudinaryUpdloadWidget from "./components/CloudinaryUploadWidget";
import LoginForm from "./components/Login/LoginForm";
import Signup from "./components/Login/Signup";
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
            {/* <CloudinaryUpdloadWidget /> */}
            {/* <UserLibrary /> */}
            <Homepage />
          </Route>
          <Route path="/login">
            <LoginForm />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/books">
            <UserLibrary />
          </Route>
          <Route path="/book/:isbn">
            <SingleBook />
          </Route>
          <Route path="/add-book-form">
            <AddBookForm toEdit={false} />
          </Route>
          <Route path="/modify-book-form">
            <AddBookForm toEdit={true} />
          </Route>
        </Switch>
      </Main>
    </BrowserRouter>
  );
  
};


const Main = styled.div`
  position: relative;
  height: 100vh;
  box-shadow: 2px -1px 11px #e5e5e5;
`;

export default App;