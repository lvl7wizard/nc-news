import { createContext } from 'react';
import { useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  console.log("userprovider")
  const [currentUser, setCurrentUser] = useState({
    "username": "jessjelly",
    "name": "Jess Jelly",
    "avatar_url": "https://vignette.wikia.nocookie.net/mrmen/images/4/4f/MR_JELLY_4A.jpg/revision/latest?cb=20180104121141"
    });

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
};