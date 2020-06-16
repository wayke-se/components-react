import React, { useState, useCallback } from 'react';

import OptionBox from '../OptionBox';
import { OptionBoxHeading, OptionBoxContent } from '../OptionBox/wrapper';
import { UtilityTextPrimary } from '../Utility';
import { ButtonInline } from '../Button';
import { SearchItem_vehicle_financialOptions } from '../../@types/gql/SearchItem';
import { numberSeparator } from '../../utils/formats';
import Modal from '../Modal';
import Content from '../Content';

interface LeasingProps {
  financialOption: SearchItem_vehicle_financialOptions;
}

const Leasing = ({ financialOption }: LeasingProps) => {
  const [modal, setModal] = useState(false);
  const toggleModal = useCallback(() => setModal(!modal), [modal]);

  const { image, description, monthlyCost, duration, mileage } = financialOption;

  return (
    <>
      {modal && (
        <Modal title="Privatleasing" onClose={toggleModal}>
          {image && <img src={image} />}
          <Content>
            {description && <div dangerouslySetInnerHTML={{ __html: description }} />}

            <b>Månadskostand</b>
            <p>{monthlyCost} kr/mån</p>

            <b>Bindningstid</b>
            <p>{duration?.current} månader</p>

            <b>Årlig körsträcka</b>
            <p>{mileage?.current} mil/år</p>
          </Content>
        </Modal>
      )}
      <OptionBox>
        <>
          {monthlyCost !== null && (
            <OptionBoxHeading>{`ca ${numberSeparator(monthlyCost)} kr/mån`}</OptionBoxHeading>
          )}
        </>
        <OptionBoxContent>
          <p>
            Privatleasing{' '}
            {mileage?.current && duration?.current && (
              <>
                <UtilityTextPrimary>{numberSeparator(mileage?.current)} mil/år</UtilityTextPrimary>{' '}
                i <UtilityTextPrimary>{duration?.current} mån</UtilityTextPrimary>.{' '}
              </>
            )}
          </p>
          <p>
            <ButtonInline onClick={toggleModal}>Läs mer</ButtonInline>
          </p>
        </OptionBoxContent>
      </OptionBox>
    </>
  );
};

export default Leasing;
