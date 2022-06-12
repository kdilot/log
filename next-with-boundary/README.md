# React Suspense with Error Boundary

- Suspense와 Error Boundary 를 함께 활용하기 위한 세팅
- nextjs, react-query 베이스

## Installation and Usage

### Package

```ts
yarn create-next-app --ts
yarn add react-error-boundary react-query axios
```

### Setting

\_app.tsx

```ts
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true, // react suspense를 사용하기 위한 설정
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}

export default MyApp;
```

utils/api.ts

```ts
import axios from "axios";
import { useQuery } from "react-query";
import useSWR from "swr";

type ApiT = "section1" | "section2" | "section3" | "section4";

// react-query
export const useReactQueryApi = (name: ApiT) => {
  return useQuery(
    name,
    async () => {
      const { data: rs } = await axios(`/api/${name}`);
      return rs;
    },
    { retry: 0 }
  );
};

// swr
export const useSwrApi = (name: ApiT) => {
  return useSWR(
    name,
    async () => {
      const { data: rs } = await axios(`/api/${name}`);
      return rs;
    },
    { suspense: true }
  );
};
```

components/Section1.tsx

```ts
import { useReactQueryApi } from "../../utils/api";

const Section1: React.FC = () => {
  const { data } = useReactQueryApi("section1");
  return <div>{data.name}</div>;
};

export default Section1;
```

components/CustomError.tsx

```ts
// 에러 발생시 핸들링 할 페이지
import React from "react";

const CustomError: React.FC = ({ error }: any) => {
  return <div style={{ color: "red" }}>ERROR {error.response.status}</div>;
};

export default CustomError;
```

components/Suspense.tsx

```ts
import {
  useState,
  useEffect,
  Suspense as ReactSuspense,
  ComponentProps,
} from "react";
import { ErrorBoundary } from "react-error-boundary";
import CustomError from "../custom-error";

const Suspense = ({
  fallback,
  children,
}: ComponentProps<typeof ReactSuspense>) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    // 각 페이지별로 error 페이지를 쓰기 위해 suspense와 error boundary를 묶음
    // Error 페이지를 글로벌하게 사용하려면 ErrorBoundary를 최상단으로 이동해서 사용
    <ErrorBoundary FallbackComponent={CustomError}>
      {mounted ? (
        <ReactSuspense fallback={fallback}>{children}</ReactSuspense>
      ) : (
        fallback
      )}
    </ErrorBoundary>
  );
};

export default Suspense;
```

import {
Section1,
Section2,
Section3,
Section4,
Suspense,
} from "../components";
...

index.tsx

```ts
<Suspense fallback={<div>loading1...</div>}>
  <Section1 />
</Suspense>

<Suspense fallback={<div>loading2...</div>}>
  <Section2 />
</Suspense>

<Suspense fallback={<div>loading3...</div>}>
  <Section3 />
</Suspense>

<Suspense fallback={<div>loading4...</div>}>
  <Section4 />
</Suspense>
```

## Comment

- 간편하게 세팅해보기 위해서 `react-query`를 기준으로 해봤는데 필요에 따라 다른 형태와 활용도 가능할 것 으로 보임
- 전반적으로 `loading, error`를 묶어줌으로서 코드 작성이 한결 깔끔해짐
- 테스트를 위해서 `react-query`의 `retry` 옵션을 `0`으로 설정했는데, `retry` 횟수가 존재하면 재시도를 다 끝낸 이후에 `error boundary`가 동작함
