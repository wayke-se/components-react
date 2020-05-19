import { useState, useEffect } from 'react';

const regexGuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const HASH_CHANGE = 'hashchange';

const useHashGuid = () => {
  const [id, setId] = useState<string>();
  const onHashChange = () => {
    const guid = window.location.hash.substr(1, window.location.hash.length);
    if (regexGuid.test(guid) || !guid) {
      setId(window.location.hash.substr(1, window.location.hash.length));
    } else {
      throw 'Invalid Guid';
    }
  };

  useEffect(() => {
    onHashChange();
    window.addEventListener(HASH_CHANGE, onHashChange);
    return () => {
      window.removeEventListener(HASH_CHANGE, onHashChange);
    };
  }, []);

  return id;
};

export default useHashGuid;
