import { useEffect, useState, useCallback } from 'react';

const cache: { [key: string]: unknown | undefined } = {};

const getCachedResult = <T>(key: string) => (cache?.[key] as T) || undefined;
const setCachedResult = <T>(key: string, value: T) => {
  cache[key] = value;
};

const requestOrder: string[] = [];

const isLatest = (key: string) => requestOrder[requestOrder.length - 1] === key;
const addToRequestOrder = (key: string) => requestOrder.push(key);

interface Response<T> {
  loading: boolean;
  data?: T;
}

const useFetch = <T>(path: RequestInfo, options?: RequestInit): Response<T> => {
  const [data, setData] = useState<T | undefined>();
  const [loading, setLoading] = useState(false);

  const doFetch = useCallback(async () => {
    const key = path.toString();
    const cached = getCachedResult<T>(key);
    if (cached) {
      setData(cached);
      return;
    }
    addToRequestOrder(key);
    setLoading(true);
    try {
      const result = await fetch(path, options);
      if (result.ok) {
        const json = await result.json();
        setCachedResult(key, json);
        if (isLatest(key)) {
          setData(json);
        }
      }
    } finally {
      if (isLatest(key)) {
        setLoading(false);
      }
    }
    return;
  }, [path, options]);

  useEffect(() => {
    doFetch();
  }, [path]);

  return {
    loading,
    data,
  };
};

export default useFetch;
