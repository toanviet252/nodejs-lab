import { createContext, useState } from 'react';

const AuthContext = createContext();
const AuthContextProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [userData, setUserData] = useState({});
  const loggedIn = () => setIsAuth(true);
  const loggedOut = () => setIsAuth(false);
  const clearUserData = () => setUserData({});
  const value = {
    isAuth,
    loggedIn,
    userData,
    setUserData,
    loggedOut,
    clearUserData,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
export { AuthContext, AuthContextProvider };
