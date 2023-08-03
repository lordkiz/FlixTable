import {FunctionComponent} from 'react';
import {CellPressEventData, TableCell} from './TableCell';
import {StyleSheet, View, ViewStyle} from 'react-native';
import {TableData} from './Table';
import {ColumnValueTuple} from '../utils/hooks/useProcessedData';

export interface TableRowProps {
  data: {columns: ColumnValueTuple[0]; values: ColumnValueTuple[1]};
  onCellPress?: (data: CellPressEventData) => void;
  cellContainerStyle?: ViewStyle;
}

export const TableRow: FunctionComponent<TableRowProps> = ({
  data,
  onCellPress,
  cellContainerStyle,
}) => {
  return (
    <View style={styles.container}>
      {data.columns.map((columnName, index) => {
        const showRightBorder =
          data.columns.length > 1 && index + 1 !== data.columns.length;
        return (
          <TableCell
            key={index}
            data={{column: columnName, value: data.values[index]}}
            demarcate={showRightBorder}
            onCellPress={onCellPress}
            containerStyle={cellContainerStyle}>
            {data.values[index]}
          </TableCell>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
});
