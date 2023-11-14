// import React, { useContext, useEffect, useState } from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { AppwriteContext } from '../appwrite/AppwriteContext';

// import Loading from '../components/Loading';

// import { AuthStack } from './AuthStack';
// import { RootNavigation } from './RootNavigation';

// //Routes

// export const Router = () => {
//   const [isLoading, setIsLoading] = useState<boolean>(true);
//   const { appwrite, isLoggedIn, setIsLoggedIn } = useContext(AppwriteContext);

//   useEffect(() => {
//     appwrite
//       .getCurrentUser()
//       .then(response => {
//         setIsLoading(false);
//         if (response) {
//           setIsLoggedIn(true);
//         }
//       })
//       .catch(_ => {
//         setIsLoading(false);
//         setIsLoggedIn(false);
//       });
//   }, [appwrite, setIsLoggedIn]);

//   if (isLoading) {
//     return <Loading />;
//   }

//   return (
//     <NavigationContainer>
//       {isLoggedIn ? <RootNavigation /> : <AuthStack />}
//     </NavigationContainer>
//   );
// };

import React, { useContext, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AppwriteContext } from '../appwrite/AppwriteContext';

import Loading from '../components/Loading';
import { AuthStack } from './AuthStack';
import { RootNavigation } from './RootNavigation';

export const Router = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { appwriteService, isLoggedIn, setIsLoggedIn } =
    useContext(AppwriteContext);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const response = await appwriteService.getCurrentUser();
        setIsLoggedIn(!!response); // Update isLoggedIn based on the response directly using the context setter
      } catch (error) {
        setIsLoggedIn(false); // If an error occurs, set isLoggedIn to false
      } finally {
        setIsLoading(false); // Set loading state to false in any case
      }
    };

    checkUser();
  }, [appwriteService, setIsLoggedIn]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <NavigationContainer>
      {isLoggedIn ? <RootNavigation /> : <AuthStack />}
    </NavigationContainer>
  );
};
