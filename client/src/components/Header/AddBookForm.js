import styled from "styled-components";
import { useContext, useState, useEffect, useRef } from "react";
import { useHistory, useParams } from "react-router-dom";
import { BsAsterisk } from "react-icons/bs";
import { BiBookAdd } from "react-icons/bi";
import { ActionBtn } from "./Header";
import { BooksContext } from "../BooksContext";
import openUpload from "../CloudinaryUploadWidget";
import { CloudinaryContext } from "../CloudinaryUploadWidget";
import { UsersContext } from "../UsersContext";
// import { useForm } from "react-hook-form";

const AddBookForm = ({ toEdit }) => {
  const { addOrModifyUserBook, formElements, setFormElements, book, setBook, addOrModifyBook } = useContext(BooksContext);
  const { currentUserProfile, setCurrentUserProfile } = useContext(UsersContext);
  const { fileUrlUploaded, setFileUrlUploaded, openUpload } = useContext(CloudinaryContext);
  const [bookEdited, setBookEdited] = useState(toEdit ? book : {});
  const userBook = currentUserProfile?.userLibrary.find(b => b.isbn === book?.isbn);
  const [userBookEdited, setUserBookEdited] = useState(toEdit ? userBook : {});
  let history = useHistory();
  const isbnRef = useRef();


  useEffect(() => {
    if (fileUrlUploaded) {
      setBookEdited({ ...bookEdited, imageSrc: fileUrlUploaded });
    }
  }, [fileUrlUploaded]);

  const formatField = (field) => {
    return field ? field : "";
  }

  const handleSubmit = async () => {    
    await addOrModifyBook(bookEdited, toEdit);
    userBookEdited.isbn = isbnRef.current.value;
    await addOrModifyUserBook(userBookEdited);
    setBook(bookEdited);
    history.push(`/book/${bookEdited.isbn}`);
  };

  if (!bookEdited || !userBookEdited) {
    return <p>loading</p>;
  } 

  return (
    <FormWrapper>
      <FormTitle>
        {toEdit ? "Edit your book information" : "Add your book information"}
      </FormTitle>
      <BookInfoForm
        action=""
        method="put"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <Column>
          <Infodiv>
            <Legend>ISBN</Legend>
            <Label htmlFor="isbn">
              {/* <BsAsterisk style={{ fontSize: "14px" }} /> ISBN */}
            </Label>
            <Input
              readOnly={toEdit}
              value={formatField(bookEdited.isbn)}
              onChange={(e) => {
                setBookEdited({ ...bookEdited, isbn: e.target.value });
              }}
              type="text"
              name="isbn"
              ref={isbnRef}
              placeholder="No need of the hyphens"
              required
            ></Input>
          </Infodiv>
          <Infodiv>
            <Label htmlFor="title">
              <BsAsterisk style={{ fontSize: "14px" }} /> Title
            </Label>
            <Input
              value={formatField(bookEdited.title)}
              onChange={(e) => {
                setBookEdited({ ...bookEdited, title: e.target.value });
              }}
              type="text"
              name="title"
              required
            ></Input>
          </Infodiv>
          <Infodiv>
            <Label htmlFor="authors">
              <BsAsterisk style={{ fontSize: "14px" }} /> Author
            </Label>
            <Input
              value={formatField(bookEdited.authors)}
              onChange={(e) => {
                setBookEdited({ ...bookEdited, authors: [e.target.value] });
              }}
              type="text"
              name="authors"
              required
            ></Input>
          </Infodiv>
          <Infodiv>
            <Label htmlFor="subtitle">Subtitle</Label>
            <Input
              value={formatField(bookEdited.subtitle)}
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
              value={formatField(bookEdited.publisher)}
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
              value={formatField(bookEdited.collection)}
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
              value={formatField(bookEdited.translators)}
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
              value={formatField(bookEdited.yearOfPublication)}
              onChange={(e) => {
                setBookEdited({
                  ...bookEdited,
                  yearOfPublication: e.target.value,
                });
              }}
              type="text"
              name="yearOfPublication"
            ></Input>
          </Infodiv>
          <Infodiv>
            <Label htmlFor="firstYearOfPub">First Edition</Label>
            <Input
              value={formatField(bookEdited.firstYearOfPub)}
              onChange={(e) => {
                setBookEdited({
                  ...bookEdited,
                  firstYearOfPub: e.target.value,
                });
              }}
              type="text"
              name="firstYearOfPub"
            ></Input>
          </Infodiv>
          <Infodiv>
            <Label htmlFor="language">Language</Label>
            <Input
              value={formatField(bookEdited.language)}
              onChange={(e) => {
                setBookEdited({ ...bookEdited, language: e.target.value });
              }}
              type="text"
              name="language"
            ></Input>
          </Infodiv>
          <Infodiv>
            <Label htmlFor="country">Country</Label>
            <Input
              value={formatField(bookEdited.country)}
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
              value={formatField(bookEdited.pages)}
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
              value={formatField(bookEdited.format)}
              onChange={(e) => {
                setBookEdited({ ...bookEdited, format: e.target.value });
              }}
              type="text"
              name="format"
            ></Input>
          </Infodiv>
        </Column>

        <Column>
          <Infodiv>
            <Label htmlFor="imageSrc">Upload cover</Label>
            <Input
              // value={bookEdited ? bookEdited.imageSrc : ""}
              value={formatField(bookEdited.imageSrc)}
              onChange={(e) => {
                setBookEdited({ ...bookEdited, imageSrc: e.target.value });
              }}
              // onClick={openUpload}
              name="imageSrc"
              type="text"
              placeholder="Paste image url"
            ></Input>
            <button onClick={openUpload}>Upload</button>
          </Infodiv>
          <Infodiv>
            <Label htmlFor="description">Description</Label>
            <TextArea
              // maxLength={500}
              rows={10}
              cols={35}
              value={formatField(bookEdited.description)}
              onChange={(e) => {
                setBookEdited({ ...bookEdited, description: e.target.value });
              }}
              type="text"
              name="description"
            ></TextArea>
          </Infodiv>
          <Infodiv>
            <Label htmlFor="stars">Rating (/5)</Label>
            <Input
              value={formatField(bookEdited.stars)}
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
            <TextArea
              rows={10}
              cols={35}
              value={formatField(bookEdited.comments)}
              onChange={(e) => {
                setBookEdited({ ...bookEdited, comments: e.target.value });
              }}
              type="text"
              name="comment"
            ></TextArea>
          </Infodiv>
          <Infodiv>
            <Label htmlFor="quotes">Quotes</Label>
            <TextArea
              rows={10}
              cols={35}
              value={formatField(bookEdited.quotes)}
              onChange={(e) => {
                setBookEdited({ ...bookEdited, quotes: [e.target.value] });
              }}
              type="text"
              name="quotes"
            ></TextArea>
          </Infodiv>
          <Infodiv>
            <Label htmlFor="price">Price</Label>
            <Input
              value={formatField(bookEdited.price)}
              onChange={(e) => {
                setBookEdited({ ...bookEdited, price: e.target.value });
              }}
              type="text"
              name="price"
            ></Input>
          </Infodiv>
          {/* <AddBookBtn>
            <BiBookAdd />
          </AddBookBtn> */}
        </Column>
      </BookInfoForm>

      {/* form to modify user book information (in userLibrary) */}
      <UserBookForm onSubmit={(e) => {
        e.preventDefault();
      }}>
        <Infodiv>
          <Label htmlFor="category">Category</Label>
          <Input
            value={userBookEdited?.category}
            onChange={(e) => {
              setUserBookEdited({
                ...userBookEdited,
                category: e.target.value,
              });
            }}
            type="text"
            name="category"
          ></Input>
        </Infodiv>
      </UserBookForm>
      <AddBookBtn
        onClick={() => {
          handleSubmit();
          // history.push(`/book/${book.isbn}`);
        }}
      >
        <BiBookAdd />
      </AddBookBtn>
    </FormWrapper>
  );
};

