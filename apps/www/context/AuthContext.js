"use client";

import { me_user } from "../../actions/auth/loginAction";

const { createContext, useState, useEffect } = require("react");

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const checkUserLoggedIn = async () => {
      const data = await me_user();
      // console.log(data);

      if (data?.error) setUser(null);
      else setUser(data.user);
    };
    checkUserLoggedIn();
  }, []);
  const loginContext = (user) => {
    setUser(user);
  };
  const logoutContext = () => {
    setUser(null);
  };
  return (
    <AuthContext.Provider value={{ user, loginContext, logoutContext }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
