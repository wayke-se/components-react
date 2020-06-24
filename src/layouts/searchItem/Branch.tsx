import React, { useState, useCallback, useMemo } from 'react';
import Repeat from '../../components/Repeat/index';

import Snackbar from '../../components/Snackbar/index';
import { ProductPageContentLimit } from '../../components/ProductPage/index';
import { H2 } from '../../components/Heading/index';
import { ButtonContent, ButtonInline, ButtonInlineBold } from '../../components/Button/index';
import { TableColumn, TableColumnRow, TableColumnCell } from '../../components/TableColumn/index';

import OpeningHours from '../../components/OpeningHours/index';
import PhoneNumber from '../../components/PhoneNumber/index';
import Map from '../../components/Map/index';
import Modal from '../../components/Modal/index';
import Content from '../../components/Content/index';

import { Branch, Maybe } from '../../@types/codegen/types';
import useSessionStorage from '../../hooks/useSessionStorage';
import useBranch from '../../hooks/useBranch';

interface BranchProps {
  branch?: Maybe<Branch>;
}

const Branch = ({ branch }: BranchProps) => {
  const { value, set } = useSessionStorage('centralStorage');
  const { data } = useBranch(value);
  const [modal, setModal] = useState(false);

  const toggleModal = useCallback(() => setModal(!modal), [modal]);

  const selectedBranch = useMemo(() => {
    const connections = branch?.connections;
    if ((connections?.length || 0) > 1) {
      const connected = connections?.find((x) => x.id === value);
      return connected?.id === branch?.id ? branch : data?.branch;
    } else if ((connections?.length || 0) === 1) {
      const connected = branch?.connections?.[0];
      return connected?.id === branch?.id ? branch : data?.branch;
    }
    return branch;
  }, [value, branch, data]);

  if (!selectedBranch) {
    return null;
  }

  return (
    <>
      {modal && (
        <Modal title="Centrallager" onClose={toggleModal}>
          <Content>
            <p>Välj branch</p>
            {branch?.connections.map((b, index) => (
              <li key={b.name || index} onClick={() => set(b.id)}>
                {b.name} {value === b.id ? 'Vald' : ''}
              </li>
            ))}
          </Content>
        </Modal>
      )}
      <Repeat>
        <H2 noMargin>
          {selectedBranch?.location?.city
            ? `Den här bilen finns på vår anläggning i ${selectedBranch?.location?.city}`
            : 'Kontakt'}
        </H2>
      </Repeat>
      {(branch?.connections?.length || 0) > 1 && (
        <Repeat>
          <Snackbar heading="Centrallager" severity="warning" icon>
            Denna bil tillhör ett centrallager och går att köpa genom flera anläggningar.{' '}
            <ButtonInline onClick={toggleModal}>
              Klicka här för att visa kontaktuppgifter till en annan anläggning
            </ButtonInline>
            .
          </Snackbar>
        </Repeat>
      )}
      <Repeat>
        <Map position={selectedBranch?.location?.position} />
      </Repeat>
      <Repeat>
        <ProductPageContentLimit>
          <Repeat>
            <TableColumn>
              {selectedBranch?.location?.streetAddress && selectedBranch?.location?.city && (
                <TableColumnRow>
                  <TableColumnCell>Adress</TableColumnCell>
                  <TableColumnCell>
                    <ButtonInlineBold>
                      <ButtonContent>{`${selectedBranch?.location?.streetAddress}, ${selectedBranch?.location?.city}`}</ButtonContent>
                    </ButtonInlineBold>
                  </TableColumnCell>
                </TableColumnRow>
              )}
              {selectedBranch?.contact?.phonenumber && (
                <PhoneNumber phoneNumber={selectedBranch.contact.phonenumber} />
              )}
            </TableColumn>
          </Repeat>
          {selectedBranch?.openingHours && (
            <Repeat>
              <OpeningHours openingHours={selectedBranch.openingHours} />
            </Repeat>
          )}
        </ProductPageContentLimit>
      </Repeat>
    </>
  );
};

export default Branch;
