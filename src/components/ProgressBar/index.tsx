import React from 'react';

import { Wrapper, Description, Bar, BarActive } from './wrapper';

interface Props {
  unit: string;
  valueCurrent: number;
  valueMax: number;
}

const ProgressBar = ({ unit, valueCurrent, valueMax }: Props) => {
  const barWidth = (valueCurrent / valueMax) * 100;

  return (
    <Wrapper>
      <Description>
        Visar {valueCurrent.toString()} av {valueMax.toString()} {unit}
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
