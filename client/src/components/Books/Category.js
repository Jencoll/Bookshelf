import styled from "styled-components";
import { useContext, useEffect } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { BooksContext } from "../BooksContext";
import { UsersContext } from "../UsersContext";

const Category = ({ category }) => {
  const { books, setType, setFilter } = useContext(BooksContext);
  const { currentUserProfile } = useContext(UsersContext);
  const userLibrary = currentUserProfile?.userLibrary;
  const { type, filter } = useParams();
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

  console.log(filter, " est le bon filtre");
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
      <button
        onClick={() => {
          setFilter(category);
        }}
      >
        {category}
      </button>

      {/* {category} */}
      {/* </CategoryLink> */}
    </CategoryTag>

    // <button onClick={() => {}}>{category}</button>

    // au clic de la catégorie, on affiche les livres (Thumbnails) de cette catégorie
  );
};

const CategoryTag = styled.li`
  position: relative;
  /* display: flex;
  align-items: center;
  justify-content: center; */
  width: 150px;
  height: 40px;
  background-color: #da544b;
  border-radius: 5px;
`;

const CategoryLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  text-decoration: none;
  color: #fff;
  font-weight: 500;
  letter-spacing: 1.2px;
  font-size: 18px;
  /* text-transform: uppercase; */
  `;

export default Category;
