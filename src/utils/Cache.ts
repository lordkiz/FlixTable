import AsyncStorage from '@react-native-async-storage/async-storage';
import {User} from './ApiClient';

export const Cache = {
  persist: async (key: string, value: string) => {
    await AsyncStorage.setItem(key, value);
  },

  get: async (key: string) => {
    const value = await AsyncStorage.getItem(key);
    if (value) {
      try {
        const result = JSON.parse(value);
        return result;
      } catch (jsonParseError) {
        return null;
      }
    }
    return value;
  },

  remove: async (key: string) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (e) {
      //noop
    }
  },
};

export const USER_DATA_CACHE_KEY = 'USER_DATA_CACHE_KEY';

export const VALIDITY_PERIOD = 3600000; // 1 hour

interface UserCacheData {
  data: User[];
  savedAt: number; // Date.now()-like in millisecs
}

/** User Defined Type Guard to validate data
 * Use this function to test that the data previously saved is actually a UserCacheData
 * This is important to ensure you don't return unexpected data from the Cache
 */
export const isUserCacheData = (data: any): data is UserCacheData => {
  return data && data.data && data.savedAt && typeof data.savedAt === 'number';
};

export const withValidUsersCacheData = () => {
  const _validateCacheValidityPolicy = (
    cacheData: UserCacheData | null,
  ): boolean => {
    // add policy check logic
    if (!cacheData || !isUserCacheData(cacheData)) {
      return false;
    }
    if (Date.now() - cacheData.savedAt <= VALIDITY_PERIOD) {
      return true;
    }
    return false;
  };

  const getValidCacheData = async (): Promise<User[] | null> => {
    const usersCacheData = await Cache.get(USER_DATA_CACHE_KEY);
    const isValid = _validateCacheValidityPolicy(usersCacheData);
    if (isValid) {
      return usersCacheData.data;
    }
    return null;
  };

  const persistUserData = (users: User[]) => {
    const cacheData: UserCacheData = {
      data: users,
      savedAt: Date.now(),
    };

    Cache.persist(USER_DATA_CACHE_KEY, JSON.stringify(cacheData));
  };

  return {getValidCacheData, persistUserData};
};
