import { EnhancedProperty, Category } from '../../@types/item';
import deepCopy from '../deep-copy';

export const TEXT_TYPE = 'text';
export const NUMBER_TYPE = 'number';
export const BASIC_CATEGORY = Object.freeze({
  id: 1000,
  name: 'Basuppgifter',
  subCategory: null,
});
export const ENGINE_SUBCATEGORY = Object.freeze({
  id: 6,
  name: 'Motor & Prestanda',
  subCategory: {
    id: 54,
    name: 'Motor',
    subCategory: null,
  },
});

class PropertyBuilder {
  name: string = '';
  value: any = '';
  type: string = 'unknown';
  unit: string | null = null;
  hint: string | null = null;
  category: Category | null = null;

  withName(name: string) {
    this.name = name;
    return this;
  }

  withValue(value) {
    this.value = value;
    return this;
  }

  withType(type: string) {
    this.type = type;
    return this;
  }

  withCategory(category: Category) {
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

export default (item, properties: { [key: string]: EnhancedProperty }) => {
  const newProperties = deepCopy(properties);

  if (!!item.manufacturer) {
    newProperties.manufacturer = new PropertyBuilder()
      .withName('Varumärke')
      .withValue(item.manufacturer)
      .withType(TEXT_TYPE)
      .withCategory(BASIC_CATEGORY)
      .build();
  }

  if (!!item.modelSeries) {
    newProperties.modelSeries = new PropertyBuilder()
      .withName('Modell')
      .withValue(item.modelSeries)
      .withType(TEXT_TYPE)
      .withCategory(BASIC_CATEGORY)
      .build();
  }

  if (!!item.modelName) {
    newProperties.modelName = new PropertyBuilder()
      .withName('Version')
      .withValue(item.modelName)
      .withType(TEXT_TYPE)
      .withCategory(BASIC_CATEGORY)
      .build();
  }

  if (!!item.modelYear) {
    newProperties.modelYear = new PropertyBuilder()
      .withName('Modellår')
      .withValue(item.modelYear)
      .withType(NUMBER_TYPE)
      .withCategory(BASIC_CATEGORY)
      .build();
  }

  if (!!item.manufactureYear) {
    newProperties.manufactureYear = new PropertyBuilder()
      .withName('Tillverkningsår')
      .withValue(item.manufactureYear)
      .withType(NUMBER_TYPE)
      .withCategory(BASIC_CATEGORY)
      .build();
  }

  if (!!item.mileage) {
    newProperties.mileage = new PropertyBuilder()
      .withName('Mätarställning')
      .withValue(item.mileage)
      .withType(NUMBER_TYPE)
      .withCategory(BASIC_CATEGORY)
      .withUnit('mil')
      .build();
  }

  if (!!item.gearboxType) {
    newProperties.gearboxType = new PropertyBuilder()
      .withName('Växellåda')
      .withValue(item.gearboxType)
      .withType(TEXT_TYPE)
      .withCategory(BASIC_CATEGORY)
      .build();
  }

  if (!!item.registrationNumber) {
    newProperties.registrationNumber = new PropertyBuilder()
      .withName('Registreringsnummer')
      .withValue(item.registrationNumber)
      .withType(TEXT_TYPE)
      .withCategory(BASIC_CATEGORY)
      .build();
  }

  if (!!item.fuelType) {
    newProperties.fuelType = new PropertyBuilder()
      .withName('Bränslegrupp')
      .withValue(item.fuelType)
      .withType(TEXT_TYPE)
      .withCategory(BASIC_CATEGORY)
      .build();
  }

  if (item.enginePower) {
    newProperties.enginePower = new PropertyBuilder()
      .withName('Effekt')
      .withValue(item.enginePower)
      .withUnit('hk')
      .withType(NUMBER_TYPE)
      .withCategory(ENGINE_SUBCATEGORY)
      .build();
  }

  return newProperties;
};
