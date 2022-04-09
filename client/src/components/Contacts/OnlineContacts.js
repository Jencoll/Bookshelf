import styled from "styled-components";
import Avatar from "../Login/Avatar";

const OnlineContacts = () => {

    return (
      <OnlineContactsWrapper>
        {/* when a user is online, he/she may appear here (select 5 randomly) */}
        <Avatar />
      </OnlineContactsWrapper>
    );

};

const OnlineContactsWrapper = styled.div`
    display: flex;
    width: 200px;
    height: 50px;


    background-color: aliceblue;
`;

export default OnlineContacts;