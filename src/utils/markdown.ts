import DOMPurify from 'dompurify';
import { Marked } from 'marked';

/**
 * Dealer texts (descriptions, packages, accessories, leasing and insurance) are
 * markdown with raw HTML in it, shown on the dealer's own site. marked passes raw
 * HTML through, so every string that becomes HTML goes through sanitizeHtml.
 * Allowlist and marked options follow web-ui-v2's src/utils/markdown.ts (security
 * audit F03), so a text renders as on wayke.se.
 */

const escapeAttribute = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// A single newline is a <br>; bare urls, ~~text~~ and | tables | stay text, as on wayke.se.
const markdown = new Marked({ gfm: true, breaks: true });
markdown.use({
  tokenizer: {
    url: () => undefined,
    del: () => undefined,
    table: () => undefined,
  },
  renderer: {
    link(token) {
      const title = token.title ? ` title="${escapeAttribute(token.title)}"` : '';
      const text = this.parser.parseInline(token.tokens);
      return `<a href="${escapeAttribute(token.href)}"${title} rel="noopener noreferrer" target="_blank">${text}</a>`;
    },
  },
});

const ALLOWED_TAGS = [
  'p',
  'br',
  'hr',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'strong',
  'b',
  'em',
  'i',
  'u',
  's',
  'del',
  'sup',
  'sub',
  'a',
  'ul',
  'ol',
  'li',
  'blockquote',
  'code',
  'pre',
  'img',
  'table',
  'thead',
  'tbody',
  'tr',
  'th',
  'td',
];

const ALLOWED_ATTR = [
  'href',
  'title',
  'rel',
  'target',
  'src',
  'alt',
  'width',
  'height',
  'start',
  'colspan',
  'rowspan',
];

// http(s), mailto and tel, and protocol-relative or relative urls; no javascript: or data:.
const ALLOWED_URI_REGEXP = /^(?:(?:https?|mailto|tel):|[^a-z]|[a-z+.-]+(?:[^a-z+.\-:]|$))/i;

/** Only the allowlisted tags and attributes survive; event handlers and style never do. */
export const sanitizeHtml = (html: string): string =>
  // Without a DOM (server rendering) DOMPurify cannot sanitize, so nothing is rendered.
  DOMPurify.isSupported
    ? DOMPurify.sanitize(html, { ALLOWED_TAGS, ALLOWED_ATTR, ALLOWED_URI_REGEXP })
    : '';

export const markdownToHtml = (text: string | null | undefined): string =>
  sanitizeHtml(markdown.parse(text ?? '', { async: false }));
