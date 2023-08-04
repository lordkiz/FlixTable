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
   * which may not belong to that column. This ensures there is an entry for every cell.
   *
   * STEP 3: Sort based on the sort criteria. If sort criteria is undefined, return
   * original data.
   */
  /** */

  /** Returns all keys in the data in the correct order
   *  Useful for ordering the columns
   */
  const allKeysInData = useMemo(() => {
    let allKeys = new Set<string>();
    let indexWithMostKeys = 0;
    let mostKeys = 0;
    // first find which index has the most keys
    data.forEach((d, i) => {
      const l = Object.keys(d).length;
      if (l > mostKeys) {
        indexWithMostKeys = i;
        mostKeys = l;
      }
    });
    // first copy all the keys in the index with most keys
    // the item at this index likely has the most complete set of keys
    // in order to preserve ordering these keys should be added first.
    // Without this step, missing data from values index 0 can cause wrong
    // ordering of the columns
    if (data.length) {
      Object.keys(data[indexWithMostKeys]).forEach(k => {
        allKeys.add(k);
      });
    }
    // then add all the other keys incase a key was missed
    // this can be optional if there is a guarantee that atleast 1 item has all keys
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

  /** Process the data. Ensures every cell is not empty.
   * Adheres to the ordering of allKeysInData
   *  @returns OrderedData
   * @example
   * [
   *   [["name", "age"],["Michael", 24]],
   *   [["name", "age"],["Julian", 42]]
   * ]
   * */
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

  /** Processes the data ideal for rendering the column header row and titles
   * @returns ColumnValueTuple
   * @example
   * [["name", "age"],["Name", "Age"]]
   *
   */
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
