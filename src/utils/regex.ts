// Any UUID version is accepted, vehicle ids can be e.g. v4 or v7
export const regexGuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const regexEndGuid = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export const escapeRegExpString = (s: string) => s.replace(/[-[\]/{}()*+?.\\^$|]/g, '\\$&');

export const regexPathGuid = (path?: string) => {
  if (!path || path) {
    return regexEndGuid;
  }
  const r = new RegExp(`${escapeRegExpString(path)}${regexEndGuid.source}`, 'gi');
  return r;
};
