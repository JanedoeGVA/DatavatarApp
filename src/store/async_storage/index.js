import { AsyncStorage } from 'react-native';
import merge from 'lodash.merge';
/**
 * Save a key value pair or a series of key value pairs to AsyncStorage.
 * @param  {String|Array} key The key or an array of key/value pairs
 * @param  {Any} value The value to save
 * @return {Promise}
 */
export const saveData = (key, value) => {
  if (!Array.isArray(key)) {
    return AsyncStorage.setItem(key, JSON.stringify(value));
  }
  const pairs = key.map((pair) => [pair[0], JSON.stringify(pair[1])]);
  return AsyncStorage.multiSet(pairs);
};

/**
 * Delete the value for a given key in AsyncStorage.
 * @param  {String|Array} key The key or an array of keys to be deleted
 * @return {Promise}
 */
export const removeData = (key) => {
  if (Array.isArray(key)) {
    return AsyncStorage.multiRemove(key);
  }
  return AsyncStorage.removeItem(key);
};

/**
 * Get a one or more value for a key or array of keys from AsyncStorage
 * @param {String|Array} key A key or array of keys
 * @return {Promise}
 */
export const retrieveData = (key) => {
  if (!Array.isArray(key)) {
    return AsyncStorage.getItem(key).then((value) => JSON.parse(value));
  }
  return AsyncStorage.multiGet(key).then((values) =>
    values.map((value) => JSON.parse(value[1]))
  );
};

/**
 * Updates the value in the store for a given key in AsyncStorage. If the value is a string it will be replaced. If the value is an object it will be deep merged.
 * @param  {String} key The key
 * @param  {Value} value The value to update with
 * @return {Promise}
 */
export const updateData = (key, value) =>
  retrieveData(key).then((item) => {
    const updateValue =
      typeof value === 'string' ? value : merge({}, item, value);
    return AsyncStorage.setItem(key, JSON.stringify(updateValue));
  });
/**
 * Get all keys in AsyncStorage.
 * @return {Promise} A promise which when it resolves gets passed the saved keys in AsyncStorage.
 */
export const keysData = () => AsyncStorage.getAllKeys();
/**
 * Push a value onto an array stored in AsyncStorage by key or create a new array in AsyncStorage for a key if it's not yet defined.
 * @param {String} key The key
 * @param {Any} value The value to push onto the array
 * @return {Promise}
 */
export const pushData = (key, value) =>
  retrieveData(key).then((currentValue) => {
    if (currentValue === null) {
      // if there is no current value populate it with the new value
      return saveData(key, [value]);
    }
    if (Array.isArray(currentValue)) {
      return saveData(key, [...currentValue, value]);
    }
    throw new Error(
      `Existing value for key "${key}" must be of type null or Array, received ${typeof currentValue}.`
    );
  });
