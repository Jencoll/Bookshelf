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
    justify-content: space-evenly;
    padding: 3px 6px;
    width: 150px;
    height: 60px;
    background-color: #fff;
`;

export default LoginBox;