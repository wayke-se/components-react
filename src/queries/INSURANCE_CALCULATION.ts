import { gql } from '@apollo/client';

const INSURANCE_CALCULATION = gql`
  query InsuranceCalculation(
    $id: ID!
    $branch: ID
    $personalNumber: PersonalNumber!
    $drivingDistance: DrivingDistance!
  ) {
    insurances(
      id: $id
      branch: $branch
      personalNumber: $personalNumber
      drivingDistance: $drivingDistance
    ) {
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
