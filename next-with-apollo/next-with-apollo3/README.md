# Next with Apollo(3)

### apollo schema modules

## Installation and Usage

### resolvers

> pages/api/resolvers/Todo.ts

```ts
import { MOCK_DATA } from "@assets";

const MockData = MOCK_DATA;

export const todoResolvers = {
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
```

> pages/api/resolvers/index.ts

```ts
import { merge } from "lodash";
import { todoResolvers } from "./Todo";

const resolvers = merge(todoResolvers);

export default resolvers;
```

### schemas

> pages/api/schemas/Todo.ts

```ts
import { gql } from "apollo-server-micro";

export const todoTypeDefs = gql`
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
```

> pages/api/schemas/index.ts

```ts
import { todoTypeDefs } from "./Todo";

const typeDefs = [todoTypeDefs];

export default typeDefs;
```
