import {renderHook} from '@testing-library/react-native';
import {User} from '../../ApiClient';
import {useProcessedData} from '../useProcessedData';

describe('useProcessedData', () => {
  describe('allKeysInData', () => {
    it('correctly extracts all keys in data even with inconsistent data', () => {
      const {result} = renderHook(() =>
        useProcessedData(mockUserDataWithInconsistentKeys),
      );
      expect(result.current.columnTitleData).toEqual([
        ['name', 'age'],
        ['Name', 'Age'],
      ]);
    });
  });

  describe('processedData', () => {
    it('returns processed data', () => {
      const {result} = renderHook(() => useProcessedData(mockUserData));
      expect(result.current.processedData).toEqual([
        [
          ['name', 'age'],
          ['Matthew', 15],
        ],
        [
          ['name', 'age'],
          ['Alexander', 32],
        ],
        [
          ['name', 'age'],
          ['Samuel', 22],
        ],
      ]);
    });

    it('correctly sorts data by field + sortDirection ASC', () => {
      const {result} = renderHook(() =>
        useProcessedData(mockUserData, {column: 'name', sortDirection: 'ASC'}),
      );
      const res = result.current.processedData.map(a => a[1][0]);
      expect(res).toEqual(['Alexander', 'Matthew', 'Samuel']);
    });

    it('correctly sorts data by field + sortDirection DESC', () => {
      const {result} = renderHook(() =>
        useProcessedData(mockUserData, {column: 'name', sortDirection: 'DESC'}),
      );
      const res = result.current.processedData.map(a => a[1][0]);
      expect(res).toEqual(['Samuel', 'Matthew', 'Alexander']);
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
    age: 32,
  },
  {
    name: 'Samuel',
    age: 22,
  },
];

const mockUserDataWithInconsistentKeys = [
  {
    name: 'Matthew',
  },
  {
    name: 'Alexander',
    age: 32,
  },
  {
    age: 22,
  },
];
