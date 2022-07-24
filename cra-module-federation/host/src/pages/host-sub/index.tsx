import React from "react";
import { useNavigate } from "react-router-dom";

const Button = React.lazy(() => import("shared/Button"));

const HostSub: React.FC = () => {
  const navigate = useNavigate();

  const onNavigate = (to: string) => {
    navigate(to);
  };

  return (
    <div>
      <h1>Host Sub Page</h1>
      <Button variant="outlined" sx={{ m: 1 }} onClick={() => onNavigate("/")}>
        Host 페이지 이동
      </Button>
    </div>
  );
};

export default HostSub;
