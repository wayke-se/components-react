import React, { useMemo } from 'react';
import { RepeatSmall } from '../Repeat';
import Badge from '../Badge';
import { TableColumn, TableColumnRow, TableColumnCell } from '../TableColumn';
import { UtilityTextBold } from '../Utility';

import { OpeningHours, Maybe } from '../../@types/codegen/types';
import { useTranslation } from 'react-i18next';
import { TFunction } from 'i18next';

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

const TranslateWeekDays = (t: TFunction<'translation', undefined>, d: KeyType) => {
  switch (d) {
    case 'monday':
      return t('common.mondayShort');
    case 'tuesday':
      return t('common.tuesdayShort');
    case 'wednesday':
      return t('common.wednesdayShort');
    case 'thursday':
      return t('common.thursdayShort');
    case 'friday':
      return t('common.fridayShort');
    case 'saturday':
      return t('common.saturdayShort');
    case 'sunday':
      return t('common.sundayShort');
  }
};

interface OpeningHoursSample {
  titleFrom: string;
  titleTo?: string;
  from?: string | null;
  until?: string | null;
}

const arr: OpeningHoursSample[] = [];

const GetOpeningHours = (t: TFunction<'translation', undefined>, o: OpeningHours) =>
  KeyOrder.reduce((prev, current) => {
    const title = TranslateWeekDays(t, current);
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

const GetOpeningHoursToday = (t: TFunction<'translation', undefined>, o: OpeningHours) => {
  const dayNumber = new Date().getDay();
  const day = KeyOrder[dayNumber === 0 ? 6 : dayNumber - 1] as KeyType;
  const current = o[day];
  return {
    title: current ? t('item.openingHoursToday') : t('item.closedToday'),
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
    () => (openingHours ? GetOpeningHoursToday(t, openingHours) : null),
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

  const oh = useMemo(
    () => (openingHours ? GetOpeningHours(t, openingHours) : null),
    [openingHours]
  );
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
