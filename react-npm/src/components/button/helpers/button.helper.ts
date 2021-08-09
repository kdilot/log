import { borderSet, solidSet } from "@constants/button.color.constant";
import { convertHexColorToRGB } from "@helpers/global.helper";
import colorTheme from "@constants/color.constant";
// import { borderSet, solidSet } from '../constants/button.color.constant';

/*
 * buttonType  : normal primary secondary
 *  device |  type     | color |   width   |  height |  fontsize
 *  m/p    | normal    | color |    auto   |  54/44  |   16/16
 *  m/p    | primary   | -     |    325    |  60/60  |   16/16
 *  m/p    | secondary | -     |    325    |  78/78  |   20/20
 *  m/p    | alternate | -     | 325/auto  |  54/36  |   20/16
 */

export const getSize = (isMobile: boolean, type: string, style: any) => {
  let width = style && style.width ? style.width : null;
  let height = style && style.height ? style.height : null;
  let fontsize = style && style.fontSize ? style.fontSize : null;

  switch (type) {
    case "normal":
      if (!width) width = "auto";
      if (!height) height = isMobile ? "54px" : "44px";
      if (!fontsize) fontsize = "16px";
      break;
    case "primary":
      if (!width) width = "325px";
      if (!height) height = "60px";
      if (!fontsize) fontsize = "16px";
      break;
    case "secondary":
      if (!width) width = "325px";
      if (!height) height = "78px";
      if (!fontsize) fontsize = "20px";
      break;
    case "alternate":
      if (!width) width = isMobile ? "325px" : "auto";
      if (!height) height = isMobile ? "54px" : "36px";
      if (!fontsize) fontsize = isMobile ? "20px" : "16px";
      break;
  }

  return `
    width: ${width};
    height: ${height};
    font-size: ${fontsize};
  `;
};

export const getButtonColor = (isMobile, theme, buttonType, colorType) => {
  const isBorder = buttonType === "border";
  let COLORSET = isBorder ? borderSet[colorType] : solidSet[colorType];

  if (!COLORSET) COLORSET = borderSet["gray"];

  const BACKGROUND = COLORSET.background.split(" ");
  const BACKGROUNDCOLOR = convertHexColorToRGB(
    colorTheme[BACKGROUND[0]] ?? BACKGROUND[0],
    BACKGROUND[1]
  );
  const BORDER = COLORSET.border.split(" ");
  const BORDERCOLOR = convertHexColorToRGB(
    colorTheme[BORDER[0]] ?? BORDER[0],
    BORDER[1]
  );
  const FONT = COLORSET.font.split(" ");
  const FONTCOLOR = convertHexColorToRGB(
    colorTheme[FONT[0]] ?? FONT[0],
    FONT[1]
  );

  const FOCUS = COLORSET.focus.split(" ");
  const FOCUSCOLOR = convertHexColorToRGB(
    colorTheme[FOCUS[0]] ?? FOCUS[0],
    FOCUS[1]
  );
  const HOVER = COLORSET.hover.split(" ");
  const HOVERCOLOR = convertHexColorToRGB(
    colorTheme[HOVER[0]] ?? HOVER[0],
    HOVER[1]
  );
  const DISABLED = COLORSET.disable.split(" ");
  const DISABLEDCOLOR = convertHexColorToRGB(
    colorTheme[DISABLED[0]] ?? DISABLED[0],
    DISABLED[1]
  );

  const cssStyles = `
    background-color: ${BACKGROUNDCOLOR};
    color: ${FONTCOLOR};
    border: ${isBorder ? "1px solid" : "0px"} ${BORDERCOLOR};
    
    &:focus {
      ${
        isBorder
          ? `color: ${FOCUSCOLOR}; border-color: ${FOCUSCOLOR};`
          : `background-color: ${FOCUSCOLOR};`
      }
    }

    &:hover {
      ${
        isBorder
          ? `color: ${HOVERCOLOR}; border-color: ${HOVERCOLOR};`
          : `background-color: ${HOVERCOLOR};`
      }
    }
    
    &:disabled {
      ${
        isBorder
          ? `color: ${DISABLEDCOLOR}; border-color: ${DISABLEDCOLOR};`
          : `color: ${theme.white}; background-color: ${
              isMobile ? theme.lightGray : DISABLEDCOLOR
            };`
      }
    }
  `;

  return cssStyles;
};

export const getCheckButtonColor = (target, useIcon, isChecked) => {
  switch (target) {
    case "icon":
      if (useIcon) {
        return isChecked ? "lightBlue" : "lightGray";
      } else {
        return "white";
      }
    case "background":
      if (useIcon) {
        return "white";
      } else {
        return isChecked ? "lightBlue" : "lightGray";
      }
    default:
      return "white";
  }
};

export const getRadius = (shape) => {
  switch (shape) {
    case "rect":
      return "0px";
    case "round":
      return "25px";
    case "normal":
      return "4px";
    default:
      return "4px";
  }
};

export const getPadding = (position) => {
  switch (position) {
    case "right":
      return "padding-left: 10px;";
    case "left":
      return "padding-right: 7px;";
    case "top":
      return "padding: 14px 0 5px;";
    case "bottom":
      return "padding: 5px 0 14px;";
  }
};
