import React, { useState, useCallback, useEffect } from 'react';

import { Repeat, RepeatTiny } from '../../components/Repeat';
import ActionList from '../../components/ActionList';
import { ButtonPrimary, ButtonContent, ButtonInline } from '../../components/Button';
import { Columns, Column } from '../../components/Columns';
import { UtilityFontSizeSmall } from '../../components/Utility';
import { StateIndicator } from '../../components/StateIndicator';
import CheckMarkList, { CheckMarkListItem } from '../../components/CheckMarkList';
import Content from '../../components/Content';
import SwitchBar from '../../components/SwitchBar';
import {
  Manufacturer,
  PackageOption,
  Ecommerce,
  ContactOptions,
  Branch,
} from '../../@types/codegen/types';
import BranchModal from './BranchModal';
import PackageOptionModal, { PackageOptionModalData } from './PackageOptionModal';
import { format } from 'date-fns';
import { sv, nb } from 'date-fns/locale';
import { useTranslation } from 'react-i18next';
import { MarketCode } from '../../@types/market';

interface CheckList {
  id: string;
  marketCode?: MarketCode;
  manufacturer?: Manufacturer | null;
  packageOptions: PackageOption[];
  ecommerce?: Ecommerce | null;
  branch?: Branch | null;
  contact?: ContactOptions | null;
  loadingCentralStorageVehicle: boolean;
  availableFrom?: Date | null;
  toggleEcomModal: () => void;
}

const CheckList = ({
  id,
  marketCode,
  manufacturer,
  packageOptions,
  ecommerce,
  branch,
  contact,
  availableFrom,
  toggleEcomModal,
  loadingCentralStorageVehicle,
}: CheckList) => {
  const { t } = useTranslation();
  const [modalBranch, setModalBranch] = useState(false);
  const openModalBranch = useCallback(() => setModalBranch(true), []);
  const closeModalBranch = useCallback(() => setModalBranch(false), []);

  const [modal, setModal] = useState<PackageOptionModalData>();
  const onOpen = useCallback((nextModal: PackageOptionModalData) => setModal(nextModal), []);
  const onClose = useCallback(() => setModal(undefined), []);

  useEffect(() => {
    if ((branch || contact) && modalBranch) {
      setModalBranch(false);
    }
  }, [branch, contact]);

  const packageOption = manufacturer?.packageOption;

  return (
    <>
      {modalBranch && (
        <BranchModal
          loading={loadingCentralStorageVehicle}
          connections={branch?.connections}
          onClose={closeModalBranch}
        />
      )}
      {modal && <PackageOptionModal packageOption={modal} onClose={onClose} />}
      <Repeat>
        {ecommerce && ecommerce.enabled && (
          <RepeatTiny>
            <ButtonPrimary disabled={!!ecommerce.reserved} fullWidth onClick={toggleEcomModal}>
              <ButtonContent>{t('item.actions.buyOnline')}</ButtonContent>
            </ButtonPrimary>
          </RepeatTiny>
        )}
        {ecommerce?.reserved && (
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
        <ActionList id={id} branch={branch} contact={contact} />
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
                  <ButtonInline
                    onClick={() =>
                      onOpen({
                        title: packageOption?.title,
                        image: packageOption?.image,
                        description: packageOption?.description,
                        link: packageOption?.link,
                      })
                    }
                  >
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
                  <ButtonInline
                    onClick={() =>
                      onOpen({
                        title: packageOption?.title,
                        image: packageOption?.image,
                        description: packageOption?.description,
                        link: packageOption?.link,
                      })
                    }
                  >
                    {packageOption.title}
                  </ButtonInline>
                </>
              </CheckMarkListItem>
            ))}
            {ecommerce?.withHomeDelivery && (
              <CheckMarkListItem>{t('item.homeDelivery')}</CheckMarkListItem>
            )}
          </CheckMarkList>
        </RepeatTiny>
      </Repeat>
      {(branch?.connections.length || 0) > 1 && (
        <Repeat>
          <SwitchBar
            title={t('item.centralWarehouseCar')}
            actionTitle={t('item.switchBranch') || ''}
            onClick={openModalBranch}
          >
            <Content>
              <p>{t('item.centralWarehouseCarDescription')}</p>
            </Content>
          </SwitchBar>
        </Repeat>
      )}
    </>
  );
};

export default CheckList;
