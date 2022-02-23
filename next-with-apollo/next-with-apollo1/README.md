# Next with Apollo(1)

### create-next-app

```
create-next-app next-with-apollo --ts
```

## Installation and Usage

### tsconfig.json

```
{
  "compilerOptions": {
    ...
    "baseUrl": ".",
    "paths": {
      "@assets": ["src/assets"] // 사용할 디렉토리 정보
    }
    ...
  },
  ...
}
```
