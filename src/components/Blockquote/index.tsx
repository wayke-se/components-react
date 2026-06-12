import React from 'react';
import Avatar from '../Avatar';
import { Author, AvatarWrapper, Date, Info, Name, Quote, Wrapper } from './wrapper';

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
