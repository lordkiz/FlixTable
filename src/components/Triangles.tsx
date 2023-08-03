import {StyleSheet, View, ViewStyle} from 'react-native';
import {Colors} from '../utils/constants';

export const TriangleUp = (props: {style?: ViewStyle}) => {
  return <View style={[styles.triangle, props.style]} />;
};

export const TriangleDown = () => {
  return <TriangleUp style={styles.triangleDown} />;
};

const styles = StyleSheet.create({
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 5,
    borderRightWidth: 5,
    borderBottomWidth: 10,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: Colors.midDark,
  },
  triangleDown: {
    transform: [{rotate: '180deg'}],
  },
});
