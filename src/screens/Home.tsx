import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';

import Toast from 'react-native-toast-message';

//context API
import { AppwriteContext } from '../appwrite/AppwriteContext';

type userObj = {
  name: String;
  email: String;
};

const Home = () => {
  const [userData, setUserData] = useState<userObj>();
  const { appwriteService, setIsLoggedIn } = useContext(AppwriteContext);

  const handleLogout = () => {
    appwriteService.logout().then(() => {
      setIsLoggedIn(false);
      Toast.show({
        type: 'info',
        text1: 'Logged out Successfully',
        visibilityTime: Number(3000),
        autoHide: Boolean(true),
      });
    });
  };

  useEffect(() => {
    appwriteService.getCurrentUser().then(response => {
      if (response) {
        const user: userObj = {
          name: response.name,
          email: response.email,
        };
        setUserData(user);
      }
    });
  }, [appwriteService]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.welcomeContainer}>
        <Image
          source={{
            uri: 'https://appwrite.io/images-ee/blog/og-private-beta.png',
            width: 400,
            height: 400,
            cache: 'default',
          }}
          resizeMode="contain"
        />
        <Text>Build Fast. Scale Big. All in one Place.</Text>
        {userData && (
          <View style={styles.userContainer}>
            <Text style={styles.userDetails}>Name: {userData.name}</Text>
            <Text style={styles.userDetails}>Email: {userData.email}</Text>
          </View>
        )}
      </View>
      <TouchableOpacity onPress={handleLogout} style={styles.logout} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  welcomeContainer: {},
  userContainer: {},
  userDetails: {},
  logout: {},
});

export default Home;
