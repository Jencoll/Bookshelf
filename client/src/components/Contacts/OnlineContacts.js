import styled from "styled-components";
import { useContext, useState } from "react";
import Avatar from "../Login/Avatar";
import { UsersContext } from "../UsersContext";

const OnlineContacts = () => {
   const { contacts } = useContext(UsersContext);
   const [onlineContacts, setOnlineContacts] = useState([]);

//    console.log(contacts);

   contacts?.forEach((contact) => {
       if (contact.isOnline === true) {
           setOnlineContacts(contact);
       }
   });
//    console.log(onlineContacts);
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
  /* border: 1px solid #14ae5c; */
  border-radius: 5px;
  box-shadow: 0px 1px 2px #14ae5c;
  padding: 12px 0;

  /* background-color: aliceblue; */
`;

export default OnlineContacts;