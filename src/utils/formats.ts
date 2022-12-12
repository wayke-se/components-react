import { format as formatFns } from 'date-fns';
import { sv } from 'date-fns/locale';

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
  LEASING_PRICE,
  BUSINESS_LEASING_PRICE,
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
    case LEASING_PRICE:
      return 'Privatleasing';
    case BUSINESS_LEASING_PRICE:
      return 'Företagsleasing';
    default:
      return f;
  }
};

export const dateTimeFormat = {
  YearMonth: 1,
  DayMonth: 2,

  format: (value: string | Date, format: number) => {
    const date = new Date(value);
    switch (format) {
      case dateTimeFormat.YearMonth:
        return formatFns(date, 'MMMM yyyy', { locale: sv });
      case dateTimeFormat.DayMonth:
        return formatFns(date, 'd MMMM yyyy', { locale: sv });
      default:
        return formatFns(date, 'yyyy-MM-dd HH:mm', { locale: sv });
    }
  },
};
