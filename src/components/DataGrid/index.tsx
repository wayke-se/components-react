import React, { useState, useCallback } from 'react';

import { List, Item, Label, Heading, Info, Value } from './wrapper';
import { IconInfo } from '../Icon';
import { ItemPropertyType, ItemPropertModalType } from '../../utils/specification';
import Modal from '../Modal';
import { Content } from '../ProductCard/wrapper';

export interface Props {
  specificationList: ItemPropertyType[];
}

const DataGrid = ({ specificationList }: Props) => {
  const [modal, setModal] = useState<ItemPropertModalType>();

  const onOpen = useCallback((nextModal) => setModal(nextModal), []);
  const onClose = useCallback(() => setModal(undefined), []);

  if (!specificationList?.length) {
    return null;
  }

  return (
    <>
      {modal && (
        <Modal title={modal.title} onClose={onClose}>
          <Content>
            <p>{modal.text}</p>
          </Content>
        </Modal>
      )}
      <List>
        {specificationList.map((item) => (
          <Item key={item.label}>
            <Label>
              <Heading>{item.label}</Heading>
              {item.modal && (
                <Info onClick={() => onOpen(item.modal)} title="Mer info">
                  <IconInfo block />
                </Info>
              )}
            </Label>
            <Value>{item.value}</Value>
          </Item>
        ))}
      </List>
    </>
  );
};

export default DataGrid;
