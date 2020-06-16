import { useQuery } from '@apollo/react-hooks';
import { QueryResult } from '@apollo/react-common';
import INSURANCE_CALCULATION from '../queries/INSURANCE_CALCULATION';
import {
  InsuranceCalculationVariables,
  InsuranceCalculation,
} from '../@types/gql/InsuranceCalculation';
import { DrivingDistance } from '../@types/gql/globalTypes';

const useInsuranceCalculation = (
  id: string,
  personalNumber?: string,
  drivingDistance?: DrivingDistance
): QueryResult<InsuranceCalculation> =>
  useQuery<InsuranceCalculation, InsuranceCalculationVariables>(INSURANCE_CALCULATION, {
    variables: {
      id,
      personalNumber: personalNumber as string,
      drivingDistance: drivingDistance as DrivingDistance,
    },
    skip: personalNumber === undefined || drivingDistance === undefined,
  });

export default useInsuranceCalculation;
