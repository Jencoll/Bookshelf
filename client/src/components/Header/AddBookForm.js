import styled from "styled-components";
import { useContext, useState } from "react";
import { BsAsterisk } from "react-icons/bs";
import { BiBookAdd } from "react-icons/bi";
import { ActionBtn } from "./Header";
import { BooksContext } from "../BooksContext";

const AddBookForm = () => {
    const { addBookToUserLibrary, formElements, setFormElements } = useContext(BooksContext);
   const [bookIsbn, setBookIsbn] = useState(null);
   let addedIsbn = null;

    return (
      <FormWrapper>
        <FormTitle>Enter your book information</FormTitle>
        <BookInfoForm 
        action="" 
        method="post"
        onSubmit={(e) => {
          e.preventDefault();
          setFormElements(e.target.elements);
          let isbn = document.getElementById("isbn").value;
          addBookToUserLibrary(isbn);
          // history.push("/library")
        }}
        >
          <Column>
            <Infodiv>
              <Label htmlFor="isbn">
                <BsAsterisk style={{ fontSize: "14px" }} /> ISBN
              </Label>
              <Input type="text" name="isbn" id="isbn" placeholder="No need of the hyphens" required></Input>
            </Infodiv>
            <Infodiv>
              <Label htmlFor="title">
                <BsAsterisk style={{ fontSize: "14px" }} /> Title
              </Label>
              <Input type="text" name="title" required></Input>
            </Infodiv>
            <Infodiv>
              <Label htmlFor="author">
                <BsAsterisk style={{ fontSize: "14px" }} /> Author
              </Label>
              <Input type="text" name="author" required></Input>
            </Infodiv>
            <Infodiv>
              <Label htmlFor="subtitle">Subtitle</Label>
              <Input type="text" name="subtitle"></Input>
            </Infodiv>
            <Infodiv>
              <Label htmlFor="publisher">Publisher</Label>
              <Input type="text" name="publisher"></Input>
            </Infodiv>
            <Infodiv>
              <Label htmlFor="collection">Collection</Label>
              <Input type="text" name="collection"></Input>
            </Infodiv>
            <Infodiv>
              <Label htmlFor="translator">Translator</Label>
              <Input type="text" name="translator"></Input>
            </Infodiv>
            <Infodiv>
              <Label htmlFor="yearOfPublication">Published</Label>
              <Input type="number" name="yearOfPublication"></Input>
            </Infodiv>
            <Infodiv>
              <Label htmlFor="firstYearOfPub">First Edition</Label>
              <Input type="number" name="firstYearOfPub"></Input>
            </Infodiv>
            <Infodiv>
              <Label htmlFor="language">Language</Label>
              <Input type="text" name="language"></Input>
            </Infodiv>
          </Column>

          <Column>
            <Infodiv>
              <Label htmlFor="country">Country</Label>
              <Input type="text" name="country"></Input>
            </Infodiv>
            <Infodiv>
              <Label htmlFor="pages">Pages</Label>
              <Input type="text" name="pages"></Input>
            </Infodiv>
            <Infodiv>
              <Label htmlFor="format">Format</Label>
              <Input type="text" name="format"></Input>
            </Infodiv>
            <Infodiv>
              <Label htmlFor="imageSrc">Cover</Label>
              <Input type="file" name="imageSrc" accept="image/*"></Input>
              <Input type="submit" value="Upload"></Input>
            </Infodiv>
            <Infodiv>
              <Label htmlFor="description">Description</Label>
              <Input type="text" name="description"></Input>
            </Infodiv>
            <Infodiv>
              <Label htmlFor="stars">Rating (/5)</Label>
              <Input type="number" min="0" max="5" name="stars"></Input>
            </Infodiv>
            <Infodiv>
              <Label htmlFor="comment">Comment</Label>
              <Input type="text" name="comment"></Input>
            </Infodiv>
            <Infodiv>
              <Label htmlFor="quotes">Quotes</Label>
              <Input type="text" name="quotes"></Input>
            </Infodiv>
            <Infodiv>
              <Label htmlFor="price">Price</Label>
              <Input type="text" name="price"></Input>
            </Infodiv>
            <AddBookBtn>
              <BiBookAdd />
            </AddBookBtn>
          </Column>
        </BookInfoForm>
      </FormWrapper>
    );
};

const FormWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  left: 125px;
  width: calc(100% - 400px);
  height: calc(100% - 70px);
  padding: 24px;
`;

const BookInfoForm = styled.form` 
    display: flex;
    justify-content: space-evenly;
    padding: 24px;
    min-height: 600px;
`;

const FormTitle = styled.h2`
    font-weight: 600;
    font-size: 24px;
    padding: 24px;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: 50%;

`;

const Infodiv = styled.div`
    display: flex;
    align-items: center;
`;

const Label = styled.label`
    font-size: 18px;
    width: 150px;
    text-align: left;
`;

const Input = styled.input`

`;

const AddBookBtn = styled(ActionBtn)`
  margin: 0 auto;
`;

export default AddBookForm;