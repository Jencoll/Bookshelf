import { useEffect, useState } from "react";

const usePersistedState = (defaultValue, name) => {
    const [value, setValue] = useState(() => {
        return sessionStorage.getItem(name) 
        ? JSON.parse(sessionStorage.getItem(name))
        : defaultValue;
    });
    useEffect(() => {
        sessionStorage.setItem(name, JSON.stringify(value));
    }, [value, name]);

    return [value, setValue];
}

export default usePersistedState;