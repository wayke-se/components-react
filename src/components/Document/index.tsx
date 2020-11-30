import React from 'react';

import { List, Item, Doc, Icon, Info, Title, SubTitle, Action } from './wrapper';
import { ButtonContent, ButtonInlineBold } from '../Button/index';
import {
  IconDocumentDoc,
  IconDocumentPdf,
  IconDocumentUnknown,
  IconDocumentXls,
} from '../Icon/index';

interface DocumentProps {
  title: string;
  format: string;
  url: string;
}

interface Props {
  documents: DocumentProps[];
}

const Document = ({ documents }: Props) => (
  <List>
    {documents.map((document, index) => (
      <Item key={`${document.title}-${index}`}>
        <Doc>
          <Icon>
            {document.format.toLowerCase() === 'doc' ? (
              <IconDocumentDoc block />
            ) : document.format.toLowerCase() === 'pdf' ? (
              <IconDocumentPdf block />
            ) : document.format.toLowerCase() === 'xls' ? (
              <IconDocumentXls block />
            ) : (
              <IconDocumentUnknown block />
            )}
          </Icon>
          <Info>
            <Title>{document.title}</Title>
            <SubTitle>{document.format.toUpperCase()}</SubTitle>
          </Info>
          <Action>
            <ButtonInlineBold
              as="a"
              href={document.url}
              target="_blank"
              rel="noopener"
              title={`Öppna ${document.title}`}
            >
              <ButtonContent>Öppna</ButtonContent>
            </ButtonInlineBold>
          </Action>
        </Doc>
      </Item>
    ))}
  </List>
);

export default Document;
