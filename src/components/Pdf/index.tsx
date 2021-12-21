import React from 'react';

import { Scalars } from '../../@types/codegen/types';
import {
  PdfListItem,
  PdfSubtitle,
  PdfTitle,
  PdfContainer,
  PdfListInner,
  PdfLink,
  PdfColumn,
} from './wrapper';

interface PdfDownloadItemProps {
  document: Scalars['FileDocument'];
}

export const PdfDownloadItem = ({ document }: PdfDownloadItemProps) => (
  <PdfListItem>
    <PdfListInner>
      <PdfColumn>
        <PdfTitle>{document.name}</PdfTitle>
        <PdfSubtitle>{document.contentType}</PdfSubtitle>
      </PdfColumn>
      <PdfColumn>
        <PdfLink href={document.url} rel="noopener noreferrer nofollow" target="_blank">
          Öppna
        </PdfLink>
      </PdfColumn>
    </PdfListInner>
  </PdfListItem>
);

interface PdfDownloadContainerProps {
  documents: Scalars['FileDocument'][];
}

export const PdfDownloadContainer = ({ documents }: PdfDownloadContainerProps) => (
  <PdfContainer>
    {documents.map((document, i) => (
      <PdfDownloadItem key={`${document.url}-${i}`} document={document} />
    ))}
  </PdfContainer>
);

export default PdfDownloadContainer;
