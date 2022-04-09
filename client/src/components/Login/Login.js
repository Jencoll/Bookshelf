import styled from "styled-components";
import { BiLogInCircle, BiLogOutCircle } from "react-icons/bi";
import { ActionBtn } from "../Header/Header";

const Login = () => {

    // on click, a modal is displayed to show a form for the login process or the sign up process, in the form, there will be a link to another form if the user account is not created yet

    // when a user is not logged in, login appears; otherwise, it's logout
    return (
      <Loginwrapper>
        <ActionBtn><BiLogInCircle /></ActionBtn>
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