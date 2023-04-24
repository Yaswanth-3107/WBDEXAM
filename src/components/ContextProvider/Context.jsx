import React, { createContext, useEffect, useState } from "react";

export const LoginContext = createContext(null);

const Context = ({ children }) => {
  const [logindata, setLoginData] = useState(null);

  // Load the userData state from localStorage on mount
  useEffect(() => {
    const savedUserData = localStorage.getItem("loginData");
    if (savedUserData) {
      setLoginData(JSON.parse(savedUserData));
    }
  }, []);

  // Save the userData state to localStorage whenever it changes
  // useEffect(() => {
  //   localStorage.setItem("loginData", JSON.stringify(logindata));
  // }, [logindata]);

  return (
    <LoginContext.Provider value={{ logindata, setLoginData }}>
      {children}
    </LoginContext.Provider>
  );
};

export default Context;
