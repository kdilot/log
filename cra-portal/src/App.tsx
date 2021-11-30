import { useState } from "react";
import styled from "styled-components";
import "./App.css";
import { Modal, ModalProtal } from "./components";

function App() {
  const [isPortal, setIsPortal] = useState(false);
  const [isModal, setIsModal] = useState(false);
  return (
    <div className="App">
      <header className="App-header">
        <ButtonWrapper onClick={() => setIsModal(true)}>Modal</ButtonWrapper>
        <ButtonWrapper onClick={() => setIsPortal(true)}>
          Modal with portal
        </ButtonWrapper>
      </header>
      {isModal && (
        <Modal onClickOutside={() => setIsModal(false)}>
          <ModalContentsWrapper>Modal</ModalContentsWrapper>
        </Modal>
      )}
      {isPortal && (
        <ModalProtal onClickOutside={() => setIsPortal(false)}>
          <ModalContentsWrapper>Modal with portal</ModalContentsWrapper>
        </ModalProtal>
      )}
    </div>
  );
}

const ButtonWrapper = styled.div`
  width: 200px;
  height: 100px;
  border-radius: 2px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #fff;
  cursor: pointer;

  & ~ & {
    margin-top: 1rem;
  }
`;

const ModalContentsWrapper = styled.div`
  width: 300px;
  height: 300px;
  border-radius: 4px;
  background: #fff;
  color: #000;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
`;

export default App;
