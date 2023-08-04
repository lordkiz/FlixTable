import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Cache,
  USER_DATA_CACHE_KEY,
  VALIDITY_PERIOD,
  isUserCacheData,
  withValidUsersCacheData,
} from '../Cache';
import {User} from '../ApiClient';

describe('Cache', () => {
  describe(withValidUsersCacheData, () => {
    describe('persistUserData', () => {
      beforeEach(async () => {
        await AsyncStorage.clear();
      });
      afterAll(async () => {
        await AsyncStorage.clear();
      });
      it('formats the data to UserCacheData and saves', () => {
        withValidUsersCacheData().persistUserData(mockUserData);
        const expectedArg = JSON.stringify({
          data: mockUserData,
          savedAt: Date.now(),
        });
        expect(AsyncStorage.setItem).toHaveBeenCalledWith(
          USER_DATA_CACHE_KEY,
          expectedArg,
        );
      });
    });

    describe('getValidCacheData', () => {
      beforeEach(async () => {
        await AsyncStorage.clear();
      });
      afterAll(async () => {
        jest.useRealTimers();
        await AsyncStorage.clear();
        jest.clearAllMocks();
      });
      it('returns valid data when expiry has not been exceeded', async () => {
        withValidUsersCacheData().persistUserData(mockUserData);
        const data = await withValidUsersCacheData().getValidCacheData();
        expect(data).toEqual(mockUserData);
      });
      it('returns null when expiry has been exceeded', async () => {
        withValidUsersCacheData().persistUserData(mockUserData);
        jest.useFakeTimers();
        jest.advanceTimersByTime(VALIDITY_PERIOD + 1);
        const data = await withValidUsersCacheData().getValidCacheData();
        expect(data).toEqual(null);
      });
    });

    describe('isUserCacheData', () => {
      it('returns true if arg passed adheres to UserCacheData format', () => {
        const data = {data: mockUserData, savedAt: Date.now()};
        expect(isUserCacheData(data)).toBe(true);
      });

      it('returns false if arg passed DOES not adhere to UserCacheData format', () => {
        const data = {someKey: mockUserData};
        expect(isUserCacheData(data)).toBe(undefined);
      });
    });
  });
});

const mockUserData: User[] = [
  {
    name: 'Matthew',
    age: 15,
  },
  {
    name: 'Alexander',
    age: 24,
  },
];
