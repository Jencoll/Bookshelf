import { createContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import usePersistedState from "./usePersistedState";

export const UsersContext = createContext();

export const UsersProvider = ({ children }) => {
  const [currentUserId, setCurrentUserId] = usePersistedState(null, "current-user");
  const [currentUserPassword, setCurrentUserPassword] = usePersistedState(null, "password");
  //  const [currentUserId, setCurrentUserId] = useState(null);
  //  const [currentUserPassword, setCurrentUserPassword] = useState(null);
  const [currentUserProfile, setCurrentUserProfile] = useState(null);
  const [onlineContacts, setOnlineContacts] = useState([]);
  const [contacts, setContacts] = useState(null);
  const [status, setStatus] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  let history = useHistory();

  useEffect(() => {
    const loginUser = async () => {
      if (!currentUserId || !currentUserPassword) {
        return;
      }
      // console.log("Quand est-ce que c'est appelé? ", currentUserId, currentUserPassword);
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
        history.push("/");
      } catch (err) {
        setStatus("error");
        setErrorMsg("User not found");
        // console.log("Something went wrong: ", err.message);
      }
    };

    loginUser();
  }, [currentUserId, currentUserPassword]);

  // useEffect(() => {

  // }, []);

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
