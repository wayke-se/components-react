import React from 'react';
import marked from 'marked';

import Repeat from '../../components/Repeat/index';
import { ButtonInline } from '../../components/Button/index';
import Modal from '../../components/Modal/index';
import Content from '../../components/Content/index';
import LogoBox from '../../components/LogoBox/index';

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

const PackageOptionModal = ({ packageOption, onClose }: PackageOptionsModalProps) => (
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
    {packageOption.link?.href && packageOption.link.title && (
      <Repeat>
        <ButtonInline
          as="a"
          href={packageOption.link.href}
          target="_blank"
          rel="noopener noreferrer nofollow"
        >
          {packageOption.link.title}
        </ButtonInline>
      </Repeat>
    )}
  </Modal>
);

export default PackageOptionModal;
