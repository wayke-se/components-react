import { format as formatFns } from 'date-fns';
import { sv, nb } from 'date-fns/locale';

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

import { MarketCode } from '../@types/market';

export const dateTimeFormat = {
  YearMonth: 1,
  DayMonth: 2,

  format: (value: string | Date, format: number, marketCode?: MarketCode) => {
    const date = new Date(value);
    const settings = { locale: marketCode === 'NO' ? nb : sv };
    switch (format) {
      case dateTimeFormat.YearMonth:
        return formatFns(date, 'MMMM yyyy', settings);
      case dateTimeFormat.DayMonth:
        return formatFns(date, 'd MMMM yyyy', settings);
      default:
        return formatFns(date, 'yyyy-MM-dd HH:mm', settings);
    }
  },
};
