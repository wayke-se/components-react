import { useCallback, useState } from 'react';
import { MarketCode } from '../@types/market';

export type LeadCommunication = 'email' | 'callme';

interface LeadMetaData {
  key: string;
  value: string;
}

interface LeadPayload {
  firstName: string;
  lastName: string;
  type: string;
  phoneNumber?: string;
  branchId: string;
  email?: string;
  metaData: LeadMetaData[];
}

export interface LeadResponse {
  id?: string;
  branchId?: string;
}

export interface SubmitLeadProps {
  itemId: string;
  branchId: string;
  communication: LeadCommunication;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  email?: string;
  message?: string;
  tradeInCarRegNo?: string;
  tradeInCarMileage?: string;
}

/**
 * Posts a lead straight to lead-service, same contract and metadata keys as
 * website-components-react so leads from any Wayke-powered site look the same in Dealer.
 * `source` (hostname) + `sourceMechanism` is what gives the dealer traceability.
 */
const useSubmitLead = (apiUrl: string | undefined, marketCode: MarketCode = 'SE') => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitLead = useCallback(
    async ({
      itemId,
      branchId,
      communication,
      firstName,
      lastName,
      phoneNumber,
      email,
      message,
      tradeInCarRegNo,
      tradeInCarMileage,
    }: SubmitLeadProps): Promise<LeadResponse> => {
      if (!apiUrl) {
        throw new Error('Missing apiUrl, cannot submit lead');
      }
      setIsLoading(true);
      setError(null);

      const payload: LeadPayload = {
        firstName,
        lastName,
        phoneNumber,
        email,
        branchId,
        type: 'registrationOfInterestToBuy',
        metaData: [
          { key: 'source', value: window.location.hostname.replace(/^www\./, '') },
          { key: 'sourceMechanism', value: `cta.${communication}` },
          { key: 'itemForSaleId', value: itemId },
          ...(tradeInCarRegNo ? [{ key: 'registrationNumber', value: tradeInCarRegNo }] : []),
          // readingUnit describes the unit of tradeInCarMileage, so it only travels with it.
          ...(tradeInCarMileage
            ? [
                { key: 'tradeInCarMileage', value: tradeInCarMileage },
                {
                  key: 'readingUnit',
                  value: marketCode === 'NO' ? 'Kilometer' : 'ScandinavianMile',
                },
              ]
            : []),
          { key: 'message', value: message || '' },
        ],
      };

      try {
        const leadUrl = `${new URL(apiUrl).origin}/lead`;
        const response = await fetch(leadUrl, {
          method: 'POST',
          body: JSON.stringify(payload),
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
          },
        });

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        return (await response.json()) as LeadResponse;
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Something went wrong');
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [apiUrl, marketCode]
  );

  return { isLoading, error, submitLead };
};

export default useSubmitLead;
