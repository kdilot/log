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
