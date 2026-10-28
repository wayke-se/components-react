import { useEffect, useState } from 'react';
import { gqlQuery } from '../client';
import { PublicApiSettings } from '../config';
import { INSURANCE_INQUIRY_QUERY } from './queries';
import { InsuranceInquiryData, InsuranceInquiryInsurance } from './types';

/** Yearly driving distance in Swedish mil, as the public API's DrivingDistance enum. */
export type DrivingDistance =
  | 'BETWEEN_0_AND_1000'
  | 'BETWEEN_1000_AND_1500'
  | 'BETWEEN_1500_AND_2000'
  | 'BETWEEN_2000_AND_2500'
  | 'OVER_2500';

/** Insurance quotes through iteration.commerce.insuranceInquiry. */
const useInsuranceInquiry = (
  settings: PublicApiSettings,
  adId: string,
  personalNumber?: string,
  drivingDistance?: DrivingDistance
) => {
  const [insurances, setInsurances] = useState<InsuranceInquiryInsurance[]>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const skip = !personalNumber || !drivingDistance;

  useEffect(() => {
    if (skip) return;
    let active = true;
    setLoading(true);
    setError(false);
    gqlQuery<InsuranceInquiryData>(settings.api, INSURANCE_INQUIRY_QUERY, {
      id: adId,
      socialId: personalNumber,
      drivingDistance,
    })
      .then((data) => {
        const list = data.ads?.byAdId?.iteration?.commerce.insuranceInquiry?.insurances || [];
        if (active) setInsurances(list.filter((i): i is InsuranceInquiryInsurance => !!i));
      })
      .catch(() => active && setError(true))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, [skip, adId, personalNumber, drivingDistance]);

  return { loading, error, insurances };
};

export default useInsuranceInquiry;
