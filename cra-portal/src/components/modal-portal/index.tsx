import React from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";

interface Props {
  zIndex?: number;
  style?: React.CSSProperties;
  onClickOutside?: () => void;
}

const Modal: React.FC<Props> = ({
  zIndex = 1000,
  style,
  onClickOutside,
  children,
}) => {
  return createPortal(
    <Wrapper>
      <Dimmed onClick={onClickOutside} zIndex={zIndex} />
      <Content zIndex={zIndex + 1} style={{ ...style }}>
        {children}
      </Content>
    </Wrapper>,
    document.body
  );
};

const Wrapper = styled.div<any>`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Dimmed = styled.div<any>`
  background-color: #000000;
  opacity: 0.5;
  width: 100%;
  height: 100%;
  z-index: ${(props) => `${props.zIndex}`};
`;

const Content = styled.div<any>`
  position: absolute;
  z-index: ${(props) => `${props.zIndex}`};
`;

export default Modal;
