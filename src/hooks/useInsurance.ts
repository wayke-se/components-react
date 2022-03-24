import { useQuery, QueryResult } from '@apollo/client';
import INSURANCE_CALCULATION from '../queries/INSURANCE_CALCULATION';

import { DrivingDistance, QueryInsurancesArgs, Query } from '../@types/codegen/types';

const useInsuranceCalculation = (
  id: string,
  branchId?: string,
  personalNumber?: string,
  drivingDistance?: DrivingDistance
): QueryResult<Query, QueryInsurancesArgs> =>
  useQuery<Query, QueryInsurancesArgs>(INSURANCE_CALCULATION, {
    variables: {
      id,
      branch: branchId as string,
      personalNumber: personalNumber as string,
      drivingDistance: drivingDistance as DrivingDistance,
    },
    skip: personalNumber === undefined || drivingDistance === undefined || branchId === undefined,
  });

export default useInsuranceCalculation;
