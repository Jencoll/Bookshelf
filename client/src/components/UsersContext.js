import { createContext, useEffect, useState } from "react";
import usePersistedState from "./usePersistedState";

export const UsersContext = createContext();

export const UsersProvider = ({ children }) => {
  const [currentUserId, setCurrentUserId] = usePersistedState(null, "current-user");
  const [currentUserPassword, setCurrentUserPassword] = usePersistedState(null, "password");
  const [currentUserProfile, setCurrentUserProfile] = useState(null);
  const [onlineContacts, setOnlineContacts] = useState([]);
  const [contacts, setContacts] = useState(null);
  const [status, setStatus] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    const loginUser = async () => {
      if (!currentUserId || !currentUserPassword) {
        return;
      }

      try {
        const response = await fetch(`/api/login`, {
          method: "POST",
          body: JSON.stringify({
            _id: currentUserId,
            password: currentUserPassword,
          }),
          headers: {
            Accepts: "application/json",
            "Content-Type": "application/json",
          },
        });
        if (response.status !== 200) {
          throw new Error("Cannot fetch data.");
        } 
          let data = await response.json();
          setStatus("success");
          setCurrentUserProfile(data.user);        
      } catch (err) {
        setCurrentUserId(null);
        setCurrentUserPassword(null);
        setStatus("error");
        setErrorMsg("Credentials don't match");
      }
    };

    loginUser();

  }, [currentUserId, currentUserPassword]);


  return (
    <UsersContext.Provider
      value={{
        currentUserId,
        setCurrentUserId,
        currentUserProfile,
        setCurrentUserProfile,
        contacts,
        onlineContacts,
        currentUserPassword,
        setCurrentUserPassword,
        status,
        setStatus,
        errorMsg,
        setErrorMsg
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};

// get users with query type

// useState currentUser

// useState contacts (friends)
