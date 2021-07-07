# CRA Storybook Update Issue

### 기존 CRA 프로젝트 storybook 버전 업데이트시 오류 발생

- babel-loader 충돌 에러발생
- CRA 버전에 따라서도 오류 케이스가 다를 것으로 보임

## Installation and Usage

### Package

기존 설치된 히스토리

- react (^16.7.0)
- storybook (6.0.x) 내장 바벨 ^8.0.6
- react-scrips (3.4.4) 내장 바벨 8.1.0
- babel-loader (^8.1.0)

최종 반영 히스토리 (storybook 버전 업데이트 하면서 일부 패키지 버전을 변경)

- storybook (6.3.0)
- babel-loader (8.1.0)
- webpack (4.42.0) 추가
  - 신규 CRA 프로젝트로 테스트 했을 때, 해당 이슈는 발생하지 않았음

### Test

신규 CRA 프로젝트 생성후 storybook 설치

```ts
npx create-react-app cra-storybook
npx sb init (storybook 6.3.0)
yarn storybook (정상 실행)
yarn start (오류 발생 babel-loader)
yarn add babel-loader@8.1.0 (babel-loader 8.1.0 설치)
yarn start (정상 실행)
```

## Comment

- storybook, react-scripts 설치시 babel-loader가 내장으로 설치됨
- 프로젝트 실행시 babel-loader 충돌로 인해 오류가 생기는 듯...
  - storybook (6.3.0) 내장 babel-loader ^8.2.2
  - react-scrips (4.0.3) 내장 babel-loader 8.1.0
- react-script에 포함된 babel-loader 버전을 설치
- 간혹 프로젝트 구성에 따라 webpack 버전 이슈 또한 발생할 수 있음
