import React from 'react';

import Modal from '../../components/Modal';
import Content from '../../components/Content';

interface DemoCarModalProps {
  onClose: () => void;
}

const DemoCarModal = ({ onClose }: DemoCarModalProps) => (
  <Modal title="Demobil" onClose={onClose}>
    <Content>
      <p>
        En demobil är en bil som stått i utställning eller som på annat sätt använts för att visa
        upp en viss modell. Bilarna är ofta välutrustade och har blivit väl omhändertagna. Dessutom
        har de vanligtvis gått få mil och har fortfarande nybilsgarantierna kvar.
      </p>
    </Content>
  </Modal>
);

export default DemoCarModal;
