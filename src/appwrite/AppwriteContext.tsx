// import React, { FC, PropsWithChildren, createContext, useState } from 'react';

// import Appwrite from './service';

// type AppContextType = {
//   appwrite: Appwrite;
//   isLoggedIn: Boolean;
//   setIsLoggedIn: (isLoggedIn: boolean) => void;
// };

// export const AppwriteContext = createContext<AppContextType>({
//   appwrite: new Appwrite(),
//   isLoggedIn: false,
//   setIsLoggedIn: () => {},
// });

// export const AppwriteProvider: FC<PropsWithChildren> = ({ children }) => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   const defaultValue = {
//     appwrite: new Appwrite(),
//     isLoggedIn,
//     setIsLoggedIn,
//   };
//   return (
//     <AppwriteContext.Provider value={defaultValue}>
//       {children}
//     </AppwriteContext.Provider>
//   );
// };

import React, { FC, PropsWithChildren, createContext, useState } from 'react';
import AppwriteService from './service'; // Import your AppwriteService here

type AppContextType = {
  appwriteService: AppwriteService;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
};

export const AppwriteContext = createContext<AppContextType>({
  appwriteService: new AppwriteService(),
  setIsLoggedIn: () => {},
});

export const AppwriteProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const appwriteService = new AppwriteService();

  const setLoggedIn = (value: boolean) => {
    setIsLoggedIn(value);
  };

  const defaultValue = {
    appwriteService,
    setIsLoggedIn: setLoggedIn,
  };

  return (
    <AppwriteContext.Provider value={defaultValue}>
      {children}
    </AppwriteContext.Provider>
  );
};
