import React from 'react';

import { Accessory } from '../../../@types/codegen/types';
import { numberSeparator } from '../../../utils/formats';
import { marked } from 'marked';

interface AccesoryModalProps {
  accessory: Accessory;
  onClose: () => void;
}

const AccesoryModal = ({ accessory, onClose }: AccesoryModalProps) => (
  <div title={accessory.name} onClose={onClose}>
    {accessory.images?.[0] && (
      <div>
        <img src={`${accessory.images[0]}?w=570`} alt={`${accessory.name}`} />
      </div>
    )}
    {accessory.logotype && (
      <div>
        <img
          src={accessory.logotype}
          srcSet={`${accessory.logotype} 2x`}
          alt={`${accessory.manufacturer} logotyp`}
        />
      </div>
    )}
    <div>
      <div>Kontantpris</div>
      <div>{numberSeparator(accessory.price)} kr</div>
    </div>

    <div>
      <div dangerouslySetInnerHTML={{ __html: marked(accessory.description) }} />
    </div>
    {accessory.articleNumber && (
      <div>
        <div>{accessory.articleNumber}</div>
      </div>
    )}
  </div>
);

export default AccesoryModal;
