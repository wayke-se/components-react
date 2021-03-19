import React from 'react';
import { Wrapper } from './wrapper';
import styled from 'styled-components';

type PropsType = {
    url?: string;
    modal?: boolean;
    controls?: boolean;
    ratio?: string;
  };

const Video = styled.video`
    position: absolute;
    top: 0;
    left: 0;
    object-fit: ${({ modal }) => modal ? 'contain' : 'cover'};
`;

const CustomPlayer = ({ url, controls, modal, ratio = '56.25%' }: PropsType) => {
    return (
        <Wrapper ratio={ratio}>
            <Video modal={modal} controls={controls} width="100%" height="100%" src={url} />
        </Wrapper>
    );
};
export default CustomPlayer;
