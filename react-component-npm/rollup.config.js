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
