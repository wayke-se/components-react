import React from 'react';
import { Property } from '../../@types/vehicle-properties';

const formatValue = (value: Property['value'], unit: Property['unit']) => {
  if (typeof value === 'boolean') {
    return value ? 'Ja' : 'Nej';
  }
  if (Array.isArray(value)) {
    return value.join(', ');
  }
  if (!!value && !!unit) {
    return `${value} ${unit}`;
  }
  return value;
};

interface MetadataItemProps {
  name: string;
  value: Property['value'];
  unit: Property['unit'];
}

const MetadataItem = ({ name, value, unit }: MetadataItemProps) => {
  const presentedValue = formatValue(value, unit);

  return (
    <div className="m-t-mini">
      <b>{name}:</b> {value !== undefined ? presentedValue : 'Uppgift saknas'}
    </div>
  );
};

export default MetadataItem;
