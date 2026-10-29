import { format } from 'date-fns';
import { nb, sv } from 'date-fns/locale';
import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ConversionOption } from '../../@types/conversion';
import ActionList from '../../components/ActionList';
import { ButtonInline } from '../../components/Button';
import CheckMarkList, { CheckMarkListItem } from '../../components/CheckMarkList';
import { Column, Columns } from '../../components/Columns';
import Content from '../../components/Content';
import { Repeat, RepeatTiny } from '../../components/Repeat';
import { StateIndicator } from '../../components/StateIndicator';
import SwitchBar from '../../components/SwitchBar';
import { UtilityFontSizeSmall } from '../../components/Utility';
import {
  availableFrom as adAvailableFrom,
  ecom,
  manufacturerPackage,
  packageOffers,
} from '../../Gql/ad/view';
import useAdContext from '../../State/Ad/AdContext';
import useSettings from '../../State/Settings/useSettings';
import PackageOptionModal, { PackageOptionModalData } from './PackageOptionModal';

interface CheckListProps {
  title: string;
  conversionOptions?: ConversionOption[];
  // Undefined when the site turns buy online off, which hides the buy button.
  toggleEcomModal?: () => void;
}

const CheckList = ({ title, conversionOptions, toggleEcomModal }: CheckListProps) => {
  const { t } = useTranslation();
  const ad = useAdContext();
  const { marketCode } = useSettings();
  const ecommerce = ecom(ad);
  const availableFrom = adAvailableFrom(ad);
  const packageOption = manufacturerPackage(ad);
  const packageOptions = packageOffers(ad);

  const [modal, setModal] = useState<PackageOptionModalData>();
  const onOpen = useCallback((nextModal: PackageOptionModalData) => setModal(nextModal), []);
  const onClose = useCallback(() => setModal(undefined), []);

  return (
    <>
      {modal && <PackageOptionModal packageOption={modal} onClose={onClose} />}
      <Repeat>
        <ActionList
          title={title}
          conversionOptions={conversionOptions}
          toggleEcomModal={toggleEcomModal}
        />
        {ecommerce.enabled && ecommerce.reserved && (
          <RepeatTiny>
            <SwitchBar
              title={t('item.carIsReserved')}
              body={t('item.carIsReservedDescription') || undefined}
            >
              <Content>
                <p>{t('item.carIsReservedModalBody')}</p>
              </Content>
            </SwitchBar>
          </RepeatTiny>
        )}
      </Repeat>
      <Repeat>
        {availableFrom && new Date(availableFrom).valueOf() > new Date().valueOf() && (
          <RepeatTiny>
            <Columns $spacing={1} valign="center">
              <Column noShrink>
                <StateIndicator $tone="pending" />
              </Column>
              <Column>
                <UtilityFontSizeSmall>
                  {t('item.availableFromDate', {
                    date: format(new Date(availableFrom), 'dd MMMM yyyy', {
                      locale: marketCode === 'NO' ? nb : sv,
                    }),
                  })}
                </UtilityFontSizeSmall>
              </Column>
            </Columns>
          </RepeatTiny>
        )}
        <RepeatTiny>
          <CheckMarkList>
            {packageOption?.title && (
              <CheckMarkListItem>
                <>
                  {t('item.includingShort')}{' '}
                  <ButtonInline onClick={() => onOpen(packageOption)}>
                    {packageOption.title}
                  </ButtonInline>{' '}
                  {t('item.usedWarrany').toLowerCase()}
                </>
              </CheckMarkListItem>
            )}
            {packageOptions?.map((packageOption, index) => (
              <CheckMarkListItem key={packageOption.title || index}>
                <>
                  {t('item.includingShort')}{' '}
                  <ButtonInline onClick={() => onOpen(packageOption)}>
                    {packageOption.title}
                  </ButtonInline>
                </>
              </CheckMarkListItem>
            ))}
            {ecommerce.enabled && ad.iteration?.commerce.homeDelivery && (
              <CheckMarkListItem>{t('item.homeDelivery')}</CheckMarkListItem>
            )}
          </CheckMarkList>
        </RepeatTiny>
      </Repeat>
    </>
  );
};

export default CheckList;
