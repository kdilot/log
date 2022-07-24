import React, { useContext } from "react";
import { Button } from "./components";
import { CounterContext } from "./utils/context";
import styled from "styled-components";

const Sample: React.FC = () => {
  const { sharedCount, onSharedIncrease, onSharedDecrease } =
    useContext(CounterContext);
  return (
    <Wrapper>
      Shard Count : {sharedCount}
      <div>
        <Button onClick={onSharedDecrease} size="small">
          decrease
        </Button>
        <Button onClick={onSharedIncrease} size="small">
          increase
        </Button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  button ~ button {
    margin-left: 8px;
  }
`;

export default Sample;
