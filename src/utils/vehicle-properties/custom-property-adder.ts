import { TFunction } from 'i18next';
import { VehicleData } from '../../@types/codegen/types';
import { EnhancedProperty, ItemCategory } from '../../@types/vehicle-properties';
import deepCopy from '../deep-copy';

export const TEXT_TYPE = 'text';
export const NUMBER_TYPE = 'number';
export const BASIC_CATEGORY = (t: TFunction<'translation', undefined>): ItemCategory => ({
  id: 1000,
  name: t('category.basic'),
  subCategory: null,
});
export const ENGINE_SUBCATEGORY = (t: TFunction<'translation', undefined>): ItemCategory => ({
  id: 6,
  name: t('category.engineAndPerformance'),
  subCategory: {
    id: 54,
    name: t('subCategory.engine'),
    subCategory: null,
  },
});

class PropertyBuilder {
  name: string = '';
  value: string | number = '';
  type: string = 'unknown';
  unit: string | null = null;
  hint: string | null = null;
  category: ItemCategory | null = null;

  withName(name: string) {
    this.name = name;
    return this;
  }

  withHint(hint: string) {
    if (hint) {
      this.hint = hint;
    }
    return this;
  }

  withValue(value: string | number) {
    this.value = value;
    return this;
  }

  withType(type: string) {
    this.type = type;
    return this;
  }

  withCategory(category: ItemCategory) {
    this.category = category;
    return this;
  }

  withUnit(unit: string) {
    this.unit = unit;
    return this;
  }

  build(): EnhancedProperty {
    return {
      name: this.name,
      value: this.value,
      type: this.type,
      unit: this.unit,
      hint: this.hint,
      category: this.category,
    };
  }
}

export default (
  t: TFunction<'translation', undefined>,
  item: VehicleData,
  properties: { [key: string]: EnhancedProperty }
) => {
  const newProperties = deepCopy(properties);

  if (!!item.manufacturer) {
    newProperties.manufacturer = new PropertyBuilder()
      .withName(t('customProperty.manufacturer.displayName'))
      .withValue(item.manufacturer)
      .withType(TEXT_TYPE)
      .withCategory(BASIC_CATEGORY(t))
      .build();
  }

  if (!!item.modelSeries) {
    newProperties.modelSeries = new PropertyBuilder()
      .withName(t('customProperty.modelSeries.displayName'))
      .withValue(item.modelSeries)
      .withType(TEXT_TYPE)
      .withCategory(BASIC_CATEGORY(t))
      .build();
  }

  if (!!item.modelName) {
    newProperties.modelName = new PropertyBuilder()
      .withName(t('customProperty.modelName.displayName'))
      .withValue(item.modelName)
      .withHint(t('customProperty.modelName.hint'))
      .withType(TEXT_TYPE)
      .withCategory(BASIC_CATEGORY(t))
      .build();
  }

  if (!!item.modelYear) {
    newProperties.modelYear = new PropertyBuilder()
      .withName(t('customProperty.modelYear.displayName'))
      .withValue(item.modelYear)
      .withHint(t('customProperty.modelYear.hint'))
      .withType(NUMBER_TYPE)
      .withCategory(BASIC_CATEGORY(t))
      .build();
  }

  if (!!item.manufactureYear) {
    newProperties.manufactureYear = new PropertyBuilder()
      .withName(t('customProperty.manufactureYear.displayName'))
      .withValue(item.manufactureYear)
      .withHint(t('customProperty.manufactureYear.hint'))
      .withType(NUMBER_TYPE)
      .withCategory(BASIC_CATEGORY(t))
      .build();
  }

  if (item.odometerReading) {
    newProperties.mileage = new PropertyBuilder()
      .withName(t('customProperty.odometer.displayName'))
      .withValue(item.odometerReading.value)
      .withHint(t('customProperty.odometer.hint'))
      .withType(NUMBER_TYPE)
      .withCategory(BASIC_CATEGORY(t))
      .withUnit(t(`odometer.${item.odometerReading.unit}`))
      .build();
  } else if (!!item.mileage) {
    newProperties.mileage = new PropertyBuilder()
      .withName(t('customProperty.odometer.displayName'))
      .withValue(item.mileage)
      .withHint(t('customProperty.odometer.hint'))
      .withType(NUMBER_TYPE)
      .withCategory(BASIC_CATEGORY(t))
      .withUnit(t('odometer.ScandinavianMile'))
      .build();
  }

  if (!!item.gearboxType) {
    newProperties.gearboxType = new PropertyBuilder()
      .withName(t('customProperty.gearboxType.displayName'))
      .withValue(item.gearboxType)
      .withType(TEXT_TYPE)
      .withCategory(BASIC_CATEGORY(t))
      .build();
  }

  if (!!item.registrationNumber) {
    newProperties.registrationNumber = new PropertyBuilder()
      .withName(t('customProperty.registrationNumber.displayName'))
      .withValue(item.registrationNumber)
      .withType(TEXT_TYPE)
      .withCategory(BASIC_CATEGORY(t))
      .build();
  }

  if (!!item.fuelType) {
    newProperties.fuelType = new PropertyBuilder()
      .withName(t('customProperty.fuelType.displayName'))
      .withValue(item.fuelType)
      .withHint(t('customProperty.fuelType.hint'))
      .withType(TEXT_TYPE)
      .withCategory(BASIC_CATEGORY(t))
      .build();
  }

  if (item.enginePower) {
    newProperties.enginePower = new PropertyBuilder()
      .withName(t('customProperty.enginePower.displayName'))
      .withValue(item.enginePower)
      .withUnit(t('customProperty.enginePower.unit'))
      .withType(NUMBER_TYPE)
      .withCategory(ENGINE_SUBCATEGORY(t))
      .build();
  }

  return newProperties;
};
