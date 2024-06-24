/* 
SecureStore isn't working in web · Issue #7744 · expo/expo
https://github.com/expo/expo/issues/7744
 */
import * as SecureStore from "expo-secure-store";
import {Platform} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const storageUtil = {
  setItem: async (k, v) => {
    if (Platform.OS === 'web') { // web
      await AsyncStorage.setItem(k, v);
    } else { // mobile
      await SecureStore.setItemAsync(k, v.toString()); // v must be string,
    }
  },
  getItem: async (k) => {
    if (Platform.OS === 'web') { // web
      return await AsyncStorage.getItem(k);
    } else { // mobile
      return await SecureStore.getItemAsync(k);
    }
  }
}
export default storageUtil