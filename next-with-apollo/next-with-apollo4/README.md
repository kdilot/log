# Next with Apollo(4)

### graphql code generator

## Installation and Usage

### packages

```ts
yarn add -D @graphql-codegen/cli @graphql-codegen/typescript
```

### package.json

```ts
...
  "scripts": {
    ...
    "generate-gql-types": "graphql-codegen"
  },
...
```

### codegen.yml

```yml
schema: http://localhost:3200/api/graphql
generates:
  types.ts:
    plugins:
      - typescript
```

### run

```ts
yarn dev
yarn generate-gql-types
```
