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
