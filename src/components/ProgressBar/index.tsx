import React from 'react';

import { Wrapper, Description, Bar, BarActive } from './wrapper';
import { useTranslation } from 'react-i18next';

interface Props {
  valueCurrent: number;
  valueMax: number;
}

const ProgressBar = ({ valueCurrent, valueMax }: Props) => {
  const { t } = useTranslation();
  const barWidth = (valueCurrent / valueMax) * 100;

  return (
    <Wrapper>
      <Description>
        {t('other.showingNumberOfResults', { current: valueCurrent, count: valueMax })}
      </Description>
      <Bar>
        <BarActive
          style={{ width: `${barWidth}%` }}
          aria-valuenow={valueCurrent}
          aria-valuemin={0}
          aria-valuemax={valueMax}
        />
      </Bar>
    </Wrapper>
  );
};

export default ProgressBar;
