import { gql } from '@apollo/client';

const FinancialOptionDetail = gql`
  fragment FinancialOptionDetail on FinancialOptionDetail {
    current
    default
    max
    min
    step
  }
`;

const LOAN_CALCULATION = gql`
  query LoanCalculation($id: ID!, $duration: Int!, $downPayment: Int!, $residual: Float!) {
    loan(id: $id, duration: $duration, downPayment: $downPayment, residual: $residual) {
      downPayment {
        ...FinancialOptionDetail
      }
      effectiveInterest
      duration {
        ...FinancialOptionDetail
      }
      residual {
        ...FinancialOptionDetail
      }
      mileage {
        ...FinancialOptionDetail
      }
      interest
      loanAmount
      totalCreditCost
      totalResidualValue
      monthlyCost
    }
  }
  ${FinancialOptionDetail}
`;

export default LOAN_CALCULATION;
