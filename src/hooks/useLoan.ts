import { useQuery, QueryResult } from '@apollo/client';
import LOAN_CALCULATION from '../queries/LOAN_CALCULATION';
import { QueryLoanArgs, Query } from '../@types/codegen/types';

const useLoanCalculation = (
  id: string,
  duration?: number,
  downPayment?: number,
  residual?: number
): QueryResult<Query, QueryLoanArgs> =>
  useQuery<Query, QueryLoanArgs>(LOAN_CALCULATION, {
    variables: {
      id,
      duration: duration as number,
      downPayment: downPayment as number,
      residual: (residual as number) || 0,
    },
    skip: duration === undefined || downPayment === undefined,
  });

export default useLoanCalculation;
