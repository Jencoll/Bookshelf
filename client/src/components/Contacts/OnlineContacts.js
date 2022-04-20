import styled from "styled-components";
import { useContext, useState } from "react";
import Avatar from "../Login/Avatar";
import { UsersContext } from "../UsersContext";

const OnlineContacts = () => {
   const { contacts } = useContext(UsersContext);
   const [onlineContacts, setOnlineContacts] = useState([]);

   contacts?.forEach((contact) => {
       if (contact.isOnline === true) {
           setOnlineContacts(contact);
       }
   });
    return (
    
      <OnlineContactsWrapper>
  
        {/* {contacts.map(contact => ({
            if (contact.isOnline) {
                <Avatar key={contact._id} userProfile={contact} />
            }
        }) */}
        
          {/* <Avatar key={contact._id} userProfile={contact} showOnlineStatus="true" /> */}
     
      </OnlineContactsWrapper>
    );

};

const OnlineContactsWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 200px;
  height: fit-content;
  border-radius: 5px;
  box-shadow: 0px 1px 2px #14ae5c;
  padding: 12px 0;
`;

export default OnlineContacts;