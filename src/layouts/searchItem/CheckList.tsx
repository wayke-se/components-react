import React, { useState, useCallback, useEffect } from 'react';

import { Repeat, RepeatTiny } from '../../components/Repeat/index';
import ActionList from '../../components/ActionList/index';
import { ButtonPrimary, ButtonContent, ButtonInline } from '../../components/Button/index';
import CheckMarkList, { CheckMarkListItem } from '../../components/CheckMarkList/index';
import Content from '../../components/Content/index';
import SwitchBar from '../../components/SwitchBar/index';
import {
  Manufacturer,
  PackageOption,
  Ecommerce,
  ContactOptions,
  Branch,
} from '../../@types/codegen/types';
import BranchModal from './BranchModal';
import PackageOptionModal, { PackageOptionModalData } from './PackageOptionModal';

interface CheckList {
  manufacturer?: Manufacturer | null;
  packageOptions: PackageOption[];
  ecommerce?: Ecommerce | null;
  branch?: Branch | null;
  contact?: ContactOptions | null;
  loadingCentralStorageVehicle: boolean;
  toggleEcomModal: () => void;
}

const CheckList = ({
  manufacturer,
  packageOptions,
  ecommerce,
  branch,
  contact,
  toggleEcomModal,
  loadingCentralStorageVehicle,
}: CheckList) => {
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
        <CheckMarkList>
          {packageOption?.title && (
            <CheckMarkListItem>
              <>
                Inkl.{' '}
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
                begagnatgaranti
              </>
            </CheckMarkListItem>
          )}
          {packageOptions?.map((packageOption, index) => (
            <CheckMarkListItem key={packageOption.title || index}>
              <>
                Inkl.{' '}
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
          {ecommerce?.withHomeDelivery && <CheckMarkListItem>Hemleverans</CheckMarkListItem>}
        </CheckMarkList>
      </Repeat>
      <Repeat>
        {ecommerce && ecommerce.enabled && (
          <RepeatTiny>
            <ButtonPrimary disabled={!!ecommerce.reserved} fullWidth onClick={toggleEcomModal}>
              <ButtonContent>Köp bilen online</ButtonContent>
            </ButtonPrimary>
          </RepeatTiny>
        )}
        {ecommerce?.reserved && (
          <RepeatTiny>
            <SwitchBar
              title="Bilen är reserverad"
              body="Denna bil är reserverad av en annan köpare."
            >
              <Content>
                <p>Denna bil är reserverad av en annan köpare.</p>
              </Content>
            </SwitchBar>
          </RepeatTiny>
        )}
        <ActionList branch={branch} contact={contact} />
      </Repeat>
      {(branch?.connections.length || 0) > 1 && (
        <Repeat>
          <SwitchBar title="Centrallagerbil" actionTitle="Byt anläggning" onClick={openModalBranch}>
            <Content>
              <p>
                Denna bil tillhör ett centrallager och går att köpa genom flera anläggningar. Byt
                anläggning för att visa kontaktuppgifter till just den anläggningen.
              </p>
            </Content>
          </SwitchBar>
        </Repeat>
      )}
    </>
  );
};

export default CheckList;
