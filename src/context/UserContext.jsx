import { createContext, useEffect, useState } from "react";

export let UserContext = createContext();

export default function UserContextProvider({ children }) {
  const [userLoginData, setUserLoginData] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      setUserLoginData(localStorage.getItem("accessToken"));
    }
  }, []);
  return (
    <UserContext.Provider value={{ userLoginData, setUserLoginData }}>
      {children}
    </UserContext.Provider>
  );
}
