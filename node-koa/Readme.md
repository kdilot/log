# Node with Koa (local test api)

    react-query를 로컬에서 테스트하기 위해...

### USED

    node
    koa
    sequelize
    postgres (local)

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
