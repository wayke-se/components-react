import { useQuery } from '@apollo/client/react';
import INSURANCE_CALCULATION from '../queries/INSURANCE_CALCULATION';

import { DrivingDistance, QueryInsurancesArgs, Query } from '../@types/codegen/types';
import { asStrict, StrictQueryResult } from './apolloTypes';

const useInsuranceCalculation = (
  id: string,
  branchId?: string,
  personalNumber?: string,
  drivingDistance?: DrivingDistance
): StrictQueryResult<Query, QueryInsurancesArgs> =>
  asStrict(
    useQuery<Query, QueryInsurancesArgs>(INSURANCE_CALCULATION, {
      variables: {
        id,
        branch: branchId as string,
        personalNumber: personalNumber as string,
        drivingDistance: drivingDistance as DrivingDistance,
      },
      skip: personalNumber === undefined || drivingDistance === undefined || branchId === undefined,
    })
  );

export default useInsuranceCalculation;
