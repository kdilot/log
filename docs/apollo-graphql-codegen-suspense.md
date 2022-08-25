# Apollo GraphQL Codegen with React Suspense

## Issue

`Codegen`을 활용하면 `GraphQL Query` 정보를 통해 직접 `Apollo`의 `useQuery`를 사용하지 않고 `Query` 정보가 입력된 `Apollo.useQuery` 로 감싼 형태를 활용하게 된다. 추가로 각 `Query` 상태에 대한 `Type`도 생성되기 때문에 편하게 활용이 가능하다. 여기서 이슈가 생기는데 React Suspense를 함께 활용하기 위해선 `Suspense` 옵션을 활성화 해줘야 하는데 현재 `Apollo Client` 버전(`3.6.x`)에서는 해당 옵션을 지원하지 않는다. (`Tanstack React Query, SWR` 에서는 `Suspense`를 사용하기 위한 옵션을 제공 해준다.) 이것을 해결하기 위해선 두 가지 정도의 옵션이 있다.

1.  `react-apollo-hooks`를 추가로 설치해서 제공하는 `useQuery`에 `Suspense` 옵션을 활성화 시켜서 사용한다. (이 방법을 사용하면 `Codegen`을 통해 만들어진 `Query` 방식은 사용할 수 없고 별도로 작성해서 사용 해야 할 듯 싶다)
2.  `Apollo Client`의 새로운 버전에서는 `Suspense` 기능을 제공할 것이라는 내용이 있다. 아마 `3.7` 버전에서 제공될 것으로 예상하는데 버전 업데이트를 기다렸다가 `Suspense`를 활용한다. (사실 언제 업데이트 될지는 모른다.)
3.  아직 내가 해결책을 못 찾은 것이다, 구글 어딘가에 방법은 존재할테니 다시 검색한다.

## Comment

- `Suspense`옵션이 적용된 `Apollo Client`버전을 적용하는게 가장 적은 작업비용이 소요되지만 계속 기다리기만 할 수는 없다. `Suspense`기능이 필수조건은 아니기 때문에 적절한 플랜비도 생각 해봐야 하는 상황
- `react-apollo-hooks` 을 설치해서 사용하는 방식도 더 찾아보니 현재는 `@apollo/react-hooks` 가 나오면서 사용하지 않는 것으로 보인다. 이 방법을 활용하려면 `@apollo/react-hooks` 를 설치해서 써야 할 것으로 보인다.
- 그래도 계속 찾다보면 방법이 나올 것 같은 느낌이라서 시간이 남는대로 더 찾아볼 예정이다.
