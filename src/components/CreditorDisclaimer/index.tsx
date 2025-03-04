import React from 'react';
import { Link } from '../Link';
import { Body, Heading, Icon, Wrapper } from './wrapper';

export const CreditorDisclaimer = () => (
  // biome-ignore lint/a11y/useSemanticElements: Output element is not suitable for this use case
  <Wrapper role="status" aria-live="polite">
    <Icon aria-hidden="true">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="59"
        height="53"
        viewBox="0 0 59 53"
        fill="none"
      >
        <title>Varning</title>
        <path
          d="M29.5255 20.3569V30.5712M29.5255 40.7855H29.551M54.3173 43.3391L33.9335 7.58906C33.4891 6.80308 32.8445 6.14932 32.0657 5.69448C31.2868 5.23964 30.4015 5 29.5001 5C28.5986 5 27.7133 5.23964 26.9344 5.69448C26.1556 6.14932 25.5111 6.80308 25.0666 7.58906L4.68285 43.3391C4.23359 44.1188 3.99802 45.0038 4.00001 45.9042C4.002 46.8046 4.24148 47.6884 4.69417 48.4662C5.14687 49.244 5.79668 49.8879 6.57776 50.3329C7.35883 50.7778 8.2434 51.0079 9.14179 50.9998H49.9093C50.8034 50.9989 51.6815 50.7622 52.4554 50.3136C53.2294 49.865 53.8719 49.2202 54.3186 48.444C54.7652 47.6677 55.0002 46.7874 55 45.8913C54.9998 44.9953 54.7643 44.1151 54.3173 43.3391Z"
          stroke="#A43333"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Icon>
    <Body>
      <Heading>Att låna kostar pengar!</Heading>
      <p>
        Om du inte kan betala tillbaka skulden i tid riskerar du en betalningsanmärkning. Det kan
        leda till svårigheter att få hyra bostad, teckna abonnemang och få nya lån. För stöd, vänd
        dig till budget- och skuldrådgivningen i din kommun. Kontaktuppgifter finns på{' '}
        <Link
          href="https://www.konsumentverket.se/"
          title="Konsumentverket"
          target="_blank"
          rel="noopener noreferrer nofollow"
        >
          konsumentverket.se
        </Link>
        .
      </p>
    </Body>
  </Wrapper>
);
