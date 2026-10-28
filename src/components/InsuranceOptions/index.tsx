import React from 'react';
import { InsuranceProvider } from '../../Gql/ad/types';
import Insurance from './Insurance';
import InsuranceFree from './InsuranceFree';

interface InsuranceOptionsProps {
  provider: InsuranceProvider;
}

/** A quote needs a personal number and a distance; without them the offer is just described. */
const InsuranceOptions = ({ provider }: InsuranceOptionsProps) =>
  provider.requiresDistance && provider.requiresPersonalNumber ? (
    <Insurance provider={provider} />
  ) : (
    <InsuranceFree provider={provider} />
  );

export default InsuranceOptions;
