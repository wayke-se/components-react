import React, { useState, useCallback, useEffect } from 'react';
import marked from 'marked';

import Repeat from '../../components/Repeat/index';
import ActionList from '../../components/ActionList/index';
import { ButtonPrimary, ButtonContent, ButtonInline } from '../../components/Button/index';
import CheckMarkList, { CheckMarkListItem } from '../../components/CheckMarkList/index';
import Modal from '../../components/Modal/index';
import Content from '../../components/Content/index';
import LogoBox from '../../components/LogoBox/index';
import SwitchBar from '../../components/SwitchBar/index';
import { Vehicle } from '../../@types/codegen/types';
import BranchModal from './BranchModal';

interface ModelLink {
  href?: string | null;
  title?: string | null;
}

interface ModalProps {
  title?: string | null;
  image?: string | null;
  description?: string | null;
  link?: ModelLink | null;
}

interface CheckList {
  vehicle: Vehicle;
  centralStorageVehicle?: Vehicle | null;
  loadingCentralStorageVehicle: boolean;
  toggleEcomModal: () => void;
}

const CheckList = ({
  vehicle,
  toggleEcomModal,
  centralStorageVehicle,
  loadingCentralStorageVehicle,
}: CheckList) => {
  const [modalBranch, setModalBranch] = useState(false);

  const openModalBranch = useCallback(() => setModalBranch(true), []);
  const closeModalBranch = useCallback(() => setModalBranch(false), []);

  const [modal, setModal] = useState<ModalProps>();

  const onOpen = useCallback((nextModal: ModalProps) => setModal(nextModal), []);
  const onClose = useCallback(() => setModal(undefined), []);

  useEffect(() => {
    if (centralStorageVehicle && modalBranch) {
      setModalBranch(false);
    }
  }, [centralStorageVehicle]);

  const contact = centralStorageVehicle?.contact;
  const { manufacturer, packageOptions, ecommerce } = vehicle;
  const packageOption = manufacturer?.packageOption;

  return (
    <>
      {modalBranch && (
        <BranchModal
          loading={loadingCentralStorageVehicle}
          connections={vehicle?.branch?.connections}
          onClose={closeModalBranch}
        />
      )}
      {modal && (
        <Modal title={modal.title || ''} onClose={onClose}>
          {modal.image && (
            <Repeat>
              <LogoBox logo={modal.image} alt={modal.title || undefined} wide />
            </Repeat>
          )}
          {modal.description && (
            <Repeat>
              <Content dangerouslySetInnerHTML={{ __html: marked(modal.description) }} />
            </Repeat>
          )}
          {modal.link?.href && modal.link.title && (
            <Repeat>
              <ButtonInline
                as="a"
                href={modal.link.href}
                target="_blank"
                rel="noopener noreferrer nofollow"
              >
                {modal.link.title}
              </ButtonInline>
            </Repeat>
          )}
        </Modal>
      )}
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
      {ecommerce && ecommerce.enabled && (
        <Repeat>
          <ButtonPrimary fullWidth onClick={toggleEcomModal}>
            <ButtonContent>Köp bilen online</ButtonContent>
          </ButtonPrimary>
        </Repeat>
      )}
      {contact && (
        <Repeat>
          <ActionList contact={contact} />
        </Repeat>
      )}
      {(vehicle.branch?.connections.length || 0) > 1 && (
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
