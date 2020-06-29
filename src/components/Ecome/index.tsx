import React, { useCallback } from 'react';
import Ecom from '@wayke-se/ecom-react';

import { IEcomExternalProps } from '@wayke-se/ecom-react/dist-types/types';
import { Vehicle, Maybe, Manufacturer } from '../../@types/codegen/types';
import useSettings from '../../hooks/useSettings';
import PubSub from '../../utils/pubsub/pubsub';

interface EcomeProps {
  vehicle: Vehicle;
  manufacturer?: Maybe<Manufacturer>;
  onExit: () => void;
  onUserEvent?: (userEvent: string, currentStep: string) => void;
}

const Ecome = ({ vehicle, manufacturer, onExit, onUserEvent }: EcomeProps) => {
  const { ecomSettings } = useSettings();

  const onUserEventLocal = useCallback((userEvent: string, currentStep: string) => {
    PubSub.publish('EcomOnUserEvent', userEvent, currentStep);
    if (onUserEvent) {
      onUserEvent(userEvent, currentStep);
    }
  }, []);

  const onExitLocal = useCallback(() => {
    PubSub.publish('EcomOnExit');
    if (onExit) {
      onExit();
    }
  }, []);

  const { id, title, shortDescription, price, data, media } = vehicle;

  const { modelYear, mileage, gearbox, fuelType } = data;

  const imageUrl = media?.[0]?.files?.[0]?.url;

  const ecomData: IEcomExternalProps = {
    vehicle: {
      id,
      title,
      shortDescription: shortDescription || '',
      price,
      imageUrl,
      modelYear,
      milage: `${mileage}`,
      gearBox: gearbox || '',
      fuelType: fuelType || '',
    },
    serviceLogotypeUrl:
      manufacturer?.logotype || 'https://cdn.wayke.se/wui/images/ecom/wayke-logo.svg',
    onExit: onExitLocal,
    onUserEvent: onUserEventLocal,
    useBankId: ecomSettings?.useBankId,
    displayBankIdAlert: ecomSettings?.displayBankIdAlert,
  };

  return <Ecom {...ecomData} />;
};

export default Ecome;
