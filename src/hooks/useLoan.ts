import { useQuery } from '@apollo/client/react';
import { Query, QueryLoanArgs } from '../@types/codegen/types';
import LOAN_CALCULATION from '../queries/LOAN_CALCULATION';
import { asStrict, StrictQueryResult } from './apolloTypes';

const useLoanCalculation = (
  id: string,
  duration?: number,
  downPayment?: number,
  residual?: number
): StrictQueryResult<Query, QueryLoanArgs> =>
  asStrict(
    useQuery<Query, QueryLoanArgs>(LOAN_CALCULATION, {
      // The gateway declares duration/downPayment as Int, but the item query can return a
      // fractional downPayment (e.g. 128484.81), which makes the whole query fail and the
      // loan box stay on "Loading…" forever. Round before sending.
      variables: {
        id,
        duration: Math.round(duration as number),
        downPayment: Math.round(downPayment as number),
        residual: (residual as number) || 0,
      },
      skip: duration === undefined || downPayment === undefined,
    })
  );

export default useLoanCalculation;
