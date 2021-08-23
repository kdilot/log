import styled, { css } from "styled-components";
import {
  getButtonColor,
  getPadding,
  getRadius,
  getSize,
} from "../helpers/button.helper";

export const ButtonWrapper = styled.div<any>`
  position: relative;
  display: inline-flex;
  user-select: none;

  ${({ disabled }) =>
    disabled &&
    css`
      pointer-events: none;
    `}
`;

export const ButtonInput = styled.button<any>`
  position: relative;
  display: inline-flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  ${({ isMobile }) =>
    isMobile &&
    css`
      max-width: 318px;
    `}

  // set width, height, line-height, font-size
  ${({ isMobile, buttonType, buttonSize }) =>
    css`
      ${getSize(isMobile, buttonType, buttonSize)}
    `}
    

  // set button border-radius
  border-radius: ${({ buttonShape }) => getRadius(buttonShape)};

  // init focus, hover, disabled
  &:focus,
  &:hover,
  &:disabled {
    outline: none;
    appearance: none;
  }

  &:hover > div > div > svg {
    opacity: 0.7;
  }

  // set button border, color, background-color and set button focus, hover and disabled style
  ${({ isMobile, theme, buttonStyle, buttonColor }) =>
    css`
      ${getButtonColor(isMobile, theme, buttonStyle, buttonColor)}
    `}
`;

export const ButtonContentWrapper = styled.div<any>`
  position: relative;
  display: inline-flex;
  margin: 0 25px;

  ${({ position }) => {
    switch (position) {
      case "top":
        return css`
          display: grid;
          grid-template-rows: 1fr 1fr;
          line-height: normal;
        `;
      case "bottom":
        return css`
          display: grid;
          grid-template-rows: 1fr 1fr;
          line-height: normal;
        `;
    }
  }};
`;

export const IconWrapper = styled.div<any>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  ${({ position }) => getPadding(position)}
`;

export const ButtonTextWrapper = styled.div<any>`
  display: flex;
  align-items: center;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal;
`;
