import { Property } from '../../@types/vehicle-properties';

export default (first: Property, second: Property) => {
  return first.name.localeCompare(second.name);
};
