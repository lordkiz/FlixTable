import {FunctionComponent, PropsWithChildren, ReactElement} from 'react';
import {
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';
import {Colors} from '../utils/constants';
import {TableData} from './Table';

export interface TableCellProps extends PropsWithChildren {
  data: TableData[0];
  containerStyle?: ViewStyle;
  icon?: ReactElement;
  iconPosition?: 'left' | 'right';
  demarcate?: boolean;
  onCellPress?: (data: TableCellProps['data']) => void;
}

export const TableCell: FunctionComponent<TableCellProps> = ({
  children,
  containerStyle,
  data,
  demarcate = false,
  icon,
  iconPosition = 'left',
  onCellPress,
}) => {
  return (
    <TouchableWithoutFeedback onPress={() => onCellPress?.(data)}>
      <View
        style={[
          styles.container,
          containerStyle,
          demarcate && {
            borderRightWidth: 1,
            borderRightColor: Colors.lightDark,
          },
        ]}>
        {!!icon && iconPosition === 'left' ? <View>{icon}</View> : <View />}
        <Text>{children}</Text>
        {!!icon && iconPosition === 'right' ? <View>{icon}</View> : <View />}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 100,
  },
});
