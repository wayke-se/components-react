import React, { useState, useCallback, useMemo, useEffect } from 'react';
import Repeat from '../../components/Repeat/index';

import Snackbar from '../../components/Snackbar/index';
import { ProductPageContentLimit } from '../../components/ProductPage/index';
import { H2 } from '../../components/Heading/index';
import { ButtonContent, ButtonInline, ButtonInlineBold } from '../../components/Button/index';
import { TableColumn, TableColumnRow, TableColumnCell } from '../../components/TableColumn/index';

import OpeningHours from '../../components/OpeningHours/index';
import PhoneNumber from '../../components/PhoneNumber/index';
import Map from '../../components/Map/index';

import { Branch, Maybe, BranchConnection } from '../../@types/codegen/types';
import useSessionStorage from '../../hooks/useSessionStorage';
import useBranch from '../../hooks/useBranch';
import BranchModal from './BranchModal';

interface BranchProps {
  branch?: Maybe<Branch>;
}

const Branch = ({ branch }: BranchProps) => {
  const { value, set } = useSessionStorage('centralStorage');
  const { data, loading } = useBranch(value);
  const [modal, setModal] = useState(false);

  const openModal = useCallback(() => setModal(true), []);
  const closeModal = useCallback(() => setModal(false), []);

  const onConfirm = useCallback((id: string) => {
    if (id) {
      set(id);
    }
  }, []);

  useEffect(() => {
    if (data && modal) {
      closeModal();
    }
  }, [data]);

  const selectedBranch = useMemo(() => {
    const connections = branch?.connections;
    const connectionsLength = connections?.length || 0;
    if (connectionsLength > 0) {
      const connected =
        connectionsLength > 1 ? connections?.find((x) => x.id === value) : branch?.connections?.[0];
      if (!connected) {
        set((connections as BranchConnection[])[0].id);
      }
      return connected?.id === branch?.id ? branch : data?.branch;
    }
    return branch;
  }, [value, branch, data]);

  if (!selectedBranch) {
    return null;
  }

  return (
    <>
      {modal && value && (
        <BranchModal
          loading={loading}
          value={value}
          connections={branch?.connections}
          onConfirm={onConfirm}
          onClose={closeModal}
        />
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
            <ButtonInline onClick={openModal}>
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
