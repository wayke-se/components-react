import { useEffect, useState, useCallback } from 'react';

const cache: { [key: string]: unknown | undefined } = {};

const getCachedResult = <T>(key: string) => (cache?.[key] as T) || undefined;
const setCachedResult = <T>(key: string, value: T) => {
  cache[key] = value;
};

interface Response<T> {
  loading: boolean;
  data?: T;
  error: boolean;
}

const useFetch = <T>(path: RequestInfo, options?: RequestInit): Response<T> => {
  const [data, setData] = useState<T | undefined>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const doFetch = useCallback(async () => {
    const key = path.toString();
    const cached = getCachedResult<T>(key);
    setError(false);
    if (cached) {
      setData(cached);
      return;
    }
    setLoading(true);
    try {
      const result = await fetch(path, options);
      if (result.ok) {
        const json = await result.json();
        setCachedResult(key, json);
        setData(json);
      }
    } catch (e) {
      setError(true);
    } finally {
      setLoading(false);
    }
    return;
  }, [path, options]);

  useEffect(() => {
    doFetch();
  }, [path]);

  return {
    loading,
    data,
    error,
  };
};

export default useFetch;
