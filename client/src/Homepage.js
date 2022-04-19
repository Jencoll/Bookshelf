import styled from "styled-components";
import UserLibrary from "./components/Books/UserLibrary";
import { useContext, useEffect } from "react";
import { BooksContext } from "./components/BooksContext";
import { UsersContext } from "./components/UsersContext";
import { useParams } from "react-router-dom";
import Category from "./components/Books/Category";
import GenericWelcome from "./GenericWelcome";

const Homepage = () => {
  const { books, setType, setFilter } = useContext(BooksContext);
  const { currentUserProfile } = useContext(UsersContext);
  const { type, filter } = useParams();
  const userLibrary = currentUserProfile?.userLibrary;
  let categories = [];
  let uniqueCategories = [];
  // useEffect(() => {
  //   if (!type || !filter) {
  //       setType("");
  //       setFilter("");
  //   } else {
  //       setType(type);
  //       setFilter(filter);
  //   }

  // }, [type, filter, books]);

  if (currentUserProfile) {
    userLibrary?.forEach((b) => {
      categories.push(b.category);
    });

    uniqueCategories = [...new Set(categories)].filter(
      (cat) => cat && cat !== ""
    );
    uniqueCategories.unshift("All");
    uniqueCategories.push("");
  }

  return (
    <Homewrapper>
     
    
      <Type>{currentUserProfile ? "Categories" : "Create your online bookshelf"}</Type>
      {currentUserProfile ? ( 
      <>
      <Categorylist>
        {uniqueCategories.map((category) => (
          <Category category={category} key={category} />
        ))}
      </Categorylist>
      <UserLibrary />
      </>
      ) : (
        <GenericMessage>
          
        </GenericMessage>
        // <GenericWelcome />
      )}
     
      
     
    </Homewrapper>
  );
};

const Homewrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: center; */
  padding: 0 12px 24px 12px;
  top: 70px;
  left: 125px;
  width: calc(100% - 125px);
  height: calc(100% - 70px);
`;

const Type = styled.h3`
  font-size: 22px;
  padding: 16px;
`;

const Categorylist = styled.ul`
  display: flex;
  width: 75%;
  gap: 16px;
  margin-top: 16px;
`;

const GenericMessage = styled.div`
  width: 100%;
  height: 70%;
  padding: 24px;
  background: url("https://images.unsplash.com/photo-1503365070998-37e56a2606e2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1738&q=80");
  background-position: center;
  background-size: cover;
  border-radius: 10px;
  box-shadow: 3px 5px 6px #c2d6cf;
  margin-top: 30px;
`;

export default Homepage;
