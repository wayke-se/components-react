import { useEffect, useState } from 'react';
import { gqlQuery } from '../client';
import { PublicApiSettings } from '../config';
import { CALCULATE_PAYMENT_QUERY } from './queries';
import { CalculatePaymentData, PaymentResponse } from './types';

export interface LoanVariables {
  financialOptionId?: string | null;
  duration?: number;
  downPayment?: number;
  residual?: number;
}

/** A recalculated loan through iteration.commerce.calculatePayment. */
const useLoanCalculation = (
  settings: PublicApiSettings,
  adId: string,
  { financialOptionId, duration, downPayment, residual }: LoanVariables
) => {
  const [payment, setPayment] = useState<PaymentResponse>();
  const [loading, setLoading] = useState(false);
  const skip = duration === undefined || downPayment === undefined;

  useEffect(() => {
    if (skip) return;
    let active = true;
    setLoading(true);
    gqlQuery<CalculatePaymentData>(settings.api, CALCULATE_PAYMENT_QUERY, {
      id: adId,
      config: {
        financialOptionId: financialOptionId || undefined,
        duration: Math.round(duration),
        downPayment: Math.round(downPayment),
        residual: residual || 0,
      },
    })
      .then((data) => {
        const next = data.ads?.byAdId?.iteration?.commerce.calculatePayment;
        if (active && next) setPayment(next);
      })
      .catch(() => undefined)
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, [skip, adId, financialOptionId, duration, downPayment, residual]);

  return { loading, payment };
};

export default useLoanCalculation;
