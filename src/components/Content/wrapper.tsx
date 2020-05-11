import styled from 'styled-components';

import { size } from '../../layout/helpers';

export const Wrapper = styled.div`
  font-size: 1rem;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-top: ${size(4)};
    margin-bottom: ${size(1)};

    :first-child {
      margin-top: 0;
    }

    :last-child {
      margin-bottom: 0;
    }

    & + p,
    & + table {
      margin-top: ${size(1)};
    }
  }

  p {
    margin: ${size(2)} 0;

    :first-child {
      margin-top: 0;
    }

    :last-child {
      margin-bottom: 0;
    }
  }
`;
