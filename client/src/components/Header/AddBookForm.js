import styled from "styled-components";
import { useContext, useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { BsAsterisk } from "react-icons/bs";
import { BiBookAdd } from "react-icons/bi";
import { ActionBtn } from "./Header";
import { BooksContext } from "../BooksContext";
import openUpload from "../CloudinaryUploadWidget";
import { CloudinaryContext } from "../CloudinaryUploadWidget";
// import { useForm } from "react-hook-form";

const AddBookForm = ({ toEdit }) => {
  const {
    addBookToUserLibrary,
    formElements,
    setFormElements,
    book,
    addOrModifyBook,
  } = useContext(BooksContext);
  const { fileUrlUploaded, setFileUrlUploaded, openUpload } = useContext(CloudinaryContext);
  const [bookEdited, setBookEdited] = useState(toEdit ? book : {});
  let uploadFieldRef = useRef();

  useEffect(() => {
    setBookEdited({...bookEdited, imageSrc: fileUrlUploaded})
  }, [fileUrlUploaded]);


  return (
    <FormWrapper>
      <FormTitle>
        {toEdit ? "Edit your book information" : "Add your book information"}
      </FormTitle>
      <BookInfoForm
        action=""
        method={toEdit ? "patch" : "post"}
        onSubmit={(e) => {
          e.preventDefault();
          console.log(bookEdited, " est ce livre édité");
          //setFormElements(e.target.elements);
          addOrModifyBook(bookEdited, toEdit);
          if (!toEdit) {
            let isbn = document.getElementById("isbn").value;
            addBookToUserLibrary(isbn);
          }
        }}
      >
        <Column>
          <Infodiv>
            <Label htmlFor="isbn">
              <BsAsterisk style={{ fontSize: "14px" }} /> ISBN
            </Label>
            <Input
              value={bookEdited?.isbn}
              onChange={(e) => {
                setBookEdited({ ...bookEdited, isbn: e.target.value });
              }}
              type="text"
              name="isbn"
              id="isbn"
              placeholder="No need of the hyphens"
              required
            ></Input>
          </Infodiv>
          <Infodiv>
            <Label htmlFor="title">
              <BsAsterisk style={{ fontSize: "14px" }} /> Title
            </Label>
            <Input
              value={bookEdited?.title}
              onChange={(e) => {
                setBookEdited({ ...bookEdited, title: e.target.value });
              }}
              type="text"
              name="title"
              required
            ></Input>
          </Infodiv>
          <Infodiv>
            <Label htmlFor="author">
              <BsAsterisk style={{ fontSize: "14px" }} /> Author
            </Label>
            <Input
              value={bookEdited?.authors}
              onChange={(e) => {
                setBookEdited({ ...bookEdited, authors: [e.target.value] });
              }}
              type="text"
              name="author"
              required
            ></Input>
          </Infodiv>
          <Infodiv>
            <Label htmlFor="subtitle">Subtitle</Label>
            <Input
              value={bookEdited?.subtitle}
              onChange={(e) => {
                setBookEdited({ ...bookEdited, subtitle: e.target.value });
              }}
              type="text"
              name="subtitle"
            ></Input>
          </Infodiv>
          <Infodiv>
            <Label htmlFor="publisher">Publisher</Label>
            <Input
              value={bookEdited?.publisher}
              onChange={(e) => {
                setBookEdited({ ...bookEdited, publisher: e.target.value });
              }}
              type="text"
              name="publisher"
            ></Input>
          </Infodiv>
          <Infodiv>
            <Label htmlFor="collection">Collection</Label>
            <Input
              value={bookEdited?.collection}
              onChange={(e) => {
                setBookEdited({ ...bookEdited, collection: e.target.value });
              }}
              type="text"
              name="collection"
            ></Input>
          </Infodiv>
          <Infodiv>
            <Label htmlFor="translator">Translator</Label>
            <Input
              value={bookEdited?.translators}
              onChange={(e) => {
                setBookEdited({ ...bookEdited, translators: [e.target.value] });
              }}
              type="text"
              name="translator"
            ></Input>
          </Infodiv>
          <Infodiv>
            <Label htmlFor="yearOfPublication">Published</Label>
            <Input
              value={bookEdited?.yearOfPublication}
              onChange={(e) => {
                setBookEdited({
                  ...bookEdited,
                  yearOfPublication: e.target.value,
                });
              }}
              type="number"
              name="yearOfPublication"
            ></Input>
          </Infodiv>
          <Infodiv>
            <Label htmlFor="firstYearOfPub">First Edition</Label>
            <Input
              value={bookEdited?.firstYearOfPub}
              onChange={(e) => {
                setBookEdited({
                  ...bookEdited,
                  firstYearOfPub: e.target.value,
                });
              }}
              type="number"
              name="firstYearOfPub"
            ></Input>
          </Infodiv>
          <Infodiv>
            <Label htmlFor="language">Language</Label>
            <Input
              value={bookEdited?.language}
              onChange={(e) => {
                setBookEdited({ ...bookEdited, language: e.target.value });
              }}
              type="text"
              name="language"
            ></Input>
          </Infodiv>
        </Column>

        <Column>
          <Infodiv>
            <Label htmlFor="country">Country</Label>
            <Input
              value={bookEdited?.country}
              onChange={(e) => {
                setBookEdited({ ...bookEdited, country: e.target.value });
              }}
              type="text"
              name="country"
            ></Input>
          </Infodiv>
          <Infodiv>
            <Label htmlFor="pages">Pages</Label>
            <Input
              value={bookEdited?.pages}
              onChange={(e) => {
                setBookEdited({ ...bookEdited, pages: e.target.value });
              }}
              type="text"
              name="pages"
            ></Input>
          </Infodiv>
          <Infodiv>
            <Label htmlFor="format">Format</Label>
            <Input
              value={bookEdited?.format}
              onChange={(e) => {
                setBookEdited({ ...bookEdited, format: e.target.value });
              }}
              type="text"
              name="format"
            ></Input>
          </Infodiv>
          <Infodiv>
            <Label htmlFor="imageSrc">Upload cover</Label>
            <Button
              ref={uploadFieldRef}
              value={bookEdited?.imageSrc}
              onChange={(e) => {
                setBookEdited({ ...bookEdited, imageSrc: e.target.value });
              }}
              // onClick={openUpload}
              name="imageSrc"
              type="text"
              placeholder="Upload your image"
            ></Button>
            <button onClick={openUpload}>Upload</button>
            {/* <Input type="file" name="imageSrc" accept="image/*"></Input>
              <Input type="submit" value="Upload"></Input> */}
          </Infodiv>
          <Infodiv>
            <Label htmlFor="description">Description</Label>
            <Input
              value={bookEdited?.description}
              onChange={(e) => {
                setBookEdited({ ...bookEdited, description: e.target.value });
              }}
              type="text"
              name="description"
            ></Input>
          </Infodiv>
          <Infodiv>
            <Label htmlFor="stars">Rating (/5)</Label>
            <Input
              value={bookEdited?.stars}
              onChange={(e) => {
                setBookEdited({ ...bookEdited, stars: e.target.value });
              }}
              type="number"
              min="0"
              max="5"
              name="stars"
            ></Input>
          </Infodiv>
          <Infodiv>
            <Label htmlFor="comment">Comment</Label>
            <Input
              value={bookEdited?.comments}
              onChange={(e) => {
                setBookEdited({ ...bookEdited, comments: e.target.value });
              }}
              type="text"
              name="comment"
            ></Input>
          </Infodiv>
          <Infodiv>
            <Label htmlFor="quotes">Quotes</Label>
            <Input
              value={bookEdited?.quotes}
              onChange={(e) => {
                setBookEdited({ ...bookEdited, quotes: [e.target.value] });
              }}
              type="text"
              name="quotes"
            ></Input>
          </Infodiv>
          <Infodiv>
            <Label htmlFor="price">Price</Label>
            <Input
              value={bookEdited?.price}
              onChange={(e) => {
                setBookEdited({ ...bookEdited, price: e.target.value });
              }}
              type="text"
              name="price"
            ></Input>
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
  /* width: calc(100% - 400px); */
  width: calc(100% - 125px);
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

const Input = styled.input``;

const Button = styled.input`
  width: 200px;
  height: 40px;
`;

const AddBookBtn = styled(ActionBtn)`
  margin: 0 auto;
`;

export default AddBookForm;
