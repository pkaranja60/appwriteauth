import { ID, Account, Client } from 'appwrite';
import Config from 'react-native-config';

import Toast from 'react-native-toast-message';

const appwriteClient = new Client();

const APPWRITE_ENDPOINT: string = Config.APPWRITE_ENDPOINT!;
const APPWRITE_PROJECT_ID: string = Config.APPWRITE_PROJECT_ID!;

type CreateUserAccount = {
  email: string;
  password: string;
  name: string;
};

type LoginUserAccount = {
  email: string;
  password: string;
};

class AppwriteService {
  account;

  constructor() {
    appwriteClient
      .setEndpoint(APPWRITE_ENDPOINT)
      .setProject(APPWRITE_PROJECT_ID);

    this.account = new Account(appwriteClient);
  }

  //create a new record of user inside in appwrite
  async createAccount({ email, password, name }: CreateUserAccount) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name,
      );

      if (userAccount) {
        // Todo: create login feature
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      Toast.show({
        type: String(error),
        text1: String(error),
        visibilityTime: Number(3000),
        autoHide: Boolean(true),
      });

      console.log('Appwrite service :: CreateUserAccount() ::' + error);
    }
  }

  //login user account
  async login({ email, password }: LoginUserAccount) {
    try {
      return await this.account.createEmailSession(email, password);
    } catch (error) {
      Toast.show({
        type: String(error),
        text1: String(error),
        visibilityTime: Number(3000),
        autoHide: Boolean(true),
      });

      console.log('Appwrite service :: LoginUserAccount() ::' + error);
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log('Appwrite service :: getCurrentAccount() ::' + error);
    }
  }

  async logout() {
    try {
      return await this.account.deleteSession('current');
    } catch (error) {
      Toast.show({
        type: String(error),
        text1: String(error),
        visibilityTime: Number(3000),
        autoHide: Boolean(true),
      });

      console.log('Appwrite service :: logout() ::' + error);
    }
  }
}

export default AppwriteService;
