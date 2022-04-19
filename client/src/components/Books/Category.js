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

//   books.map((book) => {
//     match = userLibrary.find((b) => b.isbn === book.isbn);

//     if (match && match.category !== "undefined") {
//       console.log("voici mon livre : ", match, " du livre : ", book);
//       setFilter(match.category);
//       history.push(`/books/${category}`);
//     } else {
//       setFilter("No category");
//     }

//     // console.log(filter, " est le filtre");

//     console.log("voici mon livre : ", match, " du livre : ", book);
//     // console.log("une catégorie? ", match?.category)
//   });

//   console.log(filter, " est le bon filtre");
  // category && match?.category && ( )

  // const handleCategory = () => {
  //     if (match?.category === category) {
  //         setFilter(category);
  //         history.push(`/books/${category}`);
  //     }
  // }
  // useEffect(() => {

  //     const handleCategory = () => {
  //       if (match?.category === category) {
  //         setFilter(category);
  //         history.push(`/books/${category}`);
  //       }
  //     };

  //     handleCategory();

  // }, [filter])

  return (
    <CategoryTag>
      {/* <CategoryLink
        to={`/books/${category}`} */}
      <CategoryBtn
        selected={(category === "All" && type === "") || (type !== "" && category === filter)}
        onClick={() => {
          setType("category");
          setFilter(category);
        }}
      >
        {category !== "" ? category : "No category"}
      </CategoryBtn>

      {/* {category} */}
      {/* </CategoryLink> */}
    </CategoryTag>

    // <button onClick={() => {}}>{category}</button>

    // au clic de la catégorie, on affiche les livres (Thumbnails) de cette catégorie
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
  background-color: ${(props) => props.selected ? "#222222" : "#da544b"};
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
