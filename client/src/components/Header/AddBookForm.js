import styled from "styled-components";
import { BsAsterisk } from "react-icons/bs";
import { BiBookAdd } from "react-icons/bi";
import { ActionBtn } from "./Header";

const AddBookForm = () => {
    

    // I want two columns. Now!
    return (
      <BookInfoForm action="" method="post">
        <FormTitle>Enter your book information</FormTitle>
        <Infodiv>
          <Label for="isbn">
            <BsAsterisk style={{ fontSize: "14px" }} /> ISBN
          </Label>
          <Input type="text" name="isbn" required></Input>
        </Infodiv>
        <Infodiv>
          <Label for="title">
            <BsAsterisk style={{ fontSize: "14px" }} /> Title
          </Label>
          <Input
            type="text"
            name="title"
            required
          ></Input>
        </Infodiv>
        <Infodiv>
          <Label for="author">
            <BsAsterisk style={{ fontSize: "14px" }} /> Author
          </Label>
          <Input type="text" name="author" required></Input>
        </Infodiv>
        <Infodiv>
          <Label for="subtitle">Subtitle</Label>
          <Input type="text" name="subtitle"></Input>
        </Infodiv>
        <Infodiv>
          <Label for="publisher">Publisher</Label>
          <Input type="text" name="publisher"></Input>
        </Infodiv>
        <Infodiv>
          <Label for="collection">Collection</Label>
          <Input type="text" name="collection"></Input>
        </Infodiv>
        <Infodiv>
          <Label for="translator">Translator</Label>
          <Input type="text" name="translator"></Input>
        </Infodiv>
        <Infodiv>
          <Label for="yearOfPublication">Published</Label>
          <Input type="number" name="yearOfPublication"></Input>
        </Infodiv>
        <Infodiv>
          <Label for="firstYearOfPub">First Edition</Label>
          <Input type="number" name="firstYearOfPub"></Input>
        </Infodiv>
        <Infodiv>
          <Label for="language">Language</Label>
          <Input type="text" name="language"></Input>
        </Infodiv>
        <Infodiv>
          <Label for="country">Country</Label>
          <Input type="text" name="country"></Input>
        </Infodiv>
        <Infodiv>
          <Label for="pages">Pages</Label>
          <Input type="text" name="pages"></Input>
        </Infodiv>
        <Infodiv>
          <Label for="format">Format</Label>
          <Input type="text" name="format"></Input>
        </Infodiv>
        <Infodiv>
          <Label for="imageSrc">Cover</Label>
          <Input type="image" name="imageSrc" src=""></Input>
        </Infodiv>
        <Infodiv>
          <Label for="description">Description</Label>
          <Input type="text" name="description"></Input>
        </Infodiv>
        <Infodiv>
          <Label for="stars">Rating (/5)</Label>
          <Input type="number" min="0" max="5" name="stars"></Input>
        </Infodiv>
        <Infodiv>
          <Label for="comment">Comment</Label>
          <Input type="text" name="comment"></Input>
        </Infodiv>
        <Infodiv>
          <Label for="quotes">Quotes</Label>
          <Input type="text" name="quotes"></Input>
        </Infodiv>
        <Infodiv>
          <Label for="price">Price</Label>
          <Input type="text" name="price"></Input>
        </Infodiv>
        <ActionBtn><BiBookAdd /></ActionBtn>
      </BookInfoForm>
    );
};

const BookInfoForm = styled.form` 
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    top: 70px;
    left: 125px;
    width: calc(100% - 400px);
    height: fit-content;
    padding: 24px;
    height: calc(100% - 70px);



`;

const FormTitle = styled.h2`
    font-weight: 600;
    font-size: 24px;
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

export default AddBookForm;