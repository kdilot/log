import { gql } from "apollo-server-micro";

export const todoTypeDefs = gql`
  type Todo {
    id: Int
    title: String
    level: Int
    isClosed: Boolean
  }

  type Level {
    id: Int
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
