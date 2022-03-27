# Recoil Duplicate Issue

nextjs `12.1.0` 에서 recoil `0.6.1` 사용시 오류는 아니지만 키중복 경고 메시지가 출력

## Installation and Usage

### warning message

```ts
Duplicate atom key "sampleState". This is a FATAL ERROR in
production. But it is safe to ignore this warning if it occurred because of
hot module replacement.
```

### before

```ts
export const sampleState = atom({
  key: `sampleState`,
  default: "data",
});
```

### after

공식페이지에도 issue로 등록되어있으나 현재 버전까진 아직 해결되지 않았음
key 명칭에 랜덤값을 추가해서 임시로 해결가능

```ts
import { v1 } from "uuid";
export const sampleState = atom({
  key: `sampleState/${v1()}`,
  default: "data",
});
```
