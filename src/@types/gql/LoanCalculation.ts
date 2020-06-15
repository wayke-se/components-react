/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: LoanCalculation
// ====================================================

export interface LoanCalculation_loanCalculation_downPayment {
  __typename: 'FinancialOptionDetail';
  current: number;
}

export interface LoanCalculation_loanCalculation_duration {
  __typename: 'FinancialOptionDetail';
  current: number;
}

export interface LoanCalculation_loanCalculation_residual {
  __typename: 'FinancialOptionDetail';
  current: number;
}

export interface LoanCalculation_loanCalculation {
  __typename: 'FinancialOption';
  downPayment: LoanCalculation_loanCalculation_downPayment | null;
  effectiveInterest: number | null;
  duration: LoanCalculation_loanCalculation_duration | null;
  residual: LoanCalculation_loanCalculation_residual | null;
  interest: number | null;
  loanAmount: number | null;
  totalCreditCost: number | null;
  totalResidualValue: number | null;
  monthlyCost: number | null;
}

export interface LoanCalculation {
  loanCalculation: LoanCalculation_loanCalculation | null;
}

export interface LoanCalculationVariables {
  id: string;
  duration: number;
  downPayment: number;
  residual: number;
}
