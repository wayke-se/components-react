import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { AdDocument } from '../../Gql/ad/types';
import {
  List,
  PdfColumn,
  PdfLink,
  PdfListInner,
  PdfListItem,
  PdfSubtitle,
  PdfTitle,
} from './wrapper';

interface PdfDownloadItemProps {
  document: AdDocument;
}

const translateContentType = (document: AdDocument) => {
  switch (document.contentType) {
    case 'application/pdf':
      return 'PDF';
    default: {
      const formattedContentType =
        document.uri && document.uri.includes('.') ? document.uri.split('.').pop() : '';
      return formattedContentType;
    }
  }
};

export const PdfDownloadItem = ({ document }: PdfDownloadItemProps) => {
  const { t } = useTranslation();
  const contentType = useMemo(() => translateContentType(document), [document]);
  return (
    <PdfListItem>
      <PdfListInner>
        <PdfColumn>
          <PdfTitle>{document.name}</PdfTitle>
          <PdfSubtitle>{contentType}</PdfSubtitle>
        </PdfColumn>
        <PdfColumn>
          <PdfLink
            href={document.uri}
            rel="noopener noreferrer nofollow"
            target="_blank"
            title={t('other.openDocument', { document: document.name })}
          >
            {t('common.open')}
          </PdfLink>
        </PdfColumn>
      </PdfListInner>
    </PdfListItem>
  );
};

interface IDocumentList {
  documents: AdDocument[];
}

export const DocumentList = ({ documents }: IDocumentList) => (
  <List>
    {documents.map((document, i) => (
      <PdfDownloadItem key={`${document.uri}-${i}`} document={document} />
    ))}
  </List>
);

export default DocumentList;
