import React, { useState, useCallback, useEffect } from 'react';

import { Repeat } from '../../components/Repeat';
import Content from '../../components/Content';
import { ProductPageContentLimit } from '../../components/ProductPage';
import { H2 } from '../../components/Heading';
import { ButtonContent, ButtonInline, ButtonInlineBold } from '../../components/Button';
import { TableColumn, TableColumnRow, TableColumnCell } from '../../components/TableColumn';

import OpeningHours from '../../components/OpeningHours';
import PhoneNumber from '../../components/PhoneNumber';
import Map from '../../components/Map';

import { Branch, Maybe } from '../../@types/codegen/types';
import BranchModal from './BranchModal';
import { formatPhonenumber } from '../../utils/phonenumbers';
import { useTranslation } from 'react-i18next';

interface BranchProps {
  branch?: Maybe<Branch>;
  loading: boolean;
  displayBranchName?: boolean;
}

const Branch = ({ branch, loading, displayBranchName }: BranchProps) => {
  const { t } = useTranslation();
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
          {displayBranchName
            ? `${t('item.thisCarsIsLocatedAt')} ${branch.name}`
            : branch?.location?.city
            ? t('item.thisCarIsAvailableAtOurBranch', { location: branch?.location?.city })
            : t('item.contact')}
        </H2>
      </Repeat>
      <Repeat>
        <Map position={branch?.location?.position} />
      </Repeat>
      {(branch?.connections?.length || 0) > 1 && (
        <Repeat>
          <Content>
            <p>
              {t('item.centralWarehouseCarDescriptionShort')}{' '}
              <ButtonInline
                as="span"
                role="button"
                onClick={openModal}
                inline
                title={t('item.clickHereToShowContactToAnotherBranch') || ''}
              >
                {t('item.clickHereToShowContactToAnotherBranch')}
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
                  <TableColumnCell>{t('common.address')}</TableColumnCell>
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
