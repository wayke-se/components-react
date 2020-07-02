import React from 'react';

import { Wrapper } from './wrapper';

interface Props {
  label: string;
  severity?: 'positive' | 'negative';
}

const Badge = ({ label, severity }: Props) => <Wrapper severity={severity}>{label}</Wrapper>;

export default Badge;
