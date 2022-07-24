import React, { useContext } from "react";
import { useCounter } from "shared/Hooks";
import { CounterContext } from "shared/Context";

const Button = React.lazy(() => import("shared/Button"));

const Remote: React.FC = () => {
  const { count, onIncrease, onDecrease } = useCounter();
  const { sharedCount, onSharedIncrease, onSharedDecrease } =
    useContext(CounterContext);

  return (
    <div>
      <h1>Remote Page</h1>
      Remote Count : <b>{count}</b>
      <div>
        <Button sx={{ m: 1 }} onClick={onDecrease} size="small">
          Decrease
        </Button>
        <Button sx={{ m: 1 }} onClick={onIncrease} size="small">
          Increase
        </Button>
      </div>
      Remote Shared Count : <b>{sharedCount}</b>
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

export default Remote;
