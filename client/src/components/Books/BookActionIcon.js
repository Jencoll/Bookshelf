import styled from "styled-components";
import { BiBookAdd, BiBookReader, BiBookAlt, BiBookHeart } from "react-icons/bi";

const BookActionIcon = ({ kind }) => {
  // switch (kind) {
  //   case "addToLibrary":
  //     Action;
  //     break;
  //   case "reading": BiBookReader
  //     Action;
  //     break;
  //   case "read": BiBookAlt
  //     Action;
  //     break;
  //   case "addToWishlist": BiBookHeart
  //     Action;
  //     break;
  // }

  return (
    <Iconwrapper>
        
    </Iconwrapper>
  )
};

const Iconwrapper = styled.div` 
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
`;

export default BookActionIcon;