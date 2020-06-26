import { notEmpty, dateTimeFormat, numberSeparator } from './formats';
import { VehicleData } from '../@types/codegen/types';

export interface ItemPropertModalType {
  title: string;
  text: string;
}

export interface ItemPropertyType {
  label: string;
  value: string | null;
  modal?: ItemPropertModalType;
}

type ValueTypes =
  | number
  | string
  | null
  | undefined
  | string[]
  | boolean
  | { [key: string]: string | number | boolean };

export interface SpecPropertyType {
  label?: string;
  formatLabel?: (item: VehicleData) => string;
  formatData?: (value: ValueTypes, item: VehicleData) => string | null;
  modal?: {
    title?: string;
    dynamicTitle?: (item: VehicleData) => string;
    text?: string;
    dynamicText?: (item: VehicleData) => string;
    nonConcatablePropValue?: string;
    concatPropValue?: string;
  };
}

const isElectric = (item: VehicleData): boolean =>
  !!item.fuelType && item.fuelType.toLowerCase() === 'el';
const getFuelConsumption = (value: ValueTypes, item: VehicleData): string | null => {
  if (!value) return null;

  return isElectric(item) ? `${value} kWh/100 km` : `${value} liter/100 km`;
};

const specLabels: { [key: string]: SpecPropertyType } = {
  manufacturer: { label: 'Varumärke' },
  manufactureYear: {
    label: 'Tillverkningsår',
    modal: {
      title: 'Tillverkningsår',
      text: 'Året bilen tillverkades.',
    },
  },
  modelSeries: { label: 'Modell' },
  modelName: {
    label: 'Version',
    modal: {
      title: 'Version',
      text: 'Vilket utförande av bilmodellen det är.',
    },
  },
  modelYear: {
    label: 'Modellår',
    modal: {
      title: 'Modellår',
      text:
        'Modellår sätts av tillverkaren. Handlaren ändrar ibland modellåret för att matcha transportstyrelsens definition för <i>årsmodell</i>. Definitionen för årsmodell innebär att bilar tillverkade andra halvan av året får nästa års modellår.',
    },
  },
  mileage: {
    label: 'Mätarställning',
    formatData: (value: ValueTypes, _: VehicleData): string | null =>
      (value || -1) >= 0 ? `${numberSeparator(value as number)} mil` : null,
    modal: {
      title: 'Mätarställning',
      text: 'Antal mil som bilen har körts. I bilen anges det i kilometer istället.',
    },
  },
  registrationNumber: {
    label: 'Registreringsnummer',
  },
  vinNumber: { label: 'Chassinummer/VIN' },
  chassis: {
    label: 'Kaross',
    modal: {
      title: 'Kaross',
      text: 'Vilken typ/form bilen har. ',
    },
  },
  colorName: { label: 'Färg' },
  enginePower: {
    label: 'Effekt',
    formatData: (value: ValueTypes, _: VehicleData): string | null =>
      value ? `${value} hk` : null,
  },
  engineCylinders: {
    label: 'Cylindrar',
    modal: {
      title: 'Cylindrar',
      text: 'Antalet ger en indikation på motorns storlek. Ett "vanligt" antal ligger på 4 st.',
    },
  },
  engineVolume: {
    label: 'Motorvolym',
    formatData: (value: ValueTypes, _: VehicleData): string | null =>
      value ? `${value} cm3` : null,
    modal: {
      title: 'Motorvolym',
      text: 'Den sammanlagda volymen av motorns cylindrar. Mäts i kubikcentimeter.',
    },
  },
  maxSpeed: {
    label: 'Toppfart',
    formatData: (value: ValueTypes, _: VehicleData): string | null =>
      value ? `${value} km/h` : null,
    modal: {
      title: 'Toppfart',
      text: 'Högsta hastigheten som bilen går att köra.',
    },
  },
  drivingWheel: {
    label: 'Drivhjul',
    modal: {
      title: 'Drivhjul',
      text: 'Vilka hjul som motorn ger kraft till och snurrar.',
    },
  },
  torque: {
    label: 'Vridmoment',
    formatData: (value: ValueTypes, _: VehicleData): string | null =>
      value ? `${value} Nm` : null,
    modal: {
      title: 'Vridmoment',
      text:
        'Bilens vridkraft. Hög siffra möjliggör att t.ex. dra tunga släp. Dieselmotorer har generellt mer vridmoment.',
    },
  },
  acceleration: {
    label: 'Acceleration 0-100 km/h',
    formatData: (value: ValueTypes, _: VehicleData): string | null =>
      value ? `${value} sek` : null,
    modal: {
      title: 'Acceleration 0-100 km/h',
      text: 'Antal sekunder som bilen behöver för att ta sig till 100 km/h.',
    },
  },
  gearbox: { label: 'Växellåda' },
  gearboxType: { label: 'Växellåda' },
  fuelType: {
    label: 'Bränslegrupp',
    modal: {
      title: 'Bränslegrupp',
      text: 'Vad bilen ska tankas med och drivs av.',
    },
  },
  seats: {
    label: 'Säten',
    modal: {
      title: 'Säten',
      text: 'Antal personer som får åka i bilen.',
    },
  },
  segment: {
    label: 'Segment',
    modal: {
      title: 'Segment',
      text: 'Vilken typ av bil det handlar om - t.ex. familjebil',
    },
  },
  status: { label: 'Status' },
  imported: {
    label: 'Import/införsel',
    formatData: (value: ValueTypes, _: VehicleData): string | null => (value ? 'Ja' : null),
  },
  firstRegistrationDate: {
    label: 'Först registrerad',
    formatData: (value: ValueTypes, _: VehicleData): string | null =>
      value ? dateTimeFormat.format(`${value}`, dateTimeFormat.YearMonth) : null,
  },
  firstInService: {
    label: 'Först i trafik',
    formatData: (value: ValueTypes, _: VehicleData): string | null =>
      value ? dateTimeFormat.format(`${value}`, dateTimeFormat.YearMonth) : null,
  },
  height: {
    label: 'Längd/höjd/bredd',
    formatData: (_: ValueTypes, data: VehicleData): string | null =>
      `${data?.properties?.length || '-'} cm/${data?.properties?.height || '-'} cm/${
        data?.properties?.width || '-'
      } cm`,
  },
  serviceWeight: {
    label: 'Tjänstevikt',
    formatData: (value: ValueTypes, _: VehicleData): string | null =>
      value ? `${numberSeparator(value as number)} kg` : null,
    modal: {
      title: 'Tjänstevikt',
      text: 'Anger hur mycket bilen väger med en passagerare som väger ca 75kg.',
    },
  },
  maxTotalWeight: {
    label: 'Maxlast',
    formatData: (value: ValueTypes, _: VehicleData): string | null =>
      value ? `${numberSeparator(value as number)} kg` : null,
  },
  maxRoofWeight: {
    label: 'Max taklast',
    formatData: (value: ValueTypes, _: VehicleData): string | null =>
      value ? `${numberSeparator(value as number)} kg` : null,
    modal: {
      title: 'Max taklast',
      text: 'Hur många kilo last taket klarar av.',
    },
  },
  trailerWeight: {
    label: 'Max släpvagnsvikt',
    formatData: (value: ValueTypes, _: VehicleData): string | null =>
      value ? `${numberSeparator(value as number)} kg` : null,
  },
  trailerTotalWeightB: {
    label: 'Totalvikt släp, B',
    formatData: (value: ValueTypes, _: VehicleData): string | null =>
      value ? `${numberSeparator(value as number)} kg` : null,
    modal: {
      title: 'Totalvikt släp, B',
      text: 'Vikten man får dra med släp och ett vanligt B-körkort',
    },
  },
  trailerTotalWeightBPlus: {
    label: 'Totalvikt släp, B+',
    formatData: (value: ValueTypes, _: VehicleData): string | null =>
      value ? `${numberSeparator(value as number)} kg` : null,
    modal: {
      title: 'Totalvikt släp, B+',
      text: 'Vikten man får dra med släp och ett utökat B-körkort',
    },
  },
  groundClearence: {
    label: 'Markfrigång',
    formatData: (value: ValueTypes, _: VehicleData): string | null =>
      value ? `${value} cm` : null,
    modal: {
      title: 'Markfrigång',
      text: 'Avståndet mellan bilens undersida och marken.',
    },
  },
  trunkSpace: {
    label: 'Bagageutrymme - normalt',
    formatData: (value: ValueTypes, _: VehicleData): string | null =>
      value ? `${value} liter` : null,
    modal: {
      title: 'Bagageutrymme - normalt',
      text: 'Volym på bagageutrymmet med uppfällda säten. Det mäts i liter.',
    },
  },
  tankVolume: {
    formatLabel: (item: VehicleData): string =>
      isElectric(item) ? 'Batterikapacitet' : 'Volym, bränsletank',
    formatData: (value: ValueTypes, data: VehicleData): string | null => {
      if (!value) return null;

      return isElectric(data) ? `${value} kWh` : `${value} liter`;
    },

    modal: {
      dynamicTitle: (item: VehicleData): string =>
        isElectric(item) ? 'Batterikapacitet' : 'Volym, bränsletank',
      dynamicText: (item: VehicleData): string =>
        isElectric(item)
          ? 'Batteriets kapacitet i kilowattimmar'
          : 'Antal liter bränsle som ryms i tanken.',
    },
  },
  wheelBase: {
    label: 'Hjulbas',
    formatData: (value: ValueTypes, _: VehicleData): string | null =>
      value ? `${value} cm` : null,
    modal: {
      title: 'Hjulbas',
      text: 'Avståndet mellan fram- och bakhjul.',
    },
  },
  tiresFront: { label: 'Däck, fram' },
  tiresRear: { label: 'Däck, bak' },
  drivingNoise: { label: 'Ljudnivå' },
  payload: { label: 'Godsvikt' },
  trailerWeightWithoutBreaks: { label: 'Totalvikt släp, utan bromsar' },
  co2: {
    label: 'CO2',
    formatData: (value: ValueTypes, _: VehicleData): string | null =>
      value ? `${value} g/km` : null,
    modal: {
      title: 'C02',
      text: 'Anger hur mycket koldioxid fordonet släpper ut.',
    },
  },
  environmentClass: {
    label: 'Miljöklass',
    modal: {
      title: 'Miljöklass',
      text: 'Används för att ställa krav på fordonets utsläpp.',
    },
  },
  vehicleCategoryEU: { label: 'EU-kategori' },
  fuelConsumptionMixedDriving: {
    label: 'Bränsleförbrukning, blandad',
    formatData: getFuelConsumption,
    modal: {
      title: 'Bränsleförbrukning, blandad',
      text:
        'Bränsleförbrukning vid blandad körning. Dvs. stadskörning och landsvägskörning under en och samma färd.',
    },
  },
  fuelConsumptionCityDriving: {
    label: 'Bränsleförbrukning, stad',
    formatData: getFuelConsumption,
    modal: {
      title: 'Bränsleförbrukning, stad',
      text: 'Bränsleförbrukning vid stadskörning.',
    },
  },
  fuelConsumptionCountryRoadDriving: {
    label: 'Bränsleförbrukning, landsväg',
    formatData: getFuelConsumption,
    modal: {
      title: 'Bränsleförbrukning, landsväg',
      text: 'Bränsleförbrukning vid landsvägskörning.',
    },
  },
  nox: { label: 'Nox' },
  thcNox: { label: 'THC Nox' },
  ncapStar: {
    label: 'Euro NCAP stjärnor',
    modal: {
      title: 'Euro NCAP stjärnor',
      text: 'Universiellt säkerhetsbetyg, fler stjärnor innebär högre säkerhet.',
    },
  },
  ncapYear: {
    label: 'Testår',
    modal: {
      title: 'Testår',
      text: 'Året som bilen säkerhets- och krocktestades.',
    },
  },
  ncapMonth: { label: 'Testmånad' },
  abs: {
    label: 'ABS',
    formatData: (value: ValueTypes, _: VehicleData): string | null => (value ? 'Ja' : null),
    modal: {
      title: 'ABS',
      text: 'Förhindrar att bromsarna låser sig och reducerar bromssträckan.',
    },
  },
  espSystem: {
    label: 'Antisladd (ESP/DSTC/VSC/ASC)',
    formatData: (value: ValueTypes, _: VehicleData): string | null => (value ? 'Ja' : null),
  },
  trcSystem: {
    label: 'Antispinn',
    formatData: (value: ValueTypes, _: VehicleData): string | null => (value ? 'Ja' : null),
    modal: {
      title: 'Antispinn',
      text: 'Får bilen att skicka kraft till hjulet som har bästa kontakt med underlaget.',
    },
  },
  isofixRearSeat: {
    label: 'Isofix bak',
    formatData: (value: ValueTypes, _: VehicleData): string | null => (value ? 'Ja' : null),
    modal: {
      title: 'Isofix bak',
      text: 'Universiell fästanordning för barnstolar.',
    },
  },
  airbagDriver: {
    label: 'Airbag, förare',
    formatData: (value: ValueTypes, _: VehicleData): string | null => (value ? 'Ja' : null),
    modal: {
      title: 'Airbag, förare',
      text: 'Krockkudde för föraren.',
    },
  },
  airbagPassenger: {
    label: 'Airbag, passagerare',
    formatData: (value: ValueTypes, _: VehicleData): string | null => (value ? 'Ja' : null),
    modal: {
      title: 'Airbag, passagerare',
      text: 'Krockkudde för passagerare.',
    },
  },
  airbagFrontSide: {
    label: 'Airbag, sida fram',
    formatData: (value: ValueTypes, _: VehicleData): string | null => (value ? 'Ja' : null),
  },
  brakeAssistance: {
    label: 'Bromsassistans (Panikbroms - BA/EBA/BAS/AFU)',
    formatData: (value: ValueTypes, _: VehicleData): string | null => (value ? 'Ja' : null),
    modal: {
      title: 'Bromsassistans (Panikbroms - BA/EBA/BAS/AFU)',
      text: 'Säkerhetssystem som kan hjälpa till att bromsa och undvika olyckor. ',
    },
  },
  tco3yrs: {
    label: 'TCO, 3 år 2500 mil/år',
    formatData: (value: ValueTypes, _: VehicleData): string | null => (value ? 'Ja' : null),
  },
  annualTax: {
    label: 'Skatt',
    formatData: (value: ValueTypes, _: VehicleData): string | null =>
      value ? `${value} kr/år` : null,
    modal: {
      title: 'Skatt',
      text: 'Summan fordonsskatt som måste betalas varje år.',
    },
  },
  annualMalus: {
    label: 'Skatt (Malus)',
    formatData: (value: ValueTypes, _: VehicleData): string | null =>
      value ? `${value} kr/år` : null,
    modal: {
      title: 'Malus - förhöjd fordonsskatt',
      text:
        'Bilen har en förhöjd skatt de tre första åren och därefter gäller ordinarie skatt på {insertValue}.',
      nonConcatablePropValue:
        'Bilen har en förhöjd skatt de tre första åren och därefter gäller ordinarie skatt.',
      concatPropValue: 'annualTax',
    },
  },
  annualBonus: {
    label: 'Bonus',
    formatData: (value: ValueTypes, _: VehicleData): string | null =>
      value ? `${value} kr` : null,
    modal: {
      title: 'Bonus - för nya bilar med låga utsläpp',
      text:
        'Det här fordonet är berättigat till klimatbonus. Bonusen för denna bil är {annualBonus} och delas ut till den första registrerade ägaren efter 6 månader. Klicka <a target="_blank" rel="noopener noreferrer" title="Läs mer om bonus/malus" href="https://www.transportstyrelsen.se/bonusmalus">här</a> för att läsa mer.',
      concatPropValue: 'annualBonus',
    },
  },
};

