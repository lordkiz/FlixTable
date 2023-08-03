import {FunctionComponent, ReactNode, useMemo, useState} from 'react';
import {FlatList, ScrollView, StyleSheet, View} from 'react-native';
import {Colors} from '../utils/constants';
import {TableRow} from './TableRow';

export type TableData = Array<Record<string, ReactNode>>;

interface TableProps {
  data: TableData;

  /** Callback for when a column title is pressed */
  onColumnTitleCellPressed?: (data: TableData[0]) => void;
  /** Callback for when a column body cell is pressed */
  onColumnCellPressed?: (data: TableData[0]) => void;
}

/**
 * Table for diplaying data. Table is data type agnostic and should
 * be able to display most ReactNode type of data
 */
export const Table: FunctionComponent<TableProps> = ({
  data,
  onColumnTitleCellPressed,
  onColumnCellPressed,
}) => {
  const [columnSortedBy, setColumnSortedBy] = useState<
    | {
        column: string;
        sortDirection: 'ASC' | 'DESC';
      }
    | undefined
  >(undefined);

  const dataForHeader = useMemo(() => {
    if (!data.length) return {};
    const res: TableData[0] = {};
    // Based on the provided typing for user, we can be sure(??) that each field will be present
    // TODO:- Confirm if there can be missing fields
    Object.keys(data[0]).forEach(
      k => (res[k] = k.charAt(0).toUpperCase() + k.substring(1)),
    );
    return res;
  }, [data]);

  const columnTitleCellPressed = (cellItem: TableData[0]) => {
    onColumnTitleCellPressed?.(cellItem);
  };

  if (!data || !data.length) {
    return null;
  }

  return (
    <ScrollView
      style={styles.container}
      horizontal
      showsHorizontalScrollIndicator={false}>
      <FlatList<TableData[0]>
        data={data}
        renderItem={({item}) => (
          <TableRow data={item} onCellPress={onColumnCellPressed} />
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        keyExtractor={(_, index) => `item-${index}`}
        ListHeaderComponent={() => (
          <>
            <TableRow
              data={dataForHeader}
              onCellPress={onColumnTitleCellPressed}
            />
            <View style={styles.separator} />
          </>
        )}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    borderWidth: 1,
    borderColor: Colors.lightDark,
  },
  separator: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightDark,
  },
});
