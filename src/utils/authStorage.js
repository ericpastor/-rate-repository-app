import AsyncStorage from "@react-native-async-storage/async-storage";

class AuthStorage {
  constructor(namespace = "auth") {
    this.namespace = namespace;
  }

  async getAccessToken() {
    // Get the access token for the storage
    const token = await AsyncStorage.getItem(`${this.namespace}:accessToken`);
    return JSON.parse(token);
  }

  async setAccessToken(accessToken) {
    // Add the access token to the storage
    const token = JSON.stringify(accessToken);
    await AsyncStorage.setItem(`${this.namespace}:accessToken`, token);
  }

  async removeAccessToken() {
    // Remove the access token from the storage
    return await AsyncStorage.removeItem(`${this.namespace}:accessToken`);
  }
}

export default AuthStorage;
