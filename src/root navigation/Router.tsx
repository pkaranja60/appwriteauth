import React, { useContext, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AppwriteContext } from '../appwrite/AppwriteContext';

import Loading from '../components/Loading';

import { AuthStack } from './AuthStack';
import { RootNavigation } from './RootNavigation';

//Routes

export const Router = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { appwrite, isLoggedIn, setIsLoggedIn } = useContext(AppwriteContext);

  useEffect(() => {
    appwrite
      .getCurrentUser()
      .then(response => {
        setIsLoading(false);
        if (response) {
          setIsLoggedIn(true);
        }
      })
      .catch(_ => {
        setIsLoading(false);
        setIsLoggedIn(false);
      });
  }, [appwrite, setIsLoggedIn]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <NavigationContainer>
      {isLoggedIn ? <RootNavigation /> : <AuthStack />}
    </NavigationContainer>
  );
};
