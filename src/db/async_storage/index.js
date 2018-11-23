import { AsyncStorage } from 'react-native';

export const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.error(`_storeData error : ${error}`);
  }
};

export const removeData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error(`_removeData error : ${error}`);
  }
};

export const retrieveData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    }
  } catch (error) {
    console.error(`_retrieveData error : ${error}`);
  }
};
