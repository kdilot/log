import React, { createContext, useState } from "react";

const CounterContext = createContext({
  sharedCount: 0,
  onSharedIncrease: () => {},
  onSharedDecrease: () => {},
});

interface ICounterProvider {
  children: React.ReactNode;
}

const CounterProvider: React.FC<ICounterProvider> = ({ children }) => {
  const [sharedCount, setSharedCount] = useState(0);

  const onSharedIncrease = () => {
    console.log(12312312);
    setSharedCount((sharedCount) => sharedCount + 1);
  };

  const onSharedDecrease = () => {
    if (sharedCount > 0) {
      setSharedCount((sharedCount) => sharedCount - 1);
    }
  };

  return (
    <CounterContext.Provider
      value={{ sharedCount, onSharedIncrease, onSharedDecrease }}
    >
      {children}
    </CounterContext.Provider>
  );
};

export { CounterProvider, CounterContext };
