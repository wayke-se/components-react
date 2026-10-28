import React from 'react';
import { useTranslation } from 'react-i18next';
import { ButtonContent, ButtonInlineBold } from '../../components/Button';
import { H2 } from '../../components/Heading';
import Map from '../../components/Map';
import OpeningHours from '../../components/OpeningHours';
import PhoneNumber from '../../components/PhoneNumber';
import { ProductPageContentLimit } from '../../components/ProductPage';
import { Repeat } from '../../components/Repeat';
import { TableColumn, TableColumnCell, TableColumnRow } from '../../components/TableColumn';
import { Ad } from '../../Gql/ad/types';
import { openingHours, position } from '../../Gql/ad/view';
import { formatPhonenumber } from '../../utils/phonenumbers';

interface BranchProps {
  branch: Ad['branch'];
  displayBranchName?: boolean;
}

const Branch = ({ branch, displayBranchName }: BranchProps) => {
  const { t } = useTranslation();
  const hours = openingHours(branch);
  const phone = branch.contactInformation?.telephone;

  return (
    <>
      <Repeat>
        <H2 noMargin>
          {displayBranchName
            ? `${t('item.thisCarsIsLocatedAt')} ${branch.displayName}`
            : branch.city
              ? t('item.thisCarIsAvailableAtOurBranch', { location: branch.city })
              : t('item.contact')}
        </H2>
      </Repeat>
      <Repeat>
        <Map position={position(branch)} />
      </Repeat>
      <Repeat>
        <ProductPageContentLimit>
          <Repeat>
            <TableColumn>
              {branch.street && branch.city && (
                <TableColumnRow>
                  <TableColumnCell>{t('common.address')}</TableColumnCell>
                  <TableColumnCell>
                    <ButtonInlineBold>
                      <ButtonContent>{`${branch.street}, ${branch.city}`}</ButtonContent>
                    </ButtonInlineBold>
                  </TableColumnCell>
                </TableColumnRow>
              )}
              {phone && <PhoneNumber phoneNumber={formatPhonenumber(phone)} />}
            </TableColumn>
          </Repeat>
          {hours && (
            <Repeat>
              <OpeningHours openingHours={hours} />
            </Repeat>
          )}
        </ProductPageContentLimit>
      </Repeat>
    </>
  );
};

export default Branch;
