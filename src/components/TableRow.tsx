import {FunctionComponent, ReactNode} from 'react';
import {TableCell, TableCellProps} from './TableCell';
import {StyleSheet, View} from 'react-native';
import {TableData} from './Table';

export interface TableRowProps {
  data: TableData[0];
  onCellPress?: (data: TableData[0]) => void;
}

export const TableRow: FunctionComponent<TableRowProps> = ({data}) => {
  const cells = Object.keys(data);
  return (
    <View style={styles.container}>
      {cells.map((key, index) => {
        const showRightBorder = cells.length > 1 && index + 1 !== cells.length;
        return (
          <TableCell
            key={key}
            data={{column: key, value: data[key]}}
            demarcate={showRightBorder}>
            {data[key]}
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
