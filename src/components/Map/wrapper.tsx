import styled from 'styled-components';

export const Wrapper = styled.a`
  display: block;
`;

export const Image = styled.img`
  display: block;
  width: 100%;
  border-radius: 3px;
`;

export const Placeholder = styled.a`
  display: block;
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 43.75%; // Proportions of Google Static Map (640x280)
  background-image: linear-gradient(-15deg, #dfe4ce, #c1d6ea, #dfe4ce);
  border-radius: 3px;
  color: ${(props) => props.theme.color.textDark};
`;

export const PlaceholderAction = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