export const FormWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  /* left: 125px; */
  /* width: calc(100% - 400px); */
  /* width: calc(100% - 125px);  */
  height: calc(100% - 70px);
  padding: 24px;

  @media (min-width: 770px) {
    left: 125px;
  /* width: calc(100% - 400px); */
  width: calc(100% - 125px);
  }
`;

export const BookInfoForm = styled.form`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  padding: 24px;
  /* min-height: 600px; */

  @media (min-width: 1200px) {
    min-height: 600px;
  }
`;

export const FormTitle = styled.h2`
  font-weight: 600;
  font-size: 24px;
  padding: 24px;
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: 320px;
  min-height: 700px;

  @media (min-width: 500px) {
    width: 445px;
  }
`;

const Infodiv = styled.fieldset`
  display: flex;
  align-items: center;
  min-width: 320px;
  max-width: 400px;
`;

const Legend = styled.legend`
  background-color: #000;
  color: #fff;
  padding: 3px 6px;
`;

export const Label = styled.label`
  font-size: 18px;
  text-align: left;
  width: fit-content;
  padding-right: 24px;
  /* line-height: 30px; */

  @media (min-width: 510px) {
    line-height: 30px;
  }
`;

export const Input = styled.input`
  border: none;
  border-bottom: 1px solid #000;
  border-radius: 0;
  height: 30px;
  padding: 0;
  width: 175px;

  &:focus {
    outline: none;
    box-shadow: 1px 1px 5px #000;
    border-radius: 5px;
  }

  @media (min-width: 510px) {
    width: 250px;
    padding-left: 12px;
  }
`;

const TextArea = styled.textarea`

`;

const Button = styled.input`
  width: 200px;
  height: 40px;
`;

const AddBookBtn = styled(ActionBtn)`
  margin: 0 auto;
`;

const UserBookForm = styled.form`
  display: flex;
  justify-content: left;
  width: 445px;
  padding: 24px 0;
  margin: 0 auto;
`;

export default AddBookForm;
