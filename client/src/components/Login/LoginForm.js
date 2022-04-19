import styled from "styled-components";
import { useState, useContext, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { FormWrapper, BookInfoForm, FormTitle, Label, Input } from "../Header/AddBookForm";
import { UsersContext } from "../UsersContext";

const LoginForm = () => {
    // afficher texte du bouton et du titre en conséquence de ce qu'on veut (créer compte ou login)
    const { currentUserId, setCurrentUserId, currentUserPassword, setCurrentUserPassword, setCurrentUserProfile, status, setStatus, setErrorMsg, errorMsg } = useContext(UsersContext);
    let history = useHistory();

    console.log(status);

    useEffect(() => {
        if (status === "success") {
            history.push("/");
        }

    }, [status]);

    return (
      <LoginFormWrapper>
        <FormTitle>Log in</FormTitle>
        <UserLoginForm
          onSubmit={(e) => {
            e.preventDefault();
            setCurrentUserId(e.target.elements.username.value);
            setCurrentUserPassword(e.target.elements.password.value);
          }}
        >
          <FieldSet>
            <Label htmlFor="username">Username</Label>
            <Input
              //   value=""
              type="text"
              name="username"
              required
            ></Input>
          </FieldSet>
          <FieldSet>
            <Label htmlFor="password">Password</Label>
            <Input
              //   value=""
              type="password"
              name="password"
              required
            ></Input>
          </FieldSet>
          <LoginButton type="submit">Log in</LoginButton>
          {status === "error" && <ErrorParagraph>{errorMsg}</ErrorParagraph>}
          <CreateAccountLink to="/signup">Create an account</CreateAccountLink>
        </UserLoginForm>
      </LoginFormWrapper>
    );
};

const LoginFormWrapper = styled(FormWrapper)`
    align-items: center;
`;

export const UserLoginForm = styled.form`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: fit-content;
  padding: 24px;
  margin-top: 24px;
  height: fit-content;
  box-shadow: 0 1px 4px rgb(0 0 0 / 10%), 0 0 40px rgb(0 0 0 / 1%) inset;
  border-radius: 10px / 10px;

  &::before,
  &::after {
    content: "";
    position: absolute;
    z-index: -1;
    box-shadow: 0 0 10px rgb(0 0 0 / 20%);
    top: 1%;
    bottom: 1%;
    left: 1%;
    right: 1%;
    border-radius: 10px / 10px;
  }

  &::after {
    right: 10px;
    left: auto;
    transform: skew(8deg) rotate(3deg);
  }
`;

export const FieldSet = styled.fieldset`
    position: relative;
    display: flex;
    align-items: center;
    margin: 24px 0;

`;

export const LoginButton = styled.button`
    width: 50%;
    height: 40px;
    margin: 24px auto;
`;

const ErrorParagraph = styled.p`
  text-align: center;
  margin: 8px;
  color: red;
  font-weight: 600;
  padding: 8px;
  font-size: 16px;
  text-transform: uppercase;
`;

const CreateAccountLink = styled(Link)`
  text-align: center;
  text-decoration: underline #9bbbae;
  text-decoration-thickness: 3px;
  padding: 8px;
`;  

export default LoginForm;