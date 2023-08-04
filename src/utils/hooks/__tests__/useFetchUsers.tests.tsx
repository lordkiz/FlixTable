import AsyncStorage from '@react-native-async-storage/async-storage';
import {HttpClient, User} from '../../ApiClient';
import {act, flushPromises, renderHook, waitFor} from '../../../testUtils';
import {useFetchUsers} from '../useFetchUsers';
import {
  Cache,
  USER_DATA_CACHE_KEY,
  VALIDITY_PERIOD,
  withValidUsersCacheData,
} from '../../Cache';

describe('useFetchUsers', () => {
  describe('getData', () => {
    beforeEach(() => {
      AsyncStorage.clear();
      jest.clearAllMocks();
    });
    afterAll(() => {
      AsyncStorage.clear();
      jest.clearAllMocks();
    });
    it('fetches data onMount', async () => {
      const api = jest.spyOn(HttpClient, 'fetchUsers');
      // mount
      renderHook(() =>
        act(() => {
          useFetchUsers();
        }),
      );

      await flushPromises();
      await waitFor(() => expect(api).toHaveBeenCalled());
    });

    it('skips HTTP calls if there is valid data in cache', async () => {
      const api = jest.spyOn(HttpClient, 'fetchUsers');
      // persist a valid data
      withValidUsersCacheData().persistUserData(mockUserData);
      // mount
      renderHook(() =>
        act(() => {
          useFetchUsers();
        }),
      );

      await flushPromises();
      await waitFor(() => expect(api).not.toHaveBeenCalled());
    });

    it('makes HTTP calls if data in cache has expired', async () => {
      const api = jest.spyOn(HttpClient, 'fetchUsers');

      // persist a valid data
      withValidUsersCacheData().persistUserData(mockUserData);
      // invalidate the valid data by exceeding the valid period
      await Cache.persist(
        USER_DATA_CACHE_KEY,
        JSON.stringify({
          data: mockUserData,
          savedAt: Date.now() - VALIDITY_PERIOD,
        }),
      );
      // mount
      renderHook(() =>
        act(() => {
          useFetchUsers();
        }),
      );

      await flushPromises();
      await waitFor(() => expect(api).toHaveBeenCalled());
    });

    it('persists data retrieved from HTTP.fetchUsers', async () => {
      const users = await HttpClient.fetchUsers();
      // mount, after mounting retrieved data is automatically persisted
      renderHook(() =>
        act(() => {
          useFetchUsers();
        }),
      );
      await flushPromises();
      const dataPersisted = await withValidUsersCacheData().getValidCacheData();
      await waitFor(() => expect(dataPersisted).toEqual(users));
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
