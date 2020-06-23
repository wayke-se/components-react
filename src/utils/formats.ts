import moment from 'moment';

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

export const dateTimeFormat = {
  DateTime: 0,
  DateOnly: 1,
  TimeOnly: 2,
  DateString: 3,
  DateTimeString: 4,
  YearMonth: 5,
  DayMonth: 6,
  RelativeFromNow: 7,

  format: (value: string | Date, format: number) => {
    const date = moment(value).locale('sv');
    switch (format) {
      case dateTimeFormat.DateOnly:
        return date.format('YYYY-MM-DD');
      case dateTimeFormat.TimeOnly:
        return date.format('HH:mm');
      case dateTimeFormat.DateString:
        return date.format('Do MMMM, YYYY');
      case dateTimeFormat.DateTimeString:
        return date.format('dddd, D MMMM YYYY, [kl] HH:mm');
      case dateTimeFormat.YearMonth:
        return date.format('MMMM YYYY');
      case dateTimeFormat.DayMonth:
        return date.format('D MMMM YYYY');
      case dateTimeFormat.RelativeFromNow:
        return date.calendar();
      case dateTimeFormat.DateTime:
        return date.format('D MMMM HH:mm');
      default:
        return date.format('YYYY-MM-DD HH:mm');
    }
  },
};
