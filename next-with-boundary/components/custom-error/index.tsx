import React from "react";

const CustomError: React.FC = ({ error }: any) => {
  return <div style={{ color: "red" }}>ERROR {error.response.status}</div>;
};

export default CustomError;
