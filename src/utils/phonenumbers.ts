import {
  parseNumber,
  formatNumber,
  ParsedNumber,
  NumberFormat,
  Metadata,
} from 'libphonenumber-js/custom';

import metadata from './metadata.min.json';

const typedMetadata = (metadata as unknown) as Metadata;
const NATIONAL = 'NATIONAL';

const parse = (text: string) => parseNumber(text, typedMetadata);
const format = (parsedNumber: ParsedNumber, format: NumberFormat) =>
  formatNumber(parsedNumber, format, typedMetadata).replace('tel:', '');

export const formatPhonenumber = (text: string) => {
  try {
    return format(parse(text) as ParsedNumber, NATIONAL);
  } catch (e) {
    return text;
  }
};
