import React from 'react';

import { H2, H3 } from '../../components/Heading';
import { ProductPageMainSection } from '../../components/ProductPage';
import { Scalars } from '../../@types/codegen/types';
import DocumentList from '../../components/DocumentList';
import { Repeat } from '../../components/Repeat';
import { useTranslation } from 'react-i18next';
import ExtendContent from '../../components/ExtendContent';

const SortOrder = {
  'tyre-label': 2,
  'content declaration': 1,
  other: 3,
};

type CategoryType = keyof typeof SortOrder;

interface DocumentCategory {
  category: string;
  sortOrder: number;
  documents: Scalars['FileDocument']['input'][];
}

interface DocumentsProps {
  documents: Scalars['FileDocument']['input'][];
}

const Documents = ({ documents }: DocumentsProps) => {
  const { t } = useTranslation();

  const Translation = {
    'tyre-label': t('item.documentTypes.tireEnergyDeclaration'),
    'content declaration': t('item.documentTypes.goodsDeclaration'),
    other: t('item.documentTypes.other'),
  };

  const categorised = documents
    .reduce((prev, curr) => {
      const index = prev.findIndex((x) => x.category === (curr.category || 'others'));
      if (index > -1) {
        prev[index].documents.push(curr);
      } else {
        const category = curr.category || 'others';
        prev.push({
          category,
          documents: [curr],
          sortOrder: SortOrder?.[category as CategoryType] ?? 99,
        });
      }

      return prev;
    }, [] as DocumentCategory[])
    .sort((a, b) => a.sortOrder - b.sortOrder);

  if (!documents.length) return null;

  const manyCategories = categorised.length > 1;

  return (
    <ProductPageMainSection>
      <Repeat>
        <H2 noMargin>{t('item.documents')}</H2>
      </Repeat>
      <Repeat>
        <ExtendContent actionTitle={t('common.showMore')}>
          {categorised.map((group) => (
            <Repeat key={group.category}>
              {manyCategories && (
                <H3>{Translation?.[group.category as CategoryType] || Translation.other}</H3>
              )}
              <DocumentList documents={group.documents} />
            </Repeat>
          ))}
        </ExtendContent>
      </Repeat>
    </ProductPageMainSection>
  );
};

export default Documents;
