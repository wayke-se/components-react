import React from 'react';
import { marked } from 'marked';

import { Repeat } from '../../components/Repeat';
import { ButtonInline } from '../../components/Button';
import Modal from '../../components/Modal';
import Content from '../../components/Content';
import LogoBox from '../../components/LogoBox';
import { useTranslation } from 'react-i18next';

interface ModelLink {
  href?: string | null;
  title?: string | null;
}

export interface PackageOptionModalData {
  title?: string | null;
  image?: string | null;
  description?: string | null;
  link?: ModelLink | null;
}

interface PackageOptionsModalProps {
  packageOption: PackageOptionModalData;
  onClose: () => void;
}

const PackageOptionModal = ({ packageOption, onClose }: PackageOptionsModalProps) => {
  const { t } = useTranslation();
  return (
    <Modal title={packageOption.title || ''} onClose={onClose}>
      {packageOption.image && (
        <Repeat>
          <LogoBox logo={packageOption.image} alt={packageOption.title || undefined} wide />
        </Repeat>
      )}
      {packageOption.description && (
        <Repeat>
          <Content dangerouslySetInnerHTML={{ __html: marked(packageOption.description) }} />
        </Repeat>
      )}
      {packageOption.link?.href && (
        <Repeat>
          <ButtonInline
            as="a"
            href={packageOption.link.href}
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            {packageOption.link.title ? packageOption.link.title : t('item.readMoreInNewTab')}
          </ButtonInline>
        </Repeat>
      )}
    </Modal>
  );
};

export default PackageOptionModal;
