import styled from "styled-components";
import UserLibrary from "./components/Books/UserLibrary";
import { useContext, useEffect } from "react";
import { BooksContext } from "./components/BooksContext";
import { UsersContext } from "./components/UsersContext";
import { useParams } from "react-router-dom";
import Category from "./components/Books/Category";

const Homepage = () => {

    const { books, setType, setFilter, } = useContext(BooksContext);
    const { currentUserProfile } = useContext(UsersContext);
    const { type, filter } = useParams();
    const userLibrary = currentUserProfile?.userLibrary;
    let categories = [];

    // useEffect(() => {
    //   if (!type || !filter) {
    //       setType("");
    //       setFilter("");
    //   } else {
    //       setType(type);
    //       setFilter(filter);
    //   }
    
    // }, [type, filter, books]);

    // console.log(userLibrary, " est la user library");

    userLibrary?.forEach((b) => {
      categories.push(b.category);
    })

    let uniqueCategories = [...new Set(categories)];
    // console.log("Et enfin les catégories uniques : ", uniqueCategories)

    return (
      <Homewrapper>
        <Type>Categories</Type>
        <Categorylist>
          {uniqueCategories.map((category) => (
            <Category category={category} key={category} />
        ))}
        </Categorylist>

      </Homewrapper>
    );
}

const Homewrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0 12px 24px 12px;
    top: 70px;
    left: 125px;
    /* width: calc(100% - 400px); */
    width: calc(100% - 125px);
    height: calc(100% - 70px);



    /* background-color: whitesmoke; */
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

export default Homepage;