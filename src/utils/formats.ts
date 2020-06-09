// Filter function to remove any null/undefined values.
export const notEmpty = <TValue>(value: TValue | null | undefined): value is TValue =>
  value !== null && value !== undefined;

export const numberSeparator = (value: number, n = 0, x = 3, s = ' ', c = '.') => {
  if (value === null || value === undefined) {
    return null;
  }

  const re = `\\d(?=(\\d{${x || 3}})+${n > 0 ? '\\D' : '$'})`;
  const num = value.toFixed(Math.max(0, ~~n));

  return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), `$&${s || ','}`);
};

import {
  MANUFACTURER,
  MODEL_SERIES,
  FUEL_TYPE,
  GEARBOX_TYPE,
  ENVIRONMENT_CLASS,
  SEGMENT,
  DRIVING_WHEEL,
  COLOR,
  PRICE,
  BRANCH,
  MILEAGE,
  MODEL_YEAR,
} from './constants';

export const FacetIdToTitle = (f: string) => {
  switch (f) {
    case MANUFACTURER:
      return 'Tillverkare';
    case MODEL_SERIES:
      return 'Modell';
    case FUEL_TYPE:
      return 'Drivmedel';
    case GEARBOX_TYPE:
      return 'Växellåda';
    case SEGMENT:
      return 'Segment';
    case DRIVING_WHEEL:
      return 'Drivhjul';
    case ENVIRONMENT_CLASS:
      return 'Miljöklass';
    case COLOR:
      return 'Färg';
    case PRICE:
      return 'Pris';
    case BRANCH:
      return 'Anläggning';
    case MILEAGE:
      return 'Miltal';
    case MODEL_YEAR:
      return 'Modellår';
    default:
      return f;
  }
};
