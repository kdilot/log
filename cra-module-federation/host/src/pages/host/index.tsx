import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useCounter } from "shared/Hooks";
import { CounterContext } from "shared/Context";

const Button = React.lazy(() => import("shared/Button"));

const Host: React.FC = () => {
  const { count, onIncrease, onDecrease } = useCounter();
  const { sharedCount, onSharedIncrease, onSharedDecrease } =
    useContext(CounterContext);

  const navigate = useNavigate();

  const onNavigate = (to: string) => {
    navigate(to);
  };
  return (
    <div>
      <h1>Host Page</h1>
      <Button
        variant="outlined"
        sx={{ m: 1 }}
        onClick={() => onNavigate("/sub")}
      >
        Host Sub 페이지 이동
      </Button>
      <div>
        Host Count : <b>{count}</b>
        <div>
          <Button sx={{ m: 1 }} onClick={onDecrease} size="small">
            Decrease
          </Button>
          <Button sx={{ m: 1 }} onClick={onIncrease} size="small">
            Increase
          </Button>
        </div>
      </div>
      Host Shared Count : <b>{sharedCount}</b>
      <div>
        <Button sx={{ m: 1 }} onClick={onSharedDecrease} size="small">
          Decrease
        </Button>
        <Button sx={{ m: 1 }} onClick={onSharedIncrease} size="small">
          Increase
        </Button>
      </div>
    </div>
  );
};

export default Host;
