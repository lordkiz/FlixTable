import {FunctionComponent} from 'react';
import {CellPressEventData, TableCell} from './TableCell';
import {StyleSheet, View, ViewStyle} from 'react-native';
import {ColumnValueTuple, SortCriteria} from '../utils/hooks/useProcessedData';
import {TriangleDown, TriangleUp} from './Triangles';

export interface TableRowProps {
  data: {columns: ColumnValueTuple[0]; values: ColumnValueTuple[1]};
  onCellPress?: (data: CellPressEventData) => void;
  cellContainerStyle?: ViewStyle;
  sortCriteria?: SortCriteria;
  showSortIcon?: boolean;
}

export const TableRow: FunctionComponent<TableRowProps> = ({
  data,
  onCellPress,
  cellContainerStyle,
  sortCriteria,
  showSortIcon = false,
}) => {
  return (
    <View style={styles.container}>
      {data.columns.map((columnName, index) => {
        const showRightBorder =
          data.columns.length > 1 && index + 1 !== data.columns.length;
        const showTriangle =
          showSortIcon && columnName === sortCriteria?.column;

        return (
          <TableCell
            key={index}
            data={{column: columnName, value: data.values[index]}}
            demarcate={showRightBorder}
            onCellPress={onCellPress}
            containerStyle={cellContainerStyle}
            icon={
              showTriangle && sortCriteria?.sortDirection === 'ASC' ? (
                <TriangleUp />
              ) : showTriangle && sortCriteria?.sortDirection === 'DESC' ? (
                <TriangleDown />
              ) : undefined
            }>
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
