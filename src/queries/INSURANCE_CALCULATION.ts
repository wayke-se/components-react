import { gql } from 'apollo-boost';

const INSURANCE_CALCULATION = gql`
  query InsuranceCalculation(
    $id: ID!
    $personalNumber: String!
    $drivingDistance: DrivingDistance!
  ) {
    insurances(id: $id, personalNumber: $personalNumber, drivingDistance: $drivingDistance) {
      name
      price
      unit
      description
      logotype
      addons {
        id
        title
        description
        price
        unit
        exclusions
      }
      items {
        name
        description
      }
      legality {
        description
        url
      }
      terms
      url
    }
  }
`;

export default INSURANCE_CALCULATION;
