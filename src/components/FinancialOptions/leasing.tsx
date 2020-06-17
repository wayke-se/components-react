import React, { useState, useCallback } from 'react';

import OptionBox from '../OptionBox';
import { OptionBoxHeading, OptionBoxContent } from '../OptionBox/wrapper';
import { UtilityTextPrimary } from '../Utility';
import { ButtonInline } from '../Button';
import { SearchItem_vehicle_financialOptions } from '../../@types/gql/SearchItem';
import { numberSeparator } from '../../utils/formats';
import Modal from '../Modal';
import { Image } from '../Modal/wrapper';
import { List, Item, Label, Heading, Value } from '../DataGrid/wrapper';
import Content from '../Content';
import Repeat from '../Repeat';

interface LeasingProps {
  financialOption: SearchItem_vehicle_financialOptions;
}

const Leasing = ({ financialOption }: LeasingProps) => {
  const [modal, setModal] = useState(false);
  const toggleModal = useCallback(() => setModal(!modal), [modal]);

  const { image, description, monthlyCost, duration, mileage } = financialOption;

  return (
    <>
      {modal && (
        <Modal title="Privatleasing" onClose={toggleModal}>
          {image && <Image src={image} alt="" />}
          {description && (
            <Repeat>
              <Content>
                <div dangerouslySetInnerHTML={{ __html: description }} />
              </Content>
            </Repeat>
          )}
          <Repeat>
            <List>
              <Item>
                <Label>
                  <Heading>Månadskostnad</Heading>
                </Label>
                <Value>{monthlyCost} kr/mån</Value>
              </Item>
              <Item>
                <Label>
                  <Heading>Bindningstid</Heading>
                </Label>
                <Value>{duration?.current} månader</Value>
              </Item>
              <Item>
                <Label>
                  <Heading>Årlig körsträcka</Heading>
                </Label>
                <Value>{mileage?.current} mil/år</Value>
              </Item>
            </List>
          </Repeat>
        </Modal>
      )}
      <OptionBox>
        <>
          {monthlyCost !== null && (
            <OptionBoxHeading>{`ca ${numberSeparator(monthlyCost)} kr/mån`}</OptionBoxHeading>
          )}
        </>
        <OptionBoxContent>
          <p>
            Privatleasing{' '}
            {mileage?.current && duration?.current && (
              <>
                <UtilityTextPrimary>{numberSeparator(mileage?.current)} mil/år</UtilityTextPrimary>{' '}
                i <UtilityTextPrimary>{duration?.current} mån</UtilityTextPrimary>.{' '}
              </>
            )}
          </p>
          <p>
            <ButtonInline onClick={toggleModal}>Läs mer</ButtonInline>
          </p>
        </OptionBoxContent>
      </OptionBox>
    </>
  );
};

export default Leasing;
