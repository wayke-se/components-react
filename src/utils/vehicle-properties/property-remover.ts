import { EnhancedProperty } from '../../@types/vehicle-properties';
import deepCopy from '../deep-copy';

const PROPERTY_BLACK_LIST = Object.freeze([
  'towHitchFoldable',
  'trailerTotalWeightB',
  'gps',
  'androidAuto',
  'appleCarPlay',
  'tintedWindows',
]);

const isForbiddenProperty = (key: string) => PROPERTY_BLACK_LIST.includes(key);

const CATEGORY_WHITE_LIST = Object.freeze([1, 2, 6, 8, 71, 119, 1000]);

const hasForbiddenCategory = (property: EnhancedProperty) =>
  !property.category ||
  !property.category.id ||
  !CATEGORY_WHITE_LIST.includes(property.category.id);

export default (properties: { [key: string]: EnhancedProperty }) => {
  const newProperties = deepCopy(properties);

  Object.keys(properties).forEach((key) => {
    const property = properties[key];
    if (hasForbiddenCategory(property)) {
      delete newProperties[key];
    } else if (isForbiddenProperty(key)) {
      delete newProperties[key];
    }
  });

  return newProperties;
};
