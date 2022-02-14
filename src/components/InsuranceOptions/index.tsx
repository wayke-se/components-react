import React from 'react';
import { InsuranceOption, Branch } from '../../@types/codegen/types';
import Insurance from './Insurance';
import InsuranceFree from './InsuranceFree';

interface InsuranceOptions {
  id: string;
  branch?: Branch | null;
  insuranceOptions: InsuranceOption[];
}

const InsuranceOptions = ({ id, branch, insuranceOptions }: InsuranceOptions) => {
  if (!insuranceOptions.length) {
    return null;
  }

  if (insuranceOptions.length > 0) {
    if (insuranceOptions[0].requiresDistance && insuranceOptions[0].requiresPersonalNumber)
      return <Insurance id={id} branch={branch} insuranceOptions={insuranceOptions} />;

    return <InsuranceFree insuranceOptions={insuranceOptions} />;
  }

  return null;
};

export default InsuranceOptions;
