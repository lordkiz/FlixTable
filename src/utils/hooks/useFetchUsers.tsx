import {useEffect, useState} from 'react';
import {HttpClient} from '../ApiClient';

export const useFetchUsers = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<
    Awaited<ReturnType<(typeof HttpClient)['fetchUsers']>> | undefined
  >(undefined);

  const getData = () => {
    setLoading(true);
    HttpClient.fetchUsers()
      .then(users => setData(users))
      .catch(e => setError(composeError(e)))
      .finally(() => setLoading(false));
  };

  const retry = () => {
    setError(null);
    getData();
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
