import { gql } from 'apollo-boost';

const LOAN_CALCULATION = gql`
  query LoanCalculation($id: ID!, $duration: Int!, $downPayment: Int!, $residual: Float!) {
    loanCalculation(id: $id, duration: $duration, downPayment: $downPayment, residual: $residual) {
      downPayment {
        current
      }
      effectiveInterest
      duration {
        current
      }
      residual {
        current
      }
      interest
      loanAmount
      totalCreditCost
      totalResidualValue
      monthlyCost
    }
  }
`;

export default LOAN_CALCULATION;
