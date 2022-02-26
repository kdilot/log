# Next with Apollo(2)

### apollo client & server

## Installation and Usage

### packages
```
yarn add @apollo/client apollo-server-micro axios graphql lodash micro micro-cors
yarn add -D @types/lodash @types/micro-cors
```
### apollo-client.ts

- port 3200

```ts
import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:3200/api/graphql",
  cache: new InMemoryCache(),
});

export default client;
```

### \_app.tsx

```ts
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import client from "apollo-client";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
```

### package.json

```ts
{
	...
	"scripts": {
	    "dev": "next dev -p 3200",
	    ...
	},
	...
}
```

### schemas

> pages/api/schemas/index.ts

```ts
import { gql } from "apollo-server-micro";

const todoTypeDefs = gql`
  type Todo {
    id: ID
    title: String
    level: Int
    isClosed: Boolean
  }

  type Level {
    id: ID
    name: String
    todos: [Todo]
  }

  type Query {
    getTodos: [Todo]
    getTodo(id: Int!): Todo
    getLevels: [Level]
  }

  type Mutation {
    createTodo(title: String!, level: Int!, isClosed: Boolean!): Todo
    updateTodo(id: Int!, title: String!, level: Int!, isClosed: Boolean!): Todo
    deleteTodo(id: Int!): Todo
  }
`;

export default todoTypeDefs;
```

### resolvers

> pages/api/resolvers/index.ts

```ts
import { MOCK_DATA } from "@assets";

const MockData = MOCK_DATA;
const todoResolvers = {
  Query: {
    getTodos: async () => MockData.todos,
    getTodo: async (_: any, args: any) => {
      return MockData.todos.filter((todo) => todo.id === args.id)[0];
    },
    getLevels: async () =>
      MockData.levels.map((level) => {
        return {
          ...level,
          todos: MockData.todos.filter((todo) => todo.level === level.id),
        };
      }),
  },
  Mutation: {
    createTodo: async (_: any, data: any) => {
      const maxId = Math.max(...MockData.todos.map((todo) => todo.id));
      MockData.todos.push({ id: maxId + 1, ...data });
      return { id: maxId + 1, ...data };
    },
    updateTodo: async (_: any, data: any) => {
      const { id, title, level, isClosed } = data;
      const index = MockData.todos.findIndex((todo: any) => todo.id === id);
      MockData.todos[index] = {
        ...MockData.todos[index],
        title,
        level,
        isClosed,
      };
      return data;
    },
    deleteTodo: async (_: any, data: any) => {
      const { id } = data;
      MockData.todos = MockData.todos.filter((todo) => todo.id !== id);
      return { id: data.id };
    },
  },
};

export default todoResolvers;
```

### graphql.ts

> pages/api

```ts
import { ApolloServer } from "apollo-server-micro";
import typeDefs from "./schemas";
import resolvers from "./resolvers";
import Cors from "micro-cors";

const cors = Cors();

const apolloServer = new ApolloServer({ typeDefs, resolvers });

export const config = {
  api: {
    bodyParser: false,
  },
};

const startServer = apolloServer.start();

export default cors(async function handler(req, res) {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://studio.apollographql.com"
  );
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Headers", " Content-Type");
  if (req.method === "OPTIONS") {
    res.end();
    return false;
  }

  await startServer;

  await apolloServer.createHandler({
    path: "/api/graphql",
  })(req, res);
});
```

### index.tsx

```ts
...
import { gql, useQuery } from "@apollo/client";
const TODO_GQL = gql`
  query {
    todos: getTodos {
      id
      title
      level
      isClosed
    }
    levels: getLevels {
      id
      name
    }
  }
`;
const CREATE_GQL = gql`
  mutation ($title: String!, $level: Int!, $isClosed: Boolean!) {
    createTodo(title: $title, level: $level, isClosed: $isClosed) {
      id
      level
      title
      isClosed
    }
  }
`;
const UPDATE_GQL = gql`
  mutation ($id: Int!, $title: String!, $level: Int!, $isClosed: Boolean!) {
    updateTodo(id: $id, title: $title, level: $level, isClosed: $isClosed) {
      id
      level
      title
      isClosed
    }
  }
`;
const DELETE_GQL = gql`
  mutation ($id: Int!) {
    deleteTodo(id: $id) {
      id
    }
  }
`;

const Home: NextPage = () => {
  ...
  const { data, loading } = useQuery(TODO_GQL);
  const [createTodo, { loading: todoLoading, error }] = useMutation(
    CREATE_GQL,
    {
      refetchQueries: [{ query: TODO_GQL }],
      onCompleted() {
        resetInputForm();
      },
    }
  );
  const [updateTodo, { loading: updateLoading, error: updateError }] =
    useMutation(UPDATE_GQL, {
      refetchQueries: [{ query: TODO_GQL }],
      onCompleted() {
        resetInputForm();
      },
    });
  const [deleteTodo, { loading: deleteLoading }] = useMutation(DELETE_GQL, {
    refetchQueries: [{ query: TODO_GQL }],
    onCompleted() {
      resetInputForm();
    },
  });
  const { todos = [], levels = null } = data || [];
  ...

  if (error || updateError) {
    if (error) console.error(error);
    if (updateError) console.error(updateError);
    return <div>ERROR</div>;
  }

  if (loading || todoLoading || updateLoading || deleteLoading) {
    return <div>LOADING</div>;
  }

  return (
    ...
        <div className={styles.grid}>
          {todos.map((todo: any) => (
            <a
              key={todo.id}
              href="#"
              className={styles.card}
              onClick={() => handleClickTodo(todo.id)}
              style={todo.id === updateId ? { borderColor: "red" } : {}}
            >
              <h3>ID : {todo.id}</h3>
              <h4>
                Level : {levelGroup ? levelGroup[todo.level] : todo.level}
              </h4>
              <p
                style={{
                  textDecoration: todo.isClosed ? "line-through" : "auto",
                }}
              >
                {todo.title}
              </p>
            </a>
          ))}
        </div>
	...
  )
}
```
