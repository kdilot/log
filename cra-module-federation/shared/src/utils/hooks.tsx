import { useState } from "react";

export const useCounter = () => {
  const [count, setCount] = useState(0);

  const onIncrease = () => {
    setCount((count) => count + 1);
  };

  const onDecrease = () => {
    if (count > 0) {
      setCount((count) => count - 1);
    }
  };

  return {
    count,
    onIncrease,
    onDecrease,
  };
};
