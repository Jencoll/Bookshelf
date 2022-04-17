import styled from "styled-components";
import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { FormWrapper, BookInfoForm, FormTitle, Label, Input } from "../Header/AddBookForm";
import { UsersContext } from "../UsersContext";

const LoginForm = () => {
    // afficher texte du bouton et du titre en conséquence de ce qu'on veut (créer compte ou login)
    const { currentUserId, setCurrentUserId, currentUserPassword, setCurrentUserPassword, setCurrentUserProfile, status, setStatus, setErrorMsg, errorMsg } = useContext(UsersContext);
    let history = useHistory();

    console.log(status);
/*
    const loginUser = async (e) => {
      e.preventDefault();
      if (!currentUserId || !currentUserPassword) {
        return;
      }
      console.log(
        "Quand est-ce que c'est appelé? ",
        currentUserId,
        currentUserPassword
      );
      try {
        const response = await fetch(`/api/login`, {
          method: "POST",
          body: JSON.stringify({
            _id: e.target.elements.username.value,
            password: e.target.elements.password.value,
          }),
          headers: {
            Accepts: "application/json",
            "Content-Type": "application/json",
          },
        });
        if (response.status !== 200) {
          throw new Error("Cannot fetch data.");
        }
        let data = await response.json();
        setStatus("success");
        setCurrentUserProfile(data.user);
        history.push("/");
      } catch (err) {
        setStatus("error");
        setErrorMsg("User not found");
        // console.log("Something went wrong: ", err.message);
      }
    };
*/


    return (
      <LoginFormWrapper>
        <FormTitle>Log in</FormTitle>
        <UserLoginForm onSubmit={(e) => {
            e.preventDefault();
            setCurrentUserId(e.target.elements.username.value);
            setCurrentUserPassword(e.target.elements.password.value);
            history.push("/");
        }}>
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
        </UserLoginForm>
      </LoginFormWrapper>
    );
};

const LoginFormWrapper = styled(FormWrapper)`
    align-items: center;
`;

const UserLoginForm = styled.form`
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

const FieldSet = styled.fieldset`
    display: flex;
    align-items: center;
    margin: 24px 0;

`;

const LoginInput = styled.input`
    border: none;

`;

const LoginButton = styled.button`
    width: 50%;
    height: 40px;
    margin: 24px auto;
`;

const ErrorParagraph = styled.p`
  text-align: center;
  margin-top: 8px;
  color: red;
  font-weight: 600;
  background-color: rgba(255, 255, 255, 0.7);
  border: 1px solid var(--primary-color);
  border-radius: 5px;
  padding: 8px;
  font-size: 16px;
  text-transform: uppercase;
  text-shadow: 1px 1px var(--primary-color);
`;

export default LoginForm;