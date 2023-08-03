import {FunctionComponent, ReactNode, useMemo, useState} from 'react';
import {FlatList, ScrollView, StyleSheet, View} from 'react-native';
import {Colors} from '../utils/constants';
import {TableRow} from './TableRow';
import {
  SortCriteria,
  useProcessedData,
  OrderedData,
} from '../utils/hooks/useProcessedData';
import {CellPressEventData} from './TableCell';

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
  const [sortCriteria, setSortCriteria] = useState<SortCriteria>(undefined);

  const {processedData, columnTitleData} = useProcessedData(data, sortCriteria);

  const columnTitleCellPressed = (cellPressEventData: CellPressEventData) => {
    if (!!sortCriteria && sortCriteria.column === cellPressEventData.column) {
      // just toggle
      setSortCriteria({
        column: cellPressEventData.column,
        sortDirection: sortCriteria.sortDirection === 'ASC' ? 'DESC' : 'ASC',
      });
    } else {
      setSortCriteria({
        column: cellPressEventData.column,
        sortDirection: 'ASC',
      });
    }

    onColumnTitleCellPressed?.(cellPressEventData);
  };

  if (!data || !data.length) {
    return null;
  }

  return (
    <ScrollView
      style={styles.container}
      horizontal
      showsHorizontalScrollIndicator={false}>
      <FlatList<OrderedData[0]>
        data={processedData}
        renderItem={({item}) => (
          <TableRow
            data={{columns: item[0], values: item[1]}}
            onCellPress={onColumnCellPressed}
          />
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        keyExtractor={(_, index) => `item-${index}`}
        ListHeaderComponent={() => (
          <>
            <TableRow
              data={{columns: columnTitleData[0], values: columnTitleData[1]}}
              onCellPress={columnTitleCellPressed}
              cellContainerStyle={{backgroundColor: Colors.extraLightDark}}
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
