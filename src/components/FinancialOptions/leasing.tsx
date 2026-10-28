import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LeasingOffer } from '../../Gql/ad/view';
import { numberSeparator } from '../../utils/formats';
import { ButtonInline } from '../Button';
import Content from '../Content';
import DataList from '../DataList';
import Modal from '../Modal';
import { Image, ModalFoldout, ModalFoldoutBody } from '../Modal/wrapper';
import OptionBox from '../OptionBox';
import { OptionBoxContent, OptionBoxHeading } from '../OptionBox/wrapper';
import { UtilityTextPrimary } from '../Utility';

interface LeasingProps {
  offer: LeasingOffer;
}

const Leasing = ({ offer }: LeasingProps) => {
  const { t } = useTranslation();
  const [modal, setModal] = useState(false);
  const toggleModal = useCallback(() => setModal(!modal), [modal]);

  const { image, description, monthlyCost, months, mileagePerYear, business, name } = offer;

  const title = business
    ? t('item.financialOptions.businessLease')
    : t('item.financialOptions.privateLease');

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
                    value: `${months} månader`,
                  },
                  {
                    label: t('item.financialOptions.annualMileage'),
                    value: `${numberSeparator(mileagePerYear || 0)} ${t(
                      'item.financialOptions.mileagePerYear'
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
          <OptionBoxHeading>{`ca ${numberSeparator(monthlyCost)} ${t(
            'currency.monthly'
          )}`}</OptionBoxHeading>
        </>
        <OptionBoxContent>
          <p>
            {title}{' '}
            {mileagePerYear && months && (
              <>
                <UtilityTextPrimary>
                  {numberSeparator(mileagePerYear)} {t('item.financialOptions.mileagePerYear')}
                </UtilityTextPrimary>{' '}
                i{' '}
                <UtilityTextPrimary>
                  {months} {t('item.financialOptions.months')}
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
