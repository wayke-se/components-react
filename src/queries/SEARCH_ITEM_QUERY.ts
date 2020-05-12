import { gql } from 'apollo-boost';
import { MockedResponse } from '@apollo/react-testing';

const SEARCH_ITEM_QUERY = gql`
  query SearchItem($id: String) {
    vehicle(id: $id) {
      branch {
        id
        description
      }
      description
      id
      gearbox
      fuelType
      manufactureYear
      manufacturer
      options
      properties {
        ...AllVehicleProperties
      }
    }
  }
`;

export const SEARCH_ITEM_QUERY_MOCKS: MockedResponse[] = [
  {
    request: {
      query: SEARCH_ITEM_QUERY,
      variables: {
        id: 'test',
      },
    },
    result: {
      data: {
        vehicle: {
          branch: [
            {
              id: '51577a27-7c62-42da-8fda-0b158c160868',
              description: 'description...',
            },
          ],
          description: 'description...',
          id: '684f2548-1250-4ae2-bcb8-e8aec11cb739',
          gearbox: '6-stegad Automat',
          paymentOptions: [
            {
              a: 'a',
            },
          ],
          insuranceOptions: [
            {
              a: 'a',
            },
          ],
          fuelType: 'Laddhybrid',
          manufactureYear: 2016,
          manufacturer: 'Volkswagen',
          options: [
            'Färddator',
            'Car net onlinetjänster giltighetstid 36 månader',
            'Dragpaket',
            'Lastförskjutningsnät',
            'Farthållare adaptiv (acc) inklusive front assist och city emergency brake',
            'Bluetooth',
            'Stöldskyddslarm',
            'Dragkrok infällbar elektriskt utfällbar',
            'Autom. parkeringsbroms',
            'Mittarmstöd',
            'Fjärrstyrt centrallås',
            'Backkamera rear assist',
            'Klimat-automatik',
            'App-connect',
            'Mörktonade rutor från b-stolpen och bakåt med akustiksidorutor',
            'Led-strålkastare med led-varselljus',
            'Parkeringssensorer fram & bak',
            'Das Welt Auto-Garanti 1 år',
            'Centrallås med safe-låsning komfortstartfunktion keyless go i kombination med stöldskyddslarm',
            'Executive paket',
            'Bagagelucka elmanövrerad samt elektrisk öppning av insynsskydd',
            'Dimstrålkastare fram med statisk kurvljusfunktion',
            'Adaptiv farthållare',
            'Mobiltelefongränssnitt inkl. wlan-hotspot',
            'Lättmetallfälgar 17 tum london silver däck 215/55 r17',
          ],
          properties: {
            abs: true,
            acceleration: 7.6,
            airbagDriver: true,
            airbagFrontSide: null,
            airbagPassenger: true,
            annualTax: 360,
            annualBonus: null,
            annualMalus: null,
            brakeAssistance: true,
            chassis: 'Kombi',
            co2: 39,
            colorName: 'Vit',
            drivingWheel: 'Framhjulsdrift',
            engineCylinders: 4,
            engineVolume: 1395,
            environmentClass: 'Euro 6',
            espSystem: null,
            fuelConsumptionCityDriving: null,
            fuelConsumptionCountryRoadDriving: null,
            fuelConsumptionMixedDriving: 1.6,
            gearboxName: 'Automatisk',
            groundClearence: 14,
            hasAutomaticGearbox: true,
            height: 146,
            isofixRearSeat: true,
            length: 476,
            listPrice: null,
            maxLoadWeight: 555,
            maxRoofWeight: 100,
            maxSpeed: 225,
            ncapMonth: null,
            ncapStar: 5,
            ncapYear: '2014',
            numberOfGears: 6,
            seats: 5,
            secondaryFuelType: null,
            segment: 'Stor Familjebil',
            serviceWeight: 1811,
            tankVolume: 50,
            tco3Years2500: null,
            tiresFront: '205-225/40-55',
            tiresRear: '205-225/40-55',
            torque: 400,
            trailerTotalWeightB: 1250,
            trailerTotalWeightBPlus: 1600,
            trailerWeight: 0,
            trcSystem: null,
            trunkSpace: 650,
            wheelBase: 278,
            width: 183,
          },
          modelName: 'Passat GTE SportsCombi',
        },
      },
    },
  },
];

export default SEARCH_ITEM_QUERY;
