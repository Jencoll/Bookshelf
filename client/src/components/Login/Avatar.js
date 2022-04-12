import styled from "styled-components";
// import { useContext } from "react";
// import { UsersContext } from "../UsersContext";

const Avatar = ({ userProfile, showOnlineStatus }) => {
  return (
    <Avatarwrapper>
      {showOnlineStatus === "false" ? (
        <AvatarImg alt="avatar" src={userProfile?.info.avatarUrl}></AvatarImg>
      ) : (
        <AvatarImg
          alt="avatar"
          isOnline
          src={userProfile?.info.avatarUrl}
        ></AvatarImg>
      )}
    </Avatarwrapper>
  );
};

const Avatarwrapper = styled.div`
  width: 45px;
  height: 45px;
  cursor: pointer;
`;

const AvatarImg = styled.img`
  width: 100%;
  border-radius: 50%;
  box-shadow: 2px 2px 2px #e5e5e5;
  border: ${(props) => (props.isOnline ? "2px solid #14ae5c" : "none")};
`;

export default Avatar;
