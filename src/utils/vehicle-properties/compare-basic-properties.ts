import { Property } from '../../@types/vehicle-properties';

import compareProperties from './compare-properties';

interface Order {
  Varumärke: 1;
  Modell: 2;
  Version: 3;
  Modellår: 4;
  Tillverkningsår: 5;
  Mätarställning: 6;
  Växellåda: 7;
  Färg: 8;
  Registreringsnummer: 9;
  Bränslegrupp: 10;
  Kaross: 11;
  Segment: 12;
  Skatt: 13;
  Malus: 14;
  Bonus: 15;
}

const ORDER: Order = Object.freeze({
  Varumärke: 1,
  Modell: 2,
  Version: 3,
  Modellår: 4,
  Tillverkningsår: 5,
  Mätarställning: 6,
  Växellåda: 7,
  Färg: 8,
  Registreringsnummer: 9,
  Bränslegrupp: 10,
  Kaross: 11,
  Segment: 12,
  Skatt: 13,
  Malus: 14,
  Bonus: 15,
});

type OrderKey = keyof Order;

const compareByPredefinedOrder = (firstId: string, secondId: string) => {
  const firstOrder = ORDER[firstId as OrderKey] || Number.MAX_SAFE_INTEGER;
  const secondOrder = ORDER[secondId as OrderKey] || Number.MAX_SAFE_INTEGER;

  if (firstOrder < secondOrder) {
    return -1;
  } else if (secondOrder < firstOrder) {
    return 1;
  }
  return 0;
};

export default (first: Property, second: Property) => {
  const result = compareByPredefinedOrder(`${first.name}`, `${second.name}`);

  if (result !== 0) {
    return result;
  }

  return compareProperties(first, second);
};
