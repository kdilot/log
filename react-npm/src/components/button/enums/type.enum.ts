import { ReactNode } from "react";

export interface ButtonProps {
  device?: "pc" | "mobile";
  style?: React.CSSProperties;
  id?: string;
  type?: string;
  buttonStyle?: "border" | "solid";
  buttonType?: "normal" | "primary" | "secondary" | "alternate";
  buttonSize?: buttonSizeOption;
  buttonShape?: "normal" | "rect" | "round";
  buttonLabel?: string;
  buttonColor?:
    | "gray"
    | "darkGray"
    | "grayBlue"
    | "grayRed"
    | "blue"
    | "blueBlue"
    | "whiteBlue"
    | "red";
  withIcon?: boolean;
  iconPosition?: "side" | "top" | "bottom";
  topIcon?: ReactNode;
  bottomIcon?: ReactNode;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  disabled?: boolean;
  onClick?: (e?: any) => void; // click function
}

export interface buttonSizeOption {
  width?: string;
  height?: string;
  fontSize?: string;
}
