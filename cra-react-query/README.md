# CRA React Query

### react-query 사용 테스트 체크리스트

- API 로직을 간소화 할 수 있는지
- CRUD 활용
- loading, error 등 구분

## Installation and Usage

### Package

- react-query
- react-hook-form (간단한 input 사용을 위해)
- styled-components
- axios (api 호출)

### API Server

기존에 node 를 활용해서 만들어 두었던 로컬 API 서버를 사용

package.json

```typescript
"proxy":"http://localhost:3100" //	LOCAL_API_URL = 'http://localhost:3100/api/v1'
```

## Comment

- hooks를 활용해서 API 로직만 간단하게 분리가 가능
  - 기본적으로 상태관리에 연결하지 않고 사용하는 방법을 찾는중
- Read 기능은 편리
  - 조회된 정보에 대해서 캐싱도 자동으로 처리해줘서 재호출을 막아야 할 경우에 유용
  - 과도한 설정 값은 빈번한 API 호출을 발생시킬 수 있음 (시간 딜레이 설정을 잘해야 할듯..)
- Create, Update, Delete 사용은 좀 더 테스트를 할 필요성이 있음 (이해도와 숙련도 이슈...)
- 기본 기능이 `hooks`으로 되어있다보니 상황에 따라 `Read`의 경우 `refetch`를 활용
- 전반적인 API 로직을 커스텀 hooks 기반으로 사용 (API 로직을 분리해서 이해하기 쉽도록)
- loading, error 컨트롤이 편해서 데이터 로딩 표기를 위한 레이아웃 짜는데 용이
