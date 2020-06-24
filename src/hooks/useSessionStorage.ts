import { useState, useCallback } from 'react';

const useSessionStorage = (key: string) => {
  const [value, setValue] = useState(sessionStorage.getItem(key));

  const set = useCallback(
    (v: string) => {
      sessionStorage.setItem(key, v);
      setValue(v);
    },
    [key]
  );

  const remove = useCallback(() => {
    sessionStorage.removeItem(key);
    setValue(null);
  }, [key]);

  const clear = useCallback(() => {
    sessionStorage.clear();
    setValue(null);
  }, [key]);

  return {
    value,
    set,
    remove,
    clear,
  };
};

export default useSessionStorage;
