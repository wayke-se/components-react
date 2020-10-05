import React, { useState, useCallback, useEffect } from 'react';

import { Repeat } from '../../components/Repeat/index';
import Content from '../../components/Content/index';
import { ProductPageContentLimit } from '../../components/ProductPage/index';
import { H2 } from '../../components/Heading/index';
import { ButtonContent, ButtonInline, ButtonInlineBold } from '../../components/Button/index';
import { TableColumn, TableColumnRow, TableColumnCell } from '../../components/TableColumn/index';

import OpeningHours from '../../components/OpeningHours/index';
import PhoneNumber from '../../components/PhoneNumber/index';
import Map from '../../components/Map/index';

import { Branch, Maybe } from '../../@types/codegen/types';
import BranchModal from './BranchModal';
import { formatPhonenumber } from '../../utils/phonenumbers';

interface BranchProps {
  branch?: Maybe<Branch>;
  loading: boolean;
}

const Branch = ({ branch, loading }: BranchProps) => {
  const [modal, setModal] = useState(false);

  const openModal = useCallback(() => setModal(true), []);
  const closeModal = useCallback(() => setModal(false), []);

  useEffect(() => {
    if (branch && modal) {
      setModal(false);
    }
  }, [branch]);

  if (!branch) {
    return null;
  }

  return (
    <>
      {modal && (
        <BranchModal loading={loading} connections={branch?.connections} onClose={closeModal} />
      )}
      <Repeat>
        <H2 noMargin>
          {branch?.location?.city
            ? `Den här bilen finns på vår anläggning i ${branch?.location?.city}`
            : 'Kontakt'}
        </H2>
      </Repeat>
      <Repeat>
        <Map position={branch?.location?.position} />
      </Repeat>
      {(branch?.connections?.length || 0) > 1 && (
        <Repeat>
          <Content>
            <p>
              Denna bil tillhör ett centrallager och går att köpa genom flera anläggningar.{' '}
              <ButtonInline as="span" role="button" onClick={openModal} inline>
                Klicka här för att visa kontaktuppgifter till en annan anläggning
              </ButtonInline>
              .
            </p>
          </Content>
        </Repeat>
      )}
      <Repeat>
        <ProductPageContentLimit>
          <Repeat>
            <TableColumn>
              {branch?.location?.streetAddress && branch?.location?.city && (
                <TableColumnRow>
                  <TableColumnCell>Adress</TableColumnCell>
                  <TableColumnCell>
                    <ButtonInlineBold>
                      <ButtonContent>{`${branch?.location?.streetAddress}, ${branch?.location?.city}`}</ButtonContent>
                    </ButtonInlineBold>
                  </TableColumnCell>
                </TableColumnRow>
              )}
              {branch?.contact?.phonenumber && (
                <PhoneNumber phoneNumber={formatPhonenumber(branch.contact.phonenumber)} />
              )}
            </TableColumn>
          </Repeat>
          {branch?.openingHours && (
            <Repeat>
              <OpeningHours openingHours={branch.openingHours} />
            </Repeat>
          )}
        </ProductPageContentLimit>
      </Repeat>
    </>
  );
};

export default Branch;
