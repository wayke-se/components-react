import React, { useState, useCallback } from 'react';

import { List, Item, Label, Heading, HeadingAction, Value } from './wrapper';
import { ItemPropertyType, ItemPropertModalType } from '../../utils/specification';
import Modal from '../Modal/index';
import Content from '../Content/index';

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
          <Content dangerouslySetInnerHTML={{ __html: modal.text }} />
        </Modal>
      )}
      <List>
        {specificationList.map((item) => (
          <Item key={item.label}>
            <Label>
              {item.modal ? (
                <HeadingAction
                  onClick={() => onOpen(item.modal)}
                  title={`Mer information om ${item.label}`}
                >
                  {item.label}
                </HeadingAction>
              ) : (
                <Heading>{item.label}</Heading>
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
