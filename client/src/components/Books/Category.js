import styled from "styled-components";
import { useContext, useEffect } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { BooksContext } from "../BooksContext";
import { UsersContext } from "../UsersContext";

const Category = ({ category }) => {
  const { books, type, setType, setFilter, filter } = useContext(BooksContext);
  const { currentUserProfile } = useContext(UsersContext);
  const userLibrary = currentUserProfile?.userLibrary;
  //const { type, filter } = useParams();
  let match = null;
  let history = useHistory();

  // reset type and filter to display all books
  //  useEffect(() => {
  //    if (!type || !filter) {
  //      setType("");
  //      setFilter("");
  //    } else {
  //      setType(type);
  //      setFilter(filter);
  //    }
  //  }, [type, filter, books]);


  return (
    <CategoryTag>
      <CategoryBtn
        selected={(category === "All" && type === "") || (type !== "" && category === filter)}
        onClick={() => {
          setType("category");
          setFilter(category);
        }}
      >
        {category !== "" ? category : "No category"}
      </CategoryBtn>
    </CategoryTag>

  );
};

const CategoryTag = styled.li`
  position: relative;
  width: 150px;
  height: 40px;
  background-color: #da544b;
  border-radius: 5px;
`;

const CategoryBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  text-decoration: none;
  color: #fff;
  font-weight: 500;
  letter-spacing: 1.2px;
  font-size: 17px;
  background-color: ${(props) => (props.selected ? "#9bbbae" : "#da544b")};
  border-radius: 5px;
  border: none;
  text-transform: uppercase;

  &:hover {
    font-weight: 500;
    border: 3px solid #c2d6cf;
  }

  &:active {
    background-color: #9bbbae;
    color: #fff;
    font-weight: 600;
  }
`;

export default Category;
