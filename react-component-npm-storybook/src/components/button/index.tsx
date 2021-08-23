import React, { useCallback } from "react";
import IconArrowRight from "@icons/IconArrowRight";
import { ButtonProps } from "./enums/type.enum";
import {
  ButtonContentWrapper,
  ButtonInput,
  ButtonTextWrapper,
  ButtonWrapper,
  IconWrapper,
} from "./styles/style";

const Button: React.FC<ButtonProps> = ({
  device = "pc",
  style,
  id,
  type,
  buttonStyle,
  buttonType,
  buttonSize,
  buttonShape,
  buttonLabel,
  buttonColor,
  withIcon,
  iconPosition,
  topIcon,
  bottomIcon,
  leftIcon,
  rightIcon,
  disabled,
  onClick,
  ...rest
}) => {
  const _onClick = useCallback(
    (e) => {
      if (type !== "submit") e.preventDefault();
      if (!onClick) return;
      onClick();
    },
    [onClick]
  );

  return (
    <ButtonWrapper {...rest} disabled={disabled}>
      <ButtonInput
        style={style}
        id={id}
        type={type}
        disabled={disabled}
        buttonStyle={buttonStyle}
        buttonType={buttonType}
        buttonSize={buttonSize}
        buttonShape={buttonShape}
        buttonColor={buttonColor}
        isMobile={device === "mobile"}
        onClick={_onClick}
      >
        <ButtonContentWrapper position={iconPosition}>
          {withIcon &&
            iconPosition &&
            (topIcon && iconPosition === "top" ? (
              <IconWrapper position="top">{topIcon}</IconWrapper>
            ) : leftIcon && iconPosition === "side" ? (
              <IconWrapper position="left">{leftIcon}</IconWrapper>
            ) : null)}
          <ButtonTextWrapper>{buttonLabel}</ButtonTextWrapper>
          {withIcon &&
            iconPosition &&
            (rightIcon && iconPosition === "side" ? (
              // <IconWrapper position="right">{rightIcon}</IconWrapper>
              <IconWrapper position="right">{<IconArrowRight />}</IconWrapper>
            ) : bottomIcon && iconPosition === "bottom" ? (
              <IconWrapper position="bottom">{bottomIcon}</IconWrapper>
            ) : null)}
        </ButtonContentWrapper>
      </ButtonInput>
    </ButtonWrapper>
  );
};

Button.defaultProps = {
  device: "pc",
  type: "button",
  buttonStyle: "border",
  buttonType: "normal",
  buttonShape: "normal",
  buttonLabel: "버튼",
  buttonColor: "gray",
  withIcon: false,
  iconPosition: "side",
  disabled: false,
};

export default Button;
