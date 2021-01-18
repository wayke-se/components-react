import { Category } from '../../@types/vehicle-properties';

interface ID_ORDER_TYPE {
  '1000': 1;
  '71': 2;
  '2': 3;
  '1': 4;
  '8': 5;
  '6': 6;
  '119': 7;
}

const ID_ORDER: ID_ORDER_TYPE = Object.freeze({
  '1000': 1,
  '71': 2,
  '2': 3,
  '1': 4,
  '8': 5,
  '6': 6,
  '119': 7,
});

type ID_ORDER_KEY = keyof ID_ORDER_TYPE;

const compareById = (firstId: string, secondId: string) => {
  const firstOrder = ID_ORDER[firstId as ID_ORDER_KEY] || Number.MAX_SAFE_INTEGER;
  const secondOrder = ID_ORDER[secondId as ID_ORDER_KEY] || Number.MAX_SAFE_INTEGER;

  if (firstOrder < secondOrder) {
    return -1;
  } else if (secondOrder < firstOrder) {
    return 1;
  }
  return 0;
};

export default (first: Category, second: Category) => {
  const result = compareById(`${first.id}`, `${second.id}`);

  if (result !== 0) {
    return result;
  }

  return first.name.localeCompare(second.name);
};
