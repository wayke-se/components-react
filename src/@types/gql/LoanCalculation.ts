/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: LoanCalculation
// ====================================================

export interface LoanCalculation_loan_downPayment {
  __typename: "FinancialOptionDetail";
  current: number;
}

export interface LoanCalculation_loan_duration {
  __typename: "FinancialOptionDetail";
  current: number;
}

export interface LoanCalculation_loan_residual {
  __typename: "FinancialOptionDetail";
  current: number;
}

export interface LoanCalculation_loan {
  __typename: "FinancialOption";
  downPayment: LoanCalculation_loan_downPayment | null;
  effectiveInterest: number | null;
  duration: LoanCalculation_loan_duration | null;
  residual: LoanCalculation_loan_residual | null;
  interest: number | null;
  loanAmount: number | null;
  totalCreditCost: number | null;
  totalResidualValue: number | null;
  monthlyCost: number | null;
}

export interface LoanCalculation {
  loan: LoanCalculation_loan | null;
}

export interface LoanCalculationVariables {
  id: string;
  duration: number;
  downPayment: number;
  residual: number;
}
