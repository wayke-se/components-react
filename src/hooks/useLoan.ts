import { useQuery } from '@apollo/react-hooks';
import { QueryResult } from '@apollo/react-common';
import LOAN_CALCULATION from '../queries/LOAN_CALCULATION';
import { LoanCalculation, LoanCalculationVariables } from '../@types/gql/LoanCalculation';

const useLoanCalculation = (
  id: string,
  duration?: number,
  downPayment?: number,
  residual?: number
): QueryResult<LoanCalculation> =>
  useQuery<LoanCalculation, LoanCalculationVariables>(LOAN_CALCULATION, {
    variables: {
      id,
      duration: duration as number,
      downPayment: downPayment as number,
      residual: residual as number,
    },
    skip: duration === undefined || downPayment === undefined || residual === undefined,
  });

export default useLoanCalculation;