const All = [
  'manufacturer',
  'modelSeries',
  'modelName',
  'manufactureYear',
  'mileage',
  'gearboxType',
  'enginePower',
  'drivingWheel',
  'fuelType',
  'seats',
  'colorName',
  'registrationNumber',
  'chassis',
  'engineCylinders',
  'engineVolume',
  'maxSpeed',
  'torque',
  'acceleration',
  'modelYear',
  'vinNumber',
  'segment',
  'status',
  'imported',
  'firstRegistrationDate',
  'firstInService',
  'height',
  'serviceWeight',
  'maxTotalWeight',
  'maxRoofWeight',
  'trailerWeight',
  'trailerTotalWeightB',
  'trailerTotalWeightBPlus',
  'groundClearence',
  'trunkSpace',
  'tankVolume',
  'wheelBase',
  'tiresFront',
  'tiresRear',
  'drivingNoise',
  'payload',
  'trailerWeightWithoutBreaks',
  'co2',
  'environmentClass',
  'vehicleCategoryEU',
  'fuelConsumptionMixedDriving',
  'fuelConsumptionCityDriving',
  'fuelConsumptionCountryRoadDriving',
  'nox',
  'thcNox',
  'ncapStar',
  'ncapYear',
  'ncapMonth',
  'abs',
  'espSystem',
  'trcSystem',
  'isofixRearSeat',
  'airbagDriver',
  'airbagPassenger',
  'airbagFrontSide',
  'brakeAssistance',
  'tco3yrs',
  'annualTax',
  'annualMalus',
  'annualBonus',
] as const;

