# Node with Koa

### 로컬 환경으로 테스트 (react-quert 테스트를 하기위한 세팅)

- DB는 postgres
- 기본 CRUD만 사용
- sequelize 활용

### TABLE

    POST TABLE
    {
        no,
        title,
        content
    }

### API

    GET http://localhost:3100/api/v1/posts
    GET http://localhost:3100/api/v1/post/:no
    PUT http://localhost:3100/api/v1/post/:no
    POST http://localhost:3100/api/v1/post

## Installation and Usage

### Package

- node
- koa
- sequelize
- postgres (local)

### Table

```typescript
POST TABLE
{
	no,
	title,
	content
}
```

### API

index.ts

```typescript
GET http://localhost:3100/api/v1/posts
GET http://localhost:3100/api/v1/post/:no
PUT http://localhost:3100/api/v1/post/:no
POST http://localhost:3100/api/v1/post
```

run

```typescript
yarn start
```
