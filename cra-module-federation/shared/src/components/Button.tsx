import React from "react";
import { Button, SxProps } from "@mui/material";

interface IButton {
  children?: any;
  sx?: SxProps;
  disabled?: boolean;
  variant?: "text" | "contained" | "outlined" | undefined;
  onClick: any;
  size?: "large" | "medium" | "small";
}

const SharedButton: React.FC<IButton> = ({
  children,
  sx,
  disabled = false,
  variant = "contained",
  onClick,
  size = "medium",
}) => {
  return (
    <Button
      variant={variant}
      disabled={disabled}
      sx={sx}
      onClick={onClick}
      size={size}
    >
      {children || "button"}
    </Button>
  );
};

export default SharedButton;
