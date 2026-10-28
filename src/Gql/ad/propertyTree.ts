// The "Fordonsdata" tabs: the vehicle's attributes by category, with the basics
// first, as web-ui-v2 shows them.

import { TFunction } from 'i18next';
import { Category, Property, Tree } from '../../@types/vehicle-properties';
import { Ad, AttributeCategory, AttributeValue } from './types';

const toProperty = (v: AttributeValue): Property => {
  const isBoolean =
    v.__typename === 'BooleanProperty' ||
    v.formattedValue === 'true' ||
    v.formattedValue === 'false';
  return {
    name: v.label,
    type: isBoolean ? 'boolean' : 'text',
    value: isBoolean ? v.formattedValue === 'true' : v.formattedValue,
    unit: null,
    hint: null,
  };
};

const toCategory = (c: AttributeCategory, id: number): Category => ({
  id,
  name: c.displayName,
  properties: c.values.map(toProperty),
  subCategories: (c.categories || [])
    .filter((s) => s.values.length)
    .map((s, i) => toCategory(s, id * 100 + i + 1)),
});

const propertyTree = (ad: Ad, t: TFunction): Tree => {
  const item = ad.iteration?.item;
  const odometer = ad.iteration?.logistics?.odometerReading;
  const basic: Property[] = [];
  const add = (key: string, value?: string | number | null, unit?: string, withHint?: boolean) => {
    if (value !== undefined && value !== null && value !== '') {
      basic.push({
        name: t(`customProperty.${key}.displayName`),
        value,
        type: typeof value === 'number' ? 'number' : 'text',
        unit: unit || null,
        hint: withHint ? t(`customProperty.${key}.hint`) : null,
      });
    }
  };
  const attributes = item?.attributes;
  const modelSeries = item?.modelSeries?.stringValue;
  // As web-ui-v2: the version is modelVariant; modelName only when it says more than the model.
  const modelName = item?.modelName?.stringValue;
  const version =
    item?.modelVariant?.stringValue || (modelName !== modelSeries ? modelName : undefined);

  add('manufacturer', item?.manufacturer?.stringValue);
  add('modelSeries', modelSeries);
  add('modelName', version, undefined, true);
  add('modelYear', item?.modelYear?.intValue, undefined, true);
  add('manufactureYear', item?.manufactureYear?.intValue, undefined, true);
  if (odometer) {
    add(
      'odometer',
      odometer.value,
      t(`odometer.${odometer.unit === 'KILOMETER' ? 'Kilometer' : 'ScandinavianMile'}`)
    );
  }
  add('gearboxType', attributes?.transmission?.formattedValue);
  add('color', attributes?.exteriorColor?.formattedValue);
  add('registrationNumber', item?.registrationNumber?.stringValue);
  add('chassis', item?.authority?.chassis?.stringValue || attributes?.chassisType?.formattedValue);
  add(
    'segment',
    item?.authority?.segment?.stringValue || attributes?.vehicleClassification?.formattedValue
  );
  add('annualTax', item?.authority?.annualTax?.formattedValue);
  add('numberOfDoors', attributes?.doorsCount?.formattedValue);
  add('fuelType', item?.driveline?.fuelTypesString?.stringValue, undefined, true);
  add('enginePower', attributes?.enginePower?.formattedValue);

  const categories = (item?.attributes?.byCategory || [])
    .map((c, i) => toCategory(c, i + 1))
    .filter((c) => c.properties.length || c.subCategories.length);

  // The API's own basic category takes the basics above in front of its values.
  const basicIndex = categories.findIndex((c) => c.name === t('category.basic'));
  if (basicIndex > -1) {
    const [existing] = categories.splice(basicIndex, 1);
    categories.unshift({ ...existing, properties: [...basic, ...existing.properties] });
  } else {
    categories.unshift({
      id: 1000,
      name: t('category.basic'),
      properties: basic,
      subCategories: [],
    });
  }
  return { categories };
};

export default propertyTree;
