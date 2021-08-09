import React from "react";

interface Props {
  style?: React.CSSProperties;
  color?: "blue" | "gray" | "black" | "white";
}

const IconArrowRight: React.FC<Props> = ({ style, color }) => {
  const COLORS = {
    blue: "#45AEEE",
    gray: "#CACACA",
    black: "#333A44",
    white: "#ffffff",
  };
  return (
    <svg
      style={{ marginBottom: "3px", ...style }}
      width="7"
      height="13"
      viewBox="0 0 7 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 0.886481L0.872046 0L7 6.5L0.872046 13L0 12.1135L5.31476 6.5L0 0.886481Z"
        fill={COLORS[color || "blue"]}
      />
    </svg>
  );
};

export default IconArrowRight;
