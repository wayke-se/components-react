import { MetadataJson, parsePhoneNumberFromString } from 'libphonenumber-js/core';

import _metadata from './metadata.min.json';

const metadata = _metadata as unknown as MetadataJson;

const typedMetadata = metadata as unknown as MetadataJson;

export const formatPhonenumber = (text: string) => {
  try {
    const parsed = parsePhoneNumberFromString(
      text.replace('-', '').replace(/ /g, ''),
      typedMetadata
    );
    return parsed?.formatNational() || text;
  } catch (e) {
    return text;
  }
};
