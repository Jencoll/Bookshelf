import { createContext, useEffect, useState } from "react";
import usePersistedState from "./usePersistedState";

export const UsersContext = createContext();

export const UsersProvider = ({ children }) => {
    const [currentUserId, setCurrentUserId] = usePersistedState("Jencol", "current-user");
    const [currentUserProfile, setCurrentUserProfile] = useState(null);
    const [onlineContacts, setOnlineContacts] = useState([]);
    const [contacts, setContacts] = useState(null);

    useEffect(() => {
        const getCurrentUser = async () => {
            try {
              const response = await fetch(`/api/get-user/${currentUserId}`);
              if (response.status !== 200) {
                throw new Error("Cannot fetch data.");
              }
              let data = await response.json();
            //   console.log(data.user);
              setCurrentUserProfile(data.user);
              // setContacts(data.user.contacts); // contacts id : endpoint pour les profils
            //   const onlineContactsResponse = await fetch(`/api/get-online-users`); // à modifier selon le currentUserId
            //   if (onlineContactsResponse.status !== 200) {
            //       throw new Error("Cannot fetch data.");
            //   }
            //   data = await onlineContactsResponse.json() ;
            //   console.log(data.onlineUsers);
            //   setOnlineContacts(data.onlineUsers);
            } catch (err) {
                console.log("Something went wrong: ", err.message);
            };
        };

        getCurrentUser();
    }, [currentUserId]);


    // useEffect(() => {

    // }, []);


    return (
        <UsersContext.Provider value={{ currentUserId, setCurrentUserId, currentUserProfile, setCurrentUserProfile, contacts, onlineContacts }}>{children}</UsersContext.Provider>
    )
};

// get users with query type

// useState currentUser

// useState contacts (friends)