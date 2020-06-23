import React, { useMemo } from 'react';
import Repeat from '../Repeat';
import Badge from '../Badge';
import { TableColumn, TableColumnRow, TableColumnCell } from '../TableColumn';
import { UtilityTextBold } from '../Utility';

import { OpeningHours, Maybe } from '../../@types/codegen/types';

type Days = Omit<OpeningHours, '__typename'>;
type KeyType = keyof Days;
const KeyOrder: KeyType[] = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
];

const TranslateWeekDays = (d: KeyType) => {
  switch (d) {
    case 'monday':
      return 'Mån';
    case 'tuesday':
      return 'Tis';
    case 'wednesday':
      return 'Ons';
    case 'thursday':
      return 'Tor';
    case 'friday':
      return 'Fre';
    case 'saturday':
      return 'Lör';
    case 'sunday':
      return 'Sön';
  }
};

interface OpeningHoursSample {
  titleFrom: string;
  titleTo?: string;
  from?: string | null;
  until?: string | null;
}

const arr: OpeningHoursSample[] = [];

const GetOpeningHours = (o: OpeningHours) =>
  KeyOrder.reduce((prev, current) => {
    const title = TranslateWeekDays(current);
    const item = o[current];
    const previous = prev?.[prev.length - 1];
    if (previous && previous.from == item?.from && previous.until === item?.until) {
      prev[prev.length - 1].titleTo = title;
    } else {
      prev.push({
        titleFrom: title,
        from: item?.from,
        until: item?.until,
      });
    }

    return prev;
  }, arr.slice());

const GetOpeningHoursToday = (o: OpeningHours) => {
  const dayNumber = new Date().getDay();
  const day = KeyOrder[dayNumber === 0 ? 6 : dayNumber - 1] as KeyType;
  const current = o[day];
  return {
    title: current ? 'Öppet idag' : 'Stängt idag',
    from: current?.from,
    until: current?.until,
  };
};

interface OpeningHoursProps {
  openingHours?: Maybe<OpeningHours>;
}

const OpeningHours = ({ openingHours }: OpeningHoursProps) => {
  const today = useMemo(() => (openingHours ? GetOpeningHoursToday(openingHours) : null), [
    openingHours,
  ]);
  const oh = useMemo(() => (openingHours ? GetOpeningHours(openingHours) : null), [openingHours]);
  if (!oh) {
    return null;
  }

  return (
    <>
      {today && (
        <Repeat small>
          <Badge label="Öppet" severity="positive" />
        </Repeat>
      )}
      <Repeat small>
        <TableColumn>
          <TableColumnRow>
            <TableColumnCell>
              <UtilityTextBold>{today?.title}</UtilityTextBold>
            </TableColumnCell>
            <TableColumnCell>
              <UtilityTextBold>
                {today?.from ? `${today.from}-${today.until}` : 'Stängt'}
              </UtilityTextBold>
            </TableColumnCell>
          </TableColumnRow>
          {oh.map((o) => (
            <TableColumnRow key={o.titleFrom}>
              <TableColumnCell>
                {o.titleTo ? `${o.titleFrom}-${o.titleTo}` : o.titleFrom}
              </TableColumnCell>
              <TableColumnCell>{o.from ? `${o.from}-${o.until}` : 'Stängt'}</TableColumnCell>
            </TableColumnRow>
          ))}
        </TableColumn>
      </Repeat>
    </>
  );
};

export default OpeningHours;
