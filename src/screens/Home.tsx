import {FunctionComponent, useMemo} from 'react';
import {useFetchUsers} from '../utils/hooks/useFetchUsers';
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {TableRow, TableRowProps} from '../components/TableRow';
import {Colors} from '../utils/constants';
import {Table} from '../components/Table';

export const Home: FunctionComponent = () => {
  const {data: users, loading} = useFetchUsers();

  if (loading) {
    return (
      <View>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <Table data={users ?? []} />;
};
