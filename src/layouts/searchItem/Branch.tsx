import React, { useState, useCallback, useContext, useEffect } from 'react';
import Repeat from '../../components/Repeat/index';

import Snackbar from '../../components/Snackbar/index';
import { ProductPageContentLimit } from '../../components/ProductPage/index';
import { H2 } from '../../components/Heading/index';
import { ButtonContent, ButtonInline, ButtonInlineBold } from '../../components/Button/index';
import { TableColumn, TableColumnRow, TableColumnCell } from '../../components/TableColumn/index';

import OpeningHours from '../../components/OpeningHours/index';
import PhoneNumber from '../../components/PhoneNumber/index';
import Map from '../../components/Map/index';

import { Branch, Maybe } from '../../@types/codegen/types';
import BranchModal from './BranchModal';
import { CentralStorageContext } from '../../context/central-storage-context';

interface BranchProps {
  branch?: Maybe<Branch>;
  loading: boolean;
}

const Branch = ({ branch, loading }: BranchProps) => {
  const { centralStorageId, setCentralStorageId } = useContext(CentralStorageContext);

  const [modal, setModal] = useState(false);

  const openModal = useCallback(() => setModal(true), []);
  const closeModal = useCallback(() => setModal(false), []);

  useEffect(() => {
    if (branch && modal) {
      setModal(false);
    }
  }, [branch]);

  const onConfirm = useCallback((id: string) => {
    if (id) {
      setCentralStorageId(id);
    }
  }, []);

  if (!branch) {
    return null;
  }

  return (
    <>
      {modal && centralStorageId && (
        <BranchModal
          loading={loading}
          value={centralStorageId}
          connections={branch?.connections}
          onConfirm={onConfirm}
          onClose={closeModal}
        />
      )}
      <Repeat>
        <H2 noMargin>
          {branch?.location?.city
            ? `Den här bilen finns på vår anläggning i ${branch?.location?.city}`
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
        <Map position={branch?.location?.position} />
      </Repeat>
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
                <PhoneNumber phoneNumber={branch.contact.phonenumber} />
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
