# Next with Apollo(5)

### emotion

## Installation and Usage

### packages

```ts
yarn add @emotion/react @emotion/styled
yarn add --dev @emotion/babel-plugin
```

### .babelrc

```ts
{
  "presets": [
    [
      "next/babel",
      {
        "preset-react": {
          "runtime": "automatic",
          "importSource": "@emotion/react"
        }
      }
    ]
  ],
  "plugins": ["@emotion/babel-plugin"]
}
```
