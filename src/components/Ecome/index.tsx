import React from 'react';
import Ecom from '@wayke-se/ecom-react';

import { IEcomExternalProps } from '@wayke-se/ecom-react/dist-types/types';
import { Vehicle, Maybe, Manufacturer } from '../../@types/codegen/types';

interface EcomeProps {
  vehicle: Vehicle;
  manufacturer?: Maybe<Manufacturer>;
  useBankId?: boolean;
  displayBankIdAlert?: boolean;
  onExit: () => void;
  onUserEvent?: () => void;
}

const Ecome = ({
  useBankId,
  displayBankIdAlert,
  vehicle,
  manufacturer,
  onExit,
  onUserEvent,
}: EcomeProps) => {
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
    onExit,
    onUserEvent,
    useBankId,
    displayBankIdAlert,
  };

  return <Ecom {...ecomData} />;
};

export default Ecome;
