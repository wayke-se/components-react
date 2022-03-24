import React from 'react';

import Modal from '../Modal';
import Content from '../Content';
import { Repeat } from '../Repeat/index';
import { ButtonInline } from '../Button';
import LogoBox from '../LogoBox';
import { InsuranceOption } from '../../@types/codegen/types';
import { marked } from 'marked';

interface InsuranceFreeModal {
  onClose: () => void;
  insuranceOptions: InsuranceOption;
}

const InsuranceFreeModal = ({ onClose, insuranceOptions }: InsuranceFreeModal) => {
  return (
    <Modal title={insuranceOptions?.insuranceHeader ?? 'Försäkring'} onClose={onClose}>
      {insuranceOptions?.longDescription && (
        <Repeat>
          <Content
            dangerouslySetInnerHTML={{
              __html: marked(insuranceOptions.longDescription),
            }}
          ></Content>
        </Repeat>
      )}
      {insuranceOptions?.url && (
        <Repeat>
          <ButtonInline
            as="a"
            href={insuranceOptions.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            Läs mer om försäkringen (Öppnas i ett nytt fönster)
          </ButtonInline>
        </Repeat>
      )}
      {insuranceOptions?.logotype && (
        <Repeat>
          <LogoBox logo={insuranceOptions.logotype} alt={insuranceOptions.name || 'Logotyp'} wide />
        </Repeat>
      )}
    </Modal>
  );
};

export default InsuranceFreeModal;
