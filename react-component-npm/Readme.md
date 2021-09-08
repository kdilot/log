# React Component NPM version

### React 컴포넌트 UI 구성요소

storybook을 사용하지 않고 cra로 컴포넌트 확인하는 version

- react
- styled-components
- rollup

## Directory

```
example           //	cra 테스트용 디렉토리
src
├─ components     //	컴포넌트
├─ assets
|   └─ icons      //	svg 아이콘
├─ helpers        //	공통 함수
├─ constants      //	공통 상수
├─ styles         //	공통 스타일
index.ts
.babelrc.json     //	babel 설정
.gitignore        //	git
.npmignore        //	npm 배포 설정
rollup.config.js  //	rollup 설정
tsconfig.json     //	typescript 설정
```

## Installation and Useage

### react

package

```typescript
yarn add --peer react react-dom
yarn add -D @types/react
```

### typescript

package

```typescript
yarn add -D typescript
```

tsconfig.json

```typescript
{
	"compilerOptions": {
    "declaration": true,          //  자동으로 d.type 파일생성
    "declarationDir": "./build",  // 생성된 d.type 파일이 들어갈 경로
    "baseUrl": "./src",
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "jsx": "react",
    "noImplicitAny": false
	},
  "exclude": ["./example"]
}
```

### styled-components

package

```typescript
yarn add -D styled-components @types/styled-components
```

### babel

package

```typescript
yarn add -D babel babel-plugin-styled-components babel-preset-react-app
```

.babelrc.json

```typescript
{
	"presets": [["react-app", { "flow": false, "typescript": true }]],
	"plugins": ["babel-plugin-styled-components"]
}
```

### rollup

package

```typescript
yarn add -D rollup @rollup/plugin-node-resolve @rollup/plugin-commonjs @rollup/plugin-url @rollup/plugin-image rollup-plugin-typescript2 rollup-plugin-peer-deps-external rollup-plugin-sourcemaps @rollup/plugin-babel @svgr/rollup
```

rollup.config.js

```typescript
import resolve from '@rollup/plugin-node-resolve' //  node_modules 에서 서드파티 사용용도
import image from '@rollup/plugin-image' //  JPG, PNG, GIF, SVG 등 이미지 파일을 가져옴
import commonjs from '@rollup/plugin-commonjs' //  CommonJS 모듈을 ES6으로 변환
import typescript from 'rollup-plugin-typescript2' //  타입스크립트 지원
import peerDepsExternal from 'rollup-plugin-peer-deps-external' //  peerDependency로 설치된 라이브러리의 코드가 번들링된 결과에 포함되지 않고, import 구문으로 불러와서 사용 할 수 있도록 해줌
import sourcemaps from 'rollup-plugin-sourcemaps' //  rollup으로 번들하기 전에 소스 맵으로 파일을 변환
import svgr from '@svgr/rollup' //  SVG를 컴포넌트 형태로 불러와서 사용
import url from '@rollup/plugin-url' //  데이터 URI 또는 ES모듈로 가져옴 (@svgr/rollup 사용시 필요)
import babel from '@rollup/plugin-babel' //  babel 을 사용 할 수 있게 해줌
import pkg from './package.json'

const extensions = ['.js', '.jsx', '.ts', '.tsx']
const external = ['react', 'react-dom', 'styled-components']

export default {
  input: './index.ts',
  output: [
    {
      sourcemap: true,
      file: pkg.main,
      format: 'cjs',
    },
    {
      sourcemap: true,
      file: pkg.module,
      format: 'esm',
    },
  ],
  external,
  plugins: [
    peerDepsExternal(),
    resolve({ extensions }),
    babel({ babelHelpers: 'runtime', exclude: 'node_modules/**' }),
    commonjs({ include: 'node_modules/**' }),
    typescript({ tsconfig: './tsconfig.json', clean: true }),
    svgr(),
    image(),
    url(),
    sourcemaps(),
  ],
}
```

package.json

```typescript
"scripts": {
  "build": "rollup -c",
  "dev": "rollup -c -w"
  ...
},
```

build

```typescript
yarn build	//	성공시 build 파일 생성
```

### example(CRA project)

```typescript
npx create-react-app --template typescript
```

package.json

```typescript
"dependencies": {
  ...
  "<패키지명>": "link:../..<해당경로>/<패키지명>",
  ...
},
```

설치

```typescript
// <패키지명> 경로
yarn link <패키지명>

// example 경로
cd node_modules/react && yarn link
cd node_modules/react-dom && yarn link
yarn install
```

실행

```typescript
// <패키지명> 경로
yarn dev

// example 경로
yarn start
```

### gitignore

```typescript
node_modules
```

### npmignore

```typescript
node_modules
yarn-error.log
npm-debug.log
npm-debug.log.*
yarn-error.log
yarn.lock
.DS_Store
.vscode
.idea
.github
stories
storybook-static
.storybook
cypress
cypress.json
.npmignore
.babelrc
.eslintrc
jest.config.js
tsconfig.json
.prettierrc
rollup.config.js
rollup.min.config.js
example
```

## NPM Publish

### package.json

```json
"name": "패키지 이름",
"version": "0.1.12",	//	배포시 반드시 버전 값 변경해야 함
"description": "패키지 설명",
"main": "./build/index.js",
"module": "./build/index.es.js",
"types": "./build/types/index.d.ts",
```

### publish

```
npm login			//	로그인
npm whoami			//	로그인 유저 확인
npm info <패키지명>	// 패키지명 배포 확인여부 404 오류시 사용가능
npm pubilsh			//	배포
```
