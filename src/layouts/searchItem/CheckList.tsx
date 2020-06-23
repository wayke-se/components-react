import React, { useState, useCallback } from 'react';
import marked from 'marked';

import Repeat from '../../components/Repeat/index';
import ActionList from '../../components/ActionList/index';
import { ButtonPrimary, ButtonContent, ButtonInline } from '../../components/Button/index';
import CheckMarkList, { CheckMarkListItem } from '../../components/CheckMarkList/index';
import Modal from '../../components/Modal/index';
import Content from '../../components/Content/index';
import LogoBox from '../../components/LogoBox/index';
import { Vehicle } from '../../@types/codegen/types';

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
  toggleEcomModal: () => void;
}

const CheckList = ({ vehicle, toggleEcomModal }: CheckList) => {
  const [modal, setModal] = useState<ModalProps>();

  const onOpen = useCallback((nextModal: ModalProps) => setModal(nextModal), []);
  const onClose = useCallback(() => setModal(undefined), []);

  const { manufacturer, packageOptions, ecommerce, contact } = vehicle;
  const packageOption = manufacturer?.packageOption;

  return (
    <>
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
      <Repeat>
        <ActionList contact={contact} />
      </Repeat>
    </>
  );
};

export default CheckList;
