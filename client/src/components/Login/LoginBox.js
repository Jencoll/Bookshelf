import styled from "styled-components";
import { useContext } from "react";
import { UsersContext } from "../UsersContext";
import Avatar from "./Avatar";
import Login from "./Login";

const LoginBox = () => {
    const { currentUserProfile } = useContext(UsersContext);

    return (
      <Boxwrapper>
        {currentUserProfile && (
          <Avatar userProfile={currentUserProfile} showOnlineStatus="false" />
        )}
        <Login />
      </Boxwrapper>
    );
};

const Boxwrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100px;
  height: 60px;
  background-color: #fff;

  @media (min-width: 770px) {
    padding: 3px 6px;
    width: 150px;
    justify-content: space-evenly;
  }
`;

export default LoginBox;