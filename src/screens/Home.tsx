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
  const { appwrite, setIsLoggedIn } = useContext(AppwriteContext);

  const handleLogout = () => {
    appwrite.logout().then(() => {
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
    appwrite.getCurrentUser().then(response => {
      if (response) {
        const user: userObj = {
          name: response.name,
          email: response.email,
        };
        setUserData(user);
      }
    });
  }, [appwrite]);

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
        <Text style={styles.message}>
          Build Fast. Scale Big. All in one Place.
        </Text>
        {userData && (
          <View style={styles.userContainer}>
            <Text style={styles.userDetails}>Name: {userData.name}</Text>
            <Text style={styles.userDetails}>Email: {userData.email}</Text>
          </View>
        )}
      </View>
      <TouchableOpacity onPress={handleLogout} style={styles.logout}>
        Logout
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0D32',
  },
  welcomeContainer: {
    padding: 12,

    flex: 1,
    alignItems: 'center',
  },
  message: {
    fontSize: 26,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  userContainer: {
    marginTop: 24,
  },
  userDetails: {
    fontSize: 20,
    color: '#FFFFFF',
  },
  logout
});

export default Home;
