import {ReactNode, useEffect, useMemo} from 'react';
import {TableData} from '../../components/Table';

export type SortCriteria =
  | {
      column: string;
      sortDirection: 'ASC' | 'DESC';
    }
  | undefined;

export type ColumnValueTuple = [Array<string>, Array<ReactNode>];

export type OrderedData = Array<ColumnValueTuple>;

export const useProcessedData = (
  data: TableData,
  sortCriteria: SortCriteria = undefined,
) => {
  /**
   * STEP 1:- Ensure all the data keys are available for use as columns.
   * This is important to prevent cases where the title row may be missing
   * for a row with missing data
   *
   * STEP 2: Process data. If any data is missing a value, populate with nullish value.
   * This is important so a cell without data is not occupied by a another cell
   * which may not belong to that column
   *
   * STEP 3: Sort based on the sort criteria. If sort criteria is undefined, return
   * original data.
   */
  /** */

  const allKeysInData = useMemo(() => {
    let allKeys = new Set<string>();
    data.forEach(d => {
      Object.keys(d).forEach(k => {
        allKeys.add(k);
      });
    });
    return Array.from(allKeys);
  }, [data]);

  const sortData = (data: TableData) => {
    if (!sortCriteria) return data;
    return [...data].sort((a, b) => {
      if (sortCriteria.sortDirection === 'ASC') {
        if ((a[sortCriteria.column] ?? 0) < (b[sortCriteria.column] ?? 0)) {
          return -1;
        }
        if ((a[sortCriteria.column] ?? 0) > (b[sortCriteria.column] ?? 0)) {
          return 1;
        }
      } else if (sortCriteria.sortDirection === 'DESC') {
        if ((a[sortCriteria.column] ?? 0) > (b[sortCriteria.column] ?? 0)) {
          return -1;
        }
        if ((a[sortCriteria.column] ?? 0) < (b[sortCriteria.column] ?? 0)) {
          return 1;
        }
      }
      return 0;
    });
  };

  const processedData = useMemo<OrderedData>(() => {
    const allNeededKeys = allKeysInData;
    const res: OrderedData = [];
    for (const row of sortData(data)) {
      const values: Array<ReactNode> = [];
      for (let i = 0; i < allNeededKeys.length; i++) {
        values[i] = row[allNeededKeys[i]] ?? null;
      }
      const tuple: ColumnValueTuple = [allKeysInData, values];
      res.push(tuple);
    }
    return res;
  }, [data, sortCriteria]);

  const columnTitleData = useMemo<ColumnValueTuple>(() => {
    const values: ReactNode[] = [];
    for (let i = 0; i < allKeysInData.length; i++) {
      values[i] =
        allKeysInData[i].charAt(0).toUpperCase() +
        allKeysInData[i].substring(1);
    }

    return [allKeysInData, values];
  }, [data]);

  return {processedData, columnTitleData, sortCriteria};
};
