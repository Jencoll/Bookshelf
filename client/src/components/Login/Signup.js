import styled from "styled-components";
import { useState, useContext, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { FormWrapper, BookInfoForm, FormTitle, Label, Input, Column } from "../Header/AddBookForm";
import { UserLoginForm, FieldSet, LoginButton } from "./LoginForm";
import { UsersContext } from "../UsersContext";
import { CloudinaryContext } from "../CloudinaryUploadWidget";
import Login from "./Login";

const Signup = () => {
    const { currentUserId, setCurrentUserId, currentUserPassword, setCurrentUserPassword, currentUserProfile, setCurrentUserProfile, status, setStatus, setErrorMsg, errorMsg } = useContext(UsersContext);
    const { fileUrlUploaded, setFileUrlUploaded, openUpload } =
    useContext(CloudinaryContext);
    let history = useHistory();
    const [userEdited, setUserEdited] = useState({});


    console.log("voici le user profile ", currentUserProfile);

     useEffect(() => {
       if (fileUrlUploaded) {
         let clonedUserEdited = {...userEdited};
         if (!clonedUserEdited.info) {
             clonedUserEdited.info = {};
         }
         clonedUserEdited.info.avatarUrl = fileUrlUploaded;
         setUserEdited(clonedUserEdited);
       }
     }, [fileUrlUploaded]);
    
    const formatField = (field) => {
      return field ? field : "";
    };

    const handleSignup = async () => {
        try {
            const response = await fetch(`/api/add-user`, {
              method: "POST",
              body: JSON.stringify(userEdited),
              headers: {
                Accepts: "application/json",
                "Content-Type": "application/json",
              },
            });
            await response.json();
            setFileUrlUploaded(null);
        } catch (err) {
            console.log(err.message);
        }
    }
    const setInfoField = (field, e) => {
         let tempUser = { ...userEdited };
         if (!tempUser.info) {
           tempUser.info = {};
         }
         tempUser.info[field] = e.target.value;
         setUserEdited(tempUser);
    };

    return (
      <SignupFormWrapper>
        <FormTitle>Create an account</FormTitle>
        <SignupForm
          onSubmit={(e) => {
            e.preventDefault();
            handleSignup();
            history.push("/login");
          }}
        >
          <SignupColumn>
            <FieldSet>
              <Label htmlFor="username">* Username</Label>
              <Input
                value={formatField(userEdited._id)}
                onChange={(e) => {
                  setUserEdited({ ...userEdited, _id: e.target.value });
                }}
                type="text"
                name="username"
                required
              ></Input>
            </FieldSet>
            <FieldSet>
              <Label htmlFor="password">* Password</Label>
              <Input
                value={formatField(userEdited.password)}
                onChange={(e) => {
                  setUserEdited({ ...userEdited, password: e.target.value });
                }}
                type="password"
                name="password"
                required
              ></Input>
            </FieldSet>
            <FieldSet>
              <Label htmlFor="firstName">* First name</Label>
              <Input
                value={formatField(userEdited.info?.firstName)}
                onChange={(e) => {
                    setInfoField("firstName", e);
                }}
                type="text"
                name="firstName"
                required
              ></Input>
            </FieldSet>
            <FieldSet>
              <Label htmlFor="lastName">* Last name</Label>
              <Input
                value={formatField(userEdited.info?.lastName)}
                onChange={(e) => {
                  setInfoField("lastName", e);
                }}
                type="text"
                name="lastName"
                required
              ></Input>
            </FieldSet>
            <FieldSet>
              <Label htmlFor="email">* Email</Label>
              <Input
                value={formatField(userEdited.info?.email)}
                onChange={(e) => {
                  setInfoField("email", e);
                }}
                type="email"
                name="email"
                required
              ></Input>
            </FieldSet>
          </SignupColumn>
          <SignupColumn>
            <FieldSet>
              <Label htmlFor="city">City</Label>
              <Input
                value={formatField(userEdited.info?.city)}
                onChange={(e) => {
                  setInfoField("city", e);
                }}
                type="text"
                name="city"
              ></Input>
            </FieldSet>
            <FieldSet>
              <Label htmlFor="province">Province</Label>
              <Input
                value={formatField(userEdited.info?.province)}
                onChange={(e) => {
                  setInfoField("province", e);
                }}
                type="text"
                name="province"
              ></Input>
            </FieldSet>
            <FieldSet>
              <Label htmlFor="country">Country</Label>
              <Input
                value={formatField(userEdited.info?.country)}
                onChange={(e) => {
                  setInfoField("country", e);
                }}
                type="text"
                name="country"
              ></Input>
            </FieldSet>
            <FieldSet>
              <Label htmlFor="language">Language</Label>
              <Input
                value={formatField(userEdited.info?.language)}
                onChange={(e) => {
                  setInfoField("language", e);
                }}
                type="text"
                name="language"
              ></Input>
            </FieldSet>
            <FieldSet>
              <Label htmlFor="avatarUrl">Picture</Label>
              <Input
                value={formatField(userEdited.info?.avatarUrl)}
                onChange={(e) => {
                  setInfoField("avatarUrl", e);
                }}
                type="text"
                name="avatarUrl"
                placeholder="Paste image url"
              ></Input>
              <button onClick={(e) => {
                e.preventDefault();
                openUpload();
              }}>Upload</button>
            </FieldSet>
            <LoginButton>Sign up</LoginButton>
          </SignupColumn>
        </SignupForm>
      </SignupFormWrapper>
    );
};


const SignupFormWrapper = styled(FormWrapper)`
    height: fit-content;
    min-height: auto;
    align-items: center;
`;

const SignupForm = styled(UserLoginForm)`

    @media (min-width: 1089px) {
        flex-direction: row;
    }
`;

const SignupColumn = styled(Column)`
    height: fit-content;
    min-height: auto;
`;


export default Signup;