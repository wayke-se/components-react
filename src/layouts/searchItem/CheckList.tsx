import React, { useState, useCallback } from 'react';
import marked from 'marked';

import Repeat from '../../components/Repeat';
import ActionList from '../../components/ActionList';
import { ButtonPrimary, ButtonContent, ButtonInline } from '../../components/Button';
import CheckMarkList, { CheckMarkListItem } from '../../components/CheckMarkList';
import { SearchItem_vehicle } from '../../@types/gql/SearchItem';
import Modal from '../../components/Modal';
import Content from '../../components/Content';
import { Image } from '../../components/Modal/wrapper';

interface ModelLink {
  href: string | null;
  title: string | null;
}

interface ModalProps {
  title: string | null;
  image?: string | null;
  description?: string | null;
  link?: ModelLink | null;
}

interface CheckList {
  vehicle: SearchItem_vehicle;
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
        <Modal title={modal.title} onClose={onClose}>
          {modal.image && <Image src={modal.image} alt={modal.title || undefined} />}
          <Content>
            {modal.description && (
              <div dangerouslySetInnerHTML={{ __html: marked(modal.description) }} />
            )}
            {modal.link?.href && modal.link.title && (
              <a href={modal.link.href} target="_blank" rel="noopener noreferrer nofollow">
                {modal.link.title}
              </a>
            )}
          </Content>
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
          {ecommerce?.withHomeDelivery && <CheckMarkListItem>Gratis hemleverans</CheckMarkListItem>}
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
