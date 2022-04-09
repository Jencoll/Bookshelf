import styled from "styled-components";
import Avatar from "./Avatar";
import Login from "./Login";

const LoginBox = () => {

    return (
        <Boxwrapper>
            <Avatar />
            <Login />
        </Boxwrapper>
    )
};

const Boxwrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* margin-left: auto;
  margin-right: 24px; */
  /* padding: 3px 6px; */
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