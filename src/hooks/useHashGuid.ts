import { useEffect, useState } from 'react';

// Any UUID version: vehicle ids from the new platform are UUIDv7, and the old pattern
// only accepted versions 0-5 which made those items impossible to open via hash route.
const regexGuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const HASH_CHANGE = 'hashchange';

const getGuid = () => {
  const guid = window.location.hash.substr(1, window.location.hash.length);
  return regexGuid.test(guid) || !guid ? guid : undefined;
};

// A hash that is not a vehicle id (e.g. #content from a skip link on the host site) is
// ignored, so the search stays visible instead of the components crashing.
const useHashGuid = () => {
  const [id, setId] = useState<string | undefined>(() => getGuid());
  const onHashChange = () => setId(getGuid());

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
