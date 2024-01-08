import React from 'react';

import { Wrapper, Quote, Author, AvatarWrapper, Info, Name, Date } from './wrapper';
import Avatar from '../Avatar';

interface Props {
  children: React.ReactNode;
  author?: string | null;
  avatar?: string;
  date?: string;
}

const Blockquote = ({ children, author, avatar, date }: Props) => (
  <Wrapper>
    <Quote>{children}</Quote>
    {author && (
      <Author>
        {avatar && (
          <AvatarWrapper>
            <Avatar image={avatar} alt={`${author} avatar`} />
          </AvatarWrapper>
        )}
        <Info>
          <Name>{author}</Name>
          {date && <Date>{date}</Date>}
        </Info>
      </Author>
    )}
  </Wrapper>
);

export default Blockquote;
