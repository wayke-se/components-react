import { useQuery } from '@apollo/client/react';
import LOAN_CALCULATION from '../queries/LOAN_CALCULATION';
import { QueryLoanArgs, Query } from '../@types/codegen/types';
import { asStrict, StrictQueryResult } from './apolloTypes';

const useLoanCalculation = (
  id: string,
  duration?: number,
  downPayment?: number,
  residual?: number
): StrictQueryResult<Query, QueryLoanArgs> =>
  asStrict(
    useQuery<Query, QueryLoanArgs>(LOAN_CALCULATION, {
      variables: {
        id,
        duration: duration as number,
        downPayment: downPayment as number,
        residual: (residual as number) || 0,
      },
      skip: duration === undefined || downPayment === undefined,
    })
  );

export default useLoanCalculation;
