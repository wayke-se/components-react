import React from 'react';
import { markdownToHtml, sanitizeHtml } from '../../utils/markdown';
import { Wrapper } from './wrapper';

type Props = {
  small?: boolean;
  children?: React.ReactNode;
  /** Dealer markdown, rendered and sanitized. */
  markdown?: string | null;
  /** Dealer HTML, sanitized. */
  html?: string | null;
};

const Content = ({ children, small, markdown, html }: Props) => {
  if (markdown != null || html != null) {
    const __html = markdown != null ? markdownToHtml(markdown) : sanitizeHtml(html ?? '');
    return <Wrapper small={small} dangerouslySetInnerHTML={{ __html }} />;
  }
  return <Wrapper small={small}>{children}</Wrapper>;
};

export default Content;
