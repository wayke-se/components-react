import React, { useState, useCallback } from 'react';

import OptionBox from '../OptionBox/index';
import { OptionBoxHeading, OptionBoxContent } from '../OptionBox/wrapper';
import { UtilityTextPrimary } from '../Utility/index';
import { ButtonInline } from '../Button/index';
import { numberSeparator } from '../../utils/formats';
import Modal from '../Modal/index';
import { Image, ModalFoldout, ModalFoldoutBody } from '../Modal/wrapper';
import Content from '../Content/index';
import DataList from '../DataList/index';
import { FinancialOption } from '../../@types/codegen/types';

interface LeasingProps {
  financialOption: FinancialOption;
}

const Leasing = ({ financialOption }: LeasingProps) => {
  const [modal, setModal] = useState(false);
  const toggleModal = useCallback(() => setModal(!modal), [modal]);

  const { image, description, monthlyCost, duration, mileage } = financialOption;

  return (
    <>
      {modal && (
        <Modal title="Privatleasing" onClose={toggleModal}>
          {image && <Image src={image} alt="Privatleasing" />}
          {description && <Content dangerouslySetInnerHTML={{ __html: description }} />}
          <ModalFoldout>
            <ModalFoldoutBody>
              <DataList
                items={[
                  {
                    label: 'Månadskostnad',
                    value: `${numberSeparator(monthlyCost || 0)} kr/mån`,
                  },
                  {
                    label: 'Bindningstid',
                    value: `${duration?.current} månader`,
                  },
                  {
                    label: 'Årlig körsträcka',
                    value: `${numberSeparator(mileage?.current || 0)} mil/år`,
                  },
                ]}
              />
            </ModalFoldoutBody>
          </ModalFoldout>
        </Modal>
      )}
      <OptionBox>
        <>
          {monthlyCost !== null && monthlyCost !== undefined && (
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
