import { useEffect, useState, useCallback } from 'react';

const cache: { [key: string]: unknown | undefined } = {};

const getCachedResult = <T>(key: string) => (cache?.[key] as T) || undefined;
const setCachedResult = <T>(key: string, value: T) => {
  cache[key] = value;
};

/**
 * Reusing already fired request by attaching to same promise.
 * Usefull if multiple request is fetching from same endpoint, while
 * the first request has not been finished (so no cache exist yet).
 */

let pendingPromise: { [key: string]: Promise<globalThis.Response> } = {};
const isPendingPromise = (url: string) => !!pendingPromise[url];
const setPendingPromise = (url: string, promise: Promise<globalThis.Response>) => {
  pendingPromise = {
    ...pendingPromise,
    [url]: promise,
  };
};
const clearPendingPromise = (url: string) => {
  delete pendingPromise[url];
};

interface Response<T> {
  loading: boolean;
  data?: T;
  error: boolean;
}

const useFetch = <T>(
  path: RequestInfo,
  options?: RequestInit,
  skip?: boolean,
  promiseCache?: boolean
): Response<T> => {
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
      const reusePromise = promiseCache && isPendingPromise(key);
      const request = reusePromise ? pendingPromise[key] : fetch(path, options);
      if (promiseCache) {
        setPendingPromise(key, request);
      }

      const result = await request;
      if (result.ok) {
        const json = await result.clone().json();
        setCachedResult(key, json);
        setData(json);
      }
    } catch (e) {
      setError(true);
    } finally {
      setLoading(false);
      clearPendingPromise(key);
    }
    return;
  }, [path, options]);

  useEffect(() => {
    if (!skip) {
      doFetch();
    }
  }, [path, skip]);

  return {
    loading,
    data,
    error,
  };
};

export default useFetch;
