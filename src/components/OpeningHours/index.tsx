import React, { useMemo } from 'react';
import { RepeatSmall } from '../Repeat/index';
import Badge from '../Badge/index';
import { TableColumn, TableColumnRow, TableColumnCell } from '../TableColumn/index';
import { UtilityTextBold } from '../Utility/index';

import { OpeningHours, Maybe } from '../../@types/codegen/types';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';

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
      return i18next.t('common.mondayShort');
    case 'tuesday':
      return i18next.t('common.tuesdayShort');
    case 'wednesday':
      return i18next.t('common.wednesdayShort');
    case 'thursday':
      return i18next.t('common.thursdayShort');
    case 'friday':
      return i18next.t('common.fridayShort');
    case 'saturday':
      return i18next.t('common.saturdayShort');
    case 'sunday':
      return i18next.t('common.sundayShort');
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
    title: current ? i18next.t('item.openingHoursToday') : i18next.t('item.closedToday'),
    from: current?.from,
    until: current?.until,
  };
};

const valuOfDateString = (s: string) => {
  const splitted = s.split(':').map((x) => parseInt(x, 10));
  return new Date().setHours(splitted[0], splitted[1]).valueOf();
};

interface OpeningHoursProps {
  openingHours?: Maybe<OpeningHours>;
}

const OpeningHours = ({ openingHours }: OpeningHoursProps) => {
  const { t } = useTranslation();
  const today = useMemo(
    () => (openingHours ? GetOpeningHoursToday(openingHours) : null),
    [openingHours]
  );

  const currentlyOpen = useMemo(() => {
    try {
      if (today?.from && today?.until) {
        const currentDate = new Date().valueOf();
        const from = valuOfDateString(today.from);
        const until = valuOfDateString(today.until);
        return currentDate >= from && currentDate <= until;
      }
    } catch (e) {
      return false;
    }
  }, [today]);

  const oh = useMemo(() => (openingHours ? GetOpeningHours(openingHours) : null), [openingHours]);
  if (!oh) {
    return null;
  }

  return (
    <>
      <RepeatSmall>
        <Badge
          label={currentlyOpen ? t('item.open') : t('item.closed')}
          severity={currentlyOpen ? 'positive' : 'negative'}
        />
      </RepeatSmall>
      <RepeatSmall>
        <TableColumn>
          <TableColumnRow>
            <TableColumnCell>
              <UtilityTextBold>{today?.title}</UtilityTextBold>
            </TableColumnCell>
            <TableColumnCell>
              <UtilityTextBold>
                {today?.from ? `${today.from}-${today.until}` : t('item.closed')}
              </UtilityTextBold>
            </TableColumnCell>
          </TableColumnRow>
          {oh.map((o) => (
            <TableColumnRow key={o.titleFrom}>
              <TableColumnCell>
                {o.titleTo ? `${o.titleFrom}-${o.titleTo}` : o.titleFrom}
              </TableColumnCell>
              <TableColumnCell>
                {o.from ? `${o.from}-${o.until}` : t('item.closed')}
              </TableColumnCell>
            </TableColumnRow>
          ))}
        </TableColumn>
      </RepeatSmall>
    </>
  );
};

export default OpeningHours;
