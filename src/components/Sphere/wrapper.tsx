import styled from 'styled-components';

import { size } from '../../layout/helpers';

const compassSize = size(4);
const controlBtnSize = size(4);

export const Wrapper = styled.div`
  width: 100%;
  height: 0 !important;
  padding-bottom: 66.666% !important; // 3:2

  .pnlm-container {
    background-image: none;
    background-color: ${(props) => props.theme.color.accentDark};
  }

  // Compass

  .pnlm-compass {
    width: ${compassSize};
    height: ${compassSize};
    border-radius: 50%;
    bottom: ${size(2)};
    left: ${size(2)};
    right: auto;
    margin-top: 0;
    border: 5px solid transparent;
    border-top-color: ${(props) => props.theme.color.textLight};
    background-color: rgba(255, 255, 255, 0.4);
    background-image: none;
    backdrop-filter: blur(5px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    box-sizing: border-box;

    &:hover {
      background-color: red;
    }
  }

  // Controls (zoom & fullscreen button)

  .pnlm-grab,
  .pnlm-grabbing {
    .pnlm-controls-container {
      display: block;
    }
  }

  .pnlm-controls-container {
    display: none;
    top: ${size(2)};
    left: ${size(2)};
  }

  .pnlm-controls {
    margin-top: 0;

    & + .pnlm-controls {
      margin-top: ${size(1)};
    }
  }

  // Fullscreen button

  .pnlm-fullscreen-toggle-button {
    display: none;
    position: relative;
    width: ${controlBtnSize};
    height: ${controlBtnSize};
    background-image: none;
    background-color: rgba(255, 255, 255, 0.4);
    backdrop-filter: blur(5px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    color: ${(props) => props.theme.color.textDark};
    border: 0;
    border-radius: 50%;

    &:hover {
      background-color: rgba(255, 255, 255, 0.6);
    }

    &:before {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 0.875rem;
    }
  }

  .pnlm-fullscreen-toggle-button-inactive {
    &:before {
      content: '⤢';
    }

    &.pnlm-fullscreen-toggle-button-active {
      &:before {
        content: '⤢';
      }
    }
  }

  // Gyroscope (Orientation)

  .pnlm-orientation-button {
    background-image: none;
    width: ${controlBtnSize};
    height: ${controlBtnSize};
    background-color: ${(props) => props.theme.color.accentDark};
    color: ${(props) => props.theme.color.textDark};
    border: 0;
    border-radius: 999px;

    &:hover {
      background-color: red;
    }

    &:before {
      content: 'A';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 0.875rem;
    }

    &.pnlm-orientation-button-active {
      background-color: green;

      &:hover {
        background-color: pink;
      }
    }
  }

  // Zoom controls

  .pnlm-zoom-controls {
    display: none;
    height: auto;
    width: auto;
    background-color: transparent;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    border: 0;
    border-radius: 999px;

    > * {
      &:first-child {
        border-top-left-radius: 999px;
        border-top-right-radius: 999px;
      }

      &:last-child {
        border-bottom-left-radius: 999px;
        border-bottom-right-radius: 999px;
      }
    }
  }

  .pnlm-zoom-in,
  .pnlm-zoom-out {
    position: relative;
    display: block;
    width: ${controlBtnSize};
    height: ${controlBtnSize};
    background-image: none;
    background-color: rgba(255, 255, 255, 0.4);
    backdrop-filter: blur(5px);
    color: ${(props) => props.theme.color.textDark};
    border-radius: 0;

    &:before {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    &:hover {
      background-color: rgba(255, 255, 255, 0.6);
    }
  }

  .pnlm-zoom-in {
    top: auto;

    &:before {
      content: '+';
    }
  }

  .pnlm-zoom-out {
    bottom: auto;
    border-top: 1px solid ${(props) => props.theme.color.textDark};

    &:before {
      content: '-';
    }
  }

  // Load Button

  .pnlm-load-button {
    top: auto;
    bottom: ${size(2)};
    transform: translateX(-50%);
    width: auto;
    height: auto;
    padding: ${size(1.75)} ${size(2)};
    border-radius: 3px;
    margin: 0;
    background-color: ${(props) => props.theme.color.accentDark};
    color: ${(props) => props.theme.color.textDark};
    line-height: 1.1;
    user-select: none;

    &:hover {
      background-color: ${(props) => props.theme.color.accentDark};
    }

    p {
      margin: 0;
      font-size: 0.875rem;
    }
  }

  // Load box

  .pnlm-load-box {
    background-color: transparent;
    height: auto;
    margin: 0;
    width: 150px;
    transform: translate(-50%, -50%);

    > p {
      display: none;
    }
  }

  // Load bar

  .pnlm-lbar {
    width: 100%;
    background-color: rgba(255, 255, 255, 0.4);
    border: 0;
  }

  .pnlm-lbar-fill {
    background-color: ${(props) => props.theme.color.textLight};
  }
`;
