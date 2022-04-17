import styled from "styled-components";
import UserLibrary from "./components/Books/UserLibrary";
import { useContext, useEffect } from "react";
import { BooksContext } from "./components/BooksContext";
import { useParams } from "react-router-dom";

const Homepage = () => {

    const { books, setType, setFilter, } = useContext(BooksContext);
    const { type, filter } = useParams();
    
    useEffect(() => {
      if (!type || !filter) {
          setType("");
          setFilter("");
      } else {
          setType(type);
          setFilter(filter);
      }
    
      
    }, [type, filter, books]);

    // console.log(books[0].category, " est-ce que j'ai une catégorie?")



    return (
      <Homewrapper>
        {/* <Categories /> */}
        <Categorywrapper>
          {/* {books?.map((book) => ( */}
            
            <Category>
                {/* {book?.category} */}
            </Category>
          {/* ))} */}
        </Categorywrapper>
      </Homewrapper>
    );
}

const Homewrapper = styled.div`
    position: relative;
    display: flex;
    top: 70px;
    left: 125px;
    /* width: calc(100% - 400px); */
    width: calc(100% - 125px);
    height: calc(100% - 70px);
    background-color: whitesmoke;
`;

const Categorywrapper = styled.ul` 
    display: flex;
    width: 100%;

`;

const Category = styled.li`
    display: flex;
    width: 150px;
    height: 40px;
    background-color: pink;
    border-radius: 5px;
`;

export default Homepage;