type KEYS = typeof All[number];
type SPEC_KEYS = keyof typeof specLabels;
type ITEM_KEYS = keyof VehicleData;

const extractSpecData = (key: KEYS, item: VehicleData): ItemPropertyType | null => {
  const spec = specLabels[key];
  let data:
    | number
    | string
    | null
    | undefined
    | string[]
    | boolean
    | { [key: string]: string | number | boolean } = null;

  if (!!item[key as ITEM_KEYS] || (item[key as ITEM_KEYS] || -1) > -1) {
    data = item[key as ITEM_KEYS];
  } else if (
    !!item?.properties?.[key] ||
    (typeof item?.properties?.[key] === 'number' && (item?.properties?.[key] || -1) > -1)
  ) {
    data = item.properties[key];
  }

  if (!spec || !data) {
    return null;
  }

  let label: string = '';
  if (spec.formatLabel) {
    label = spec.formatLabel(item);
  } else if (spec.label) {
    label = spec.label;
  }

  let value: string | null = '';
  if (spec.formatData) {
    value = spec.formatData(data, item);
  } else {
    value = `${data}`;
  }

  const modal = spec.modal ? { title: '', text: '' } : undefined;
  if (modal) {
    if (spec.modal?.dynamicTitle) {
      modal.title = spec.modal.dynamicTitle(item);
    } else if (spec.modal?.title) {
      modal.title = spec.modal.title;
    }

    if (spec.modal?.dynamicText) {
      modal.text = spec.modal.dynamicText(item);
    } else if (spec.modal?.text) {
      modal.text = spec.modal.text;
    }

    if (spec.modal?.concatPropValue) {
      const concatObj =
        spec.modal.concatPropValue === key
          ? { value }
          : extractSpecData(spec.modal.concatPropValue as KEYS, item);
      if (concatObj?.value) {
        modal.text = modal.text.replace('{insertValue}', concatObj.value);
      } else if (spec.modal.nonConcatablePropValue) {
        modal.text = spec.modal.nonConcatablePropValue;
      }
    }
  }

  return {
    label,
    value,
    modal,
  };

  /*
  if (!spec || (typeof spec === 'string' && !data)) {
    return null;
  }

  let label: SpecPropertyType | string = spec;
  if (typeof spec === 'object' && typeof spec.label === 'string') {
    label = spec.label;
  }
  if (typeof spec === 'object' && typeof spec.label === 'function') {
    label = spec.label(item);
  }

  let value = data;
  if (typeof spec === 'object' && typeof spec.data === 'string') {
    value = spec.data;
  }
  if (typeof spec === 'object' && typeof spec.data === 'function') {
    value = spec.data(data, item);
  }

  const modal = spec.modal ? { ...spec.modal } : null;

  if (modal) {
    if (spec.modal.title && typeof spec.modal.title === 'function') {
      modal.title = spec.modal.title(item);
    } else if (spec.modal.title) {
      modal.title = spec.modal.title;
    }

    if (spec.modal.text && typeof spec.modal.text === 'function') {
      modal.text = spec.modal.text(item);
    } else if (spec.modal.text) {
      modal.text = spec.modal.text;
    }
  }

  if (!(!!value || (typeof value === 'number' && value < -1))) {
    return null;
  }

  if (modal && modal.concatPropValue) {
    const concatobj = extractSpecData(modal.concatPropValue, item);
    if (concatobj && concatobj.value) {
      modal.text = modal.text.replace('{insertValue}', concatobj.value);
    } else if (modal.nonConcatablePropValue) {
      modal.text = modal.nonConcatablePropValue;
    }
  }

  return { label, value: `${value || ''}`, modal };
  */
};

export const getSpecificationList = (item: VehicleData): ItemPropertyType[] =>
  All.map((x: KEYS) => extractSpecData(x, item)).filter(notEmpty);
