import {FunctionComponent} from 'react';
import {useFetchUsers} from '../utils/hooks/useFetchUsers';
import {ActivityIndicator, View} from 'react-native';
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
