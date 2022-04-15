import styled from "styled-components";
import OnlineContacts from "./OnlineContacts";
import Recommendations from "./Recommendations";

const Contacts = () => {

 
    return (
        <ContactsWrapper>
            <OnlineContacts />
            <Recommendations />

        </ContactsWrapper>
    )
};

const ContactsWrapper = styled.aside`
  position: relative;
  float: right;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  
  width: 275px;
  height: calc(100vh - 70px);
  box-shadow: -2px 2px 6px #e5e5e5;
  /* background-color: #e5e5e5; */
`;

export default Contacts;