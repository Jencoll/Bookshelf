import styled from "styled-components";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { BiLogInCircle, BiLogOutCircle } from "react-icons/bi";
import { ActionBtn } from "../Header/Header";
import { UsersContext } from "../UsersContext";

const Login = () => {
  const { setCurrentUserProfile, currentUserId, setCurrentUserId, setCurrentUserPassword, setStatus } = useContext(UsersContext);
  let history = useHistory();

    const handleLogInOut = (e) => {
      e.preventDefault();
      setCurrentUserId(null);
      setCurrentUserProfile(null);
      setCurrentUserPassword(null);
      setStatus("logout");
      history.push("/");
    }

    // when a user is not logged in, login appears; otherwise, it's logout
    return (
      <Loginwrapper>
        {currentUserId ? (
          <Btndiv>
            <ActionBtn
              onClick={(e) => {
                handleLogInOut(e);
              }}
            >
              <BiLogOutCircle style={{ color: "#386C5F" }} />
            </ActionBtn>
            <Span>Logout</Span>
          </Btndiv>
        ) : (
          <Btndiv>
            <ActionBtn
              onClick={() => {
                history.push("/login");
              }}
            >
              <BiLogInCircle style={{ color: "#386C5F" }} />
            </ActionBtn>
            <Span>Login</Span>
          </Btndiv>
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

const Btndiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const Span = styled.span`
  font-size: 12px;
  padding: 4px 0;
  text-align: center;
`;

export default Login;