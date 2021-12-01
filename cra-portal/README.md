# CRA Portal

### portal을 사용한 컴포넌트 생성테스트

- portal 사용시 해당 컴포넌트 DOM 위치 체크

## Installation and Usage

### Package

- create-react-app
- styled-components

### App.tsx

기본 App.tsx 파일에 Modal, Modal with portal 두 가지 버전의 모달을 생성

```ts
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
        // 기본적인 모달
        <Modal onClickOutside={() => setIsModal(false)}>
          <ModalContentsWrapper>Modal</ModalContentsWrapper>
        </Modal>
      )}
      {isPortal && (
        // portal을 사용한 모달
        <ModalProtal onClickOutside={() => setIsPortal(false)}>
          <ModalContentsWrapper>Modal with portal</ModalContentsWrapper>
        </ModalProtal>
      )}
    </div>
  );
}
```

### Modal

```ts
const Modal: React.FC<Props> = ({
  zIndex = 1000,
  style,
  onClickOutside,
  children,
}) => {
  return (
    <Wrapper>
      <Dimmed onClick={onClickOutside} zIndex={zIndex} />
      <Content zIndex={zIndex + 1} style={{ ...style }}>
        {children}
      </Content>
    </Wrapper>
  );
};
```

Modal 생성 위치

```ts
<div id="root">
  <div class="App">
    <header class="App-header">
      <div class="sc-iqseJM hGmGSG">Modal</div>
      <div class="sc-iqseJM hGmGSG">Modal with portal</div>
    </header>
    ... // App-header 다음에 위치
    <div class="sc-bkkeKt jIRxay">
      <div class="sc-ieecCq fsJkPL"></div>
      <div class="sc-dJjYzT jKRJfS">
        <div class="sc-crHmcD jbutZy">Modal</div>
      </div>
    </div>
    ...
  </div>
</div>
```

### Modal with portal

```ts
import { createPortal } from "react-dom";
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
    document.body // body로 위치 지정
  );
};
```

Modal with portal 생성 위치

```ts
<div id="root">
	<div class="App">
	  <header class="App-header">
	    <div class="sc-iqseJM hGmGSG">Modal</div>
	    <div class="sc-iqseJM hGmGSG">Modal with portal</div>
	  </header>
	  ...
	  // App-header 다음에 위치
	  <div class="sc-bkkeKt jIRxay">
	    <div class="sc-ieecCq fsJkPL"></div>
	    <div class="sc-dJjYzT jKRJfS">
	      <div class="sc-crHmcD jbutZy">Modal</div>
	    </div>
	  </div>
	  ...
	</div>
</div>
...
// body 안에 root와 동일한 위치
<div class="sc-egiyK gjzBvv">
  <div class="sc-bqiRlB fRQCKx"></div>
  <div class="sc-ksdxgE kCrsJz">
    <div class="sc-crHmcD jbutZy">Modal with portal</div>
  </div>
</div>
...

```

## Comment

- domnode는 어딘가에 명시가 되어야 함
  - 예시로 document.body를 썼으나 정확한 위치에 놓일 domnode가 관리 되어야 한다
- 이벤트 버블링은 평상시와 동일하게 적용됨
- 키보드 포커스를 통한 기능이 사용될 경우 키보드 포커스의 위치를 관리 해야하는 경우가 있다
