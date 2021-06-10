export const regexGuid =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const regexEndGuid = /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/;

export const escapeRegExpString = (s: string) => s.replace(/[-[\]/{}()*+?.\\^$|]/g, '\\$&');

export const regexPathGuid = (path?: string) => {
  if (!path) {
    return regexEndGuid;
  }
  const r = new RegExp(`${escapeRegExpString(path)}${regexEndGuid.source}`, 'gi');
  return r;
};
