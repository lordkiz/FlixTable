import {useEffect, useState} from 'react';
import {HttpClient} from '../ApiClient';
import {withValidUsersCacheData} from '../Cache';

export const useFetchUsers = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<
    Awaited<ReturnType<(typeof HttpClient)['fetchUsers']>> | undefined
  >(undefined);

  const {getValidCacheData, persistUserData} = withValidUsersCacheData();

  const getData = async () => {
    setLoading(true);
    const validData = await getValidCacheData();
    if (validData) {
      setData(validData);
      setLoading(false);
      return;
    }
    try {
      const remoteData = await HttpClient.fetchUsers();
      persistUserData(remoteData);
      setData(remoteData);
    } catch (e) {
      setError(composeError(e));
    }
    setLoading(false);
  };

  const retry = async () => {
    setError(null);
    await getData();
  };

  useEffect(() => {
    getData();
  }, []);

  return {data, loading, error, retry};
};

const composeError = (err: unknown): Error => {
  if (err instanceof Error) {
    return err;
  }
  if (typeof err === 'string') {
    return new Error(err);
  }
  let e = 'Unknown Error';
  try {
    e = e + `: ${err}`;
  } catch (error) {
    //
  }
  return new Error(e);
};
