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
import { useTranslation } from 'react-i18next';

interface LeasingProps {
  financialOption: FinancialOption;
}

const Leasing = ({ financialOption }: LeasingProps) => {
  const { t } = useTranslation();
  const [modal, setModal] = useState(false);
  const toggleModal = useCallback(() => setModal(!modal), [modal]);

  const { image, description, monthlyCost, duration, mileage, type, name } = financialOption;

  const title =
    type === 'leasing'
      ? t('item.financialOptions.privateLease')
      : type === 'business-leasing'
      ? t('item.financialOptions.businessLease')
      : type;

  return (
    <>
      {modal && (
        <Modal title={title} onClose={toggleModal}>
          {image && <Image src={image} alt={title} />}
          {description && <Content dangerouslySetInnerHTML={{ __html: description }} />}
          <ModalFoldout>
            <ModalFoldoutBody>
              <DataList
                items={[
                  {
                    label: t('item.financialOptions.monthlyCost'),
                    value: `${numberSeparator(monthlyCost || 0)} ${t('currency.monthly')}`,
                  },
                  {
                    label: t('item.financialOptions.bindingTime'),
                    value: `${duration?.current} månader`,
                  },
                  {
                    label: t('item.financialOptions.annualMileage'),
                    value: `${numberSeparator(mileage?.current || 0)} ${t(
                      'item.financialOptions.mileagePeryear'
                    )}`,
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
            <OptionBoxHeading>{`ca ${numberSeparator(monthlyCost)} ${t(
              'currency.monthly'
            )}`}</OptionBoxHeading>
          )}
        </>
        <OptionBoxContent>
          <p>
            {title}{' '}
            {mileage?.current && duration?.current && (
              <>
                <UtilityTextPrimary>
                  {numberSeparator(mileage?.current)} {t('item.financialOptions.mileagePeryear')}
                </UtilityTextPrimary>{' '}
                i{' '}
                <UtilityTextPrimary>
                  {duration?.current} {t('item.financialOptions.months')}
                </UtilityTextPrimary>
                .{' '}
              </>
            )}
          </p>
          {name && (
            <p>
              <ButtonInline onClick={toggleModal}>{t('common.readMore')}</ButtonInline>
            </p>
          )}
        </OptionBoxContent>
      </OptionBox>
    </>
  );
};

export default Leasing;
