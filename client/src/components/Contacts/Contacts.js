import styled from "styled-components";
import OnlineContacts from "./OnlineContacts";


const Contacts = () => {

 
    return (
        <ContactsWrapper>
            <OnlineContacts />

        </ContactsWrapper>
    )
};

const ContactsWrapper = styled.aside`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  margin-left: auto;
  width: 275px;
  height: calc(100vh - 70px);

  background-color: antiquewhite;
`;

export default Contacts;