import { gql } from 'apollo-boost';
import { MockedResponse } from '@apollo/react-testing';

const VEHICLE_QUERY = gql`
  query VehicleQuery($id: String) {
    vehicle(id: $id) {
      description
    }
  }
`;

export const VEHICLE_QUERY_MOCKS: MockedResponse[] = [
  {
    request: {
      query: VEHICLE_QUERY,
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
            airbagPassenger: true,
            annualTax: 360,
            brakeAssistance: true,
            chassis: 'Kombi',
            co2: 39,
            co2Agg: 39,
            colorName: 'Vit',
            drivingWheel: 'Framhjulsdrift',
            engineCylinders: 4,
            engineVolume: 1395,
            environmentClass: 'Euro 6',
            fuelConsumptionMixedDriving: 1.6,
            gearboxName: 'Automatisk',
            groundClearence: 14,
            hasAutomaticGearbox: true,
            height: 146,
            isofixRearSeat: true,
            length: 476,
            maxLoadWeight: 555,
            maxRoofWeight: 100,
            maxSpeed: 225,
            ncapStar: 5,
            ncapYear: '2014',
            numberOfGears: 6,
            seats: 5,
            segment: 'Stor Familjebil',
            serviceWeight: 1811,
            tankVolume: 50,
            tiresFront: '205-225/40-55',
            tiresRear: '205-225/40-55',
            torque: 400,
            trailerTotalWeightB: 1250,
            trailerTotalWeightBPlus: 1600,
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

export default VEHICLE_QUERY;
