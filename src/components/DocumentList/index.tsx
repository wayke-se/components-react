import React, { useMemo } from 'react';

import { Scalars } from '../../@types/codegen/types';
import {
  PdfListItem,
  PdfSubtitle,
  PdfTitle,
  List,
  PdfListInner,
  PdfLink,
  PdfColumn,
} from './wrapper';

interface PdfDownloadItemProps {
  document: Scalars['FileDocument'];
}

const translateContentType = (document: Scalars['FileDocument']) => {
  switch (document.contentType) {
    case 'application/pdf':
      return 'PDF';
    default:
      const formattedContentType =
        document.url && document.url.includes('.') ? document.url.split('.').pop() : '';
      return formattedContentType;
  }
};

export const PdfDownloadItem = ({ document }: PdfDownloadItemProps) => {
  const contentType = useMemo(() => translateContentType(document), [document]);
  return (
    <PdfListItem>
      <PdfListInner>
        <PdfColumn>
          <PdfTitle>{document.name}</PdfTitle>
          <PdfSubtitle>{contentType}</PdfSubtitle>
        </PdfColumn>
        <PdfColumn>
          <PdfLink href={document.url} rel="noopener noreferrer nofollow" target="_blank">
            Öppna
          </PdfLink>
        </PdfColumn>
      </PdfListInner>
    </PdfListItem>
  );
};

interface IDocumentList {
  documents: Scalars['FileDocument'][];
}

export const DocumentList = ({ documents }: IDocumentList) => (
  <List>
    {documents.map((document, i) => (
      <PdfDownloadItem key={`${document.url}-${i}`} document={document} />
    ))}
  </List>
);

export default DocumentList;
