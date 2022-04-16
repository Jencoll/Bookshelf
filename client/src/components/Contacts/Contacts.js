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
  height: 125px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: row;
  left: 125px;
  width: calc(100% - 125px);
  box-shadow: -2px 2px 6px #e5e5e5;



  display: none;
  /* background-color: #e5e5e5; */
  
  @media (min-width: 770px) {
    height: calc(100vh - 70px);
    flex-direction: column;
    float: right;
    left: 0;
    width: 275px;
  }
`;

export default Contacts;