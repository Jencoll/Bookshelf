import styled from "styled-components";
import { users } from "../../assets/users";

const Avatar = () => {
 
  return (
    <Imgwrapper>
      {users.map((user) => (
        <img alt="avatar" src={user.info.avatarUrl}></img>
      ))}
    </Imgwrapper>
  );
};

const Imgwrapper = styled.div`
  width: 45px;
  height: 45px;

  img {
    width: 100%;
    border-radius: 50%;
  }
`;

export default Avatar;
