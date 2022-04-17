import styled from "styled-components";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { BiLogInCircle, BiLogOutCircle } from "react-icons/bi";
import { ActionBtn } from "../Header/Header";
import { UsersContext } from "../UsersContext";

const Login = () => {
  const { currentUserProfile, 
    setCurrentUserProfile, currentUserId, setCurrentUserId, currentUserPassword, setCurrentUserPassword } = useContext(UsersContext);
  let history = useHistory();
    // on click, a modal is displayed to show a form for the login process or the sign up process, in the form, there will be a link to another form if the user account is not created yet

    const handleLogInOut = (e) => {
      e.preventDefault();
      setCurrentUserId(null);
      setCurrentUserProfile(null);
      history.push("/");
    }


    // when a user is not logged in, login appears; otherwise, it's logout
    return (
      <Loginwrapper>
        {currentUserId ? (
          <ActionBtn
            onClick={(e) => {
              handleLogInOut(e);
            }}
          >
            <BiLogOutCircle />
          </ActionBtn>
        ) : (
          <ActionBtn
            onClick={() => {
              history.push("/login");
            }}
          >
            <BiLogInCircle />
          </ActionBtn>
        )}
      </Loginwrapper>
    );
}

const Loginwrapper = styled.div` 
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: fit-content;
    height: 45px;
`;


export default Login;