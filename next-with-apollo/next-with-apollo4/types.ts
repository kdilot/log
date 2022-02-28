export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Level = {
  __typename?: 'Level';
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  todos?: Maybe<Array<Maybe<Todo>>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createTodo?: Maybe<Todo>;
  deleteTodo?: Maybe<Todo>;
  updateTodo?: Maybe<Todo>;
};


export type MutationCreateTodoArgs = {
  isClosed: Scalars['Boolean'];
  level: Scalars['Int'];
  title: Scalars['String'];
};


export type MutationDeleteTodoArgs = {
  id: Scalars['Int'];
};


export type MutationUpdateTodoArgs = {
  id: Scalars['Int'];
  isClosed: Scalars['Boolean'];
  level: Scalars['Int'];
  title: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  getLevels?: Maybe<Array<Maybe<Level>>>;
  getTodo?: Maybe<Todo>;
  getTodos?: Maybe<Array<Maybe<Todo>>>;
};


export type QueryGetTodoArgs = {
  id: Scalars['Int'];
};

export type Todo = {
  __typename?: 'Todo';
  id?: Maybe<Scalars['Int']>;
  isClosed?: Maybe<Scalars['Boolean']>;
  level?: Maybe<Scalars['Int']>;
  title?: Maybe<Scalars['String']>;
};
