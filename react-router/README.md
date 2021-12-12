# CRA React Router v6 trial

### react-router v6 체험

- v5 기본 라우팅 페이지 생성
- v6 버전 업데이트 적용

## Installation and Usage

### Package

- create-react-app (react 버전 최소 16.8)
- styled-components
- react-router-dom (v5, v6)

### Route

`Route`의 기본 속성으로 `exact`가 적용됨(`exact` 삭제)
여러 라우팅을 매칭하고자 할 경우 `URL` 경로에 `/*` 를 추가해서 사용
`component` -> `element` 명칭 변경

```ts
// v5
<Route path="/product/:id" exact component={ProductId} />

// v6
<Route path="/product/:id" element={<ProductId />} />
```

### Switch -> Routes

`Switch`가 `Routes`로 변경되었으며 `Route`는 반드시 `Routes`안에 선언되어야 한다

```ts
// v5
import { BrowserRouter, Switch, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/product" exact component={Product} />
        <Route path="/product/:id" exact component={ProductId} />
        <Route path="/product/:id/comment" exact component={ProductIdComment} />
        <Route path="*" component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}

// v6
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Product />} />
        <Route path="/product/:id" element={<ProductId />} />
        <Route path="/product/:id/comment" element={<ProductIdComment />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
```

### useHistory -> useNavigate

```ts
// v5
import { useHistory } from "react-router-dom";

const history = useHistory();
history.push("home");
history.replace("home");
history.goBack();

// v6
import { useNavigate } from "react-router-dom";

const navigate = useNavigate();
navigate("home");
navigate("home", { replace: true });
navigate(-1);
```

### Redirect -> Navigate

기존의 `Redirect` 대신에 `Route`, `Navigate`를 활용

```ts
// v5
import { Redirect } from "react-router-dom";

<Redirect from="/redirect" to="/redirect/home" />;

// v6
import { Route, Navigate } from "react-router-dom";

<Route path="/redirect" element={<Navigate to="/redirect/home" />} />;
```

## Comment

- `Switch`가 `Routes`로 바뀌면서 좀더 직관적인 느낌
- `history`를 다 찾아서 `navigate`으로 바꾸려하니 너무 손이 많이간다....
  - `RN`에서는 `navigate` 형식의 표현을 썼던 것으로 기억하는데 이렇게 바뀐게 더 좋음
- 기본적인 기능 이외에 추가되거나 변경된 내용이 많은데 천천히 테스트를 해봐야 할 듯
- 정식 프로젝트에 반영하는 것은 공식 문서의 업데이트를 기다렸다가 해볼 예정
