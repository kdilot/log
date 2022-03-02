import { gql, useMutation, useQuery } from "@apollo/client";
import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { Level, Todo } from "types";
import styles from "../styles/Home.module.css";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

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
  const [title, setTitle] = useState("");
  const [level, setLevel] = useState(2);
  const [isClosed, setIsClosed] = useState(false);
  const [updateId, setUpdateId] = useState(0);
  const [levelGroup, setLevelGroup] = useState<any>({});
  const { data, loading } = useQuery(TODO_GQL);
  const resetInputForm = () => {
    setTitle("");
    setLevel(2);
    setIsClosed(false);
    setUpdateId(0);
  };
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

  useEffect(() => {
    if (levels) {
      const group: any = {};
      levels.map((level: Level) => (group[level.id as number] = level.name));
      setLevelGroup(group);
    }
  }, [levels]);

  const handleClickButton = () => {
    if (!title) {
      alert("Empty title is not allowed.");
      return;
    }
    if (updateId) {
      updateTodo({
        variables: {
          id: updateId,
          title,
          level,
          isClosed,
        },
      });
      return;
    }
    createTodo({
      variables: {
        title,
        level,
        isClosed,
      },
    });
  };

  const handleClickTodo = (id: number) => {
    if (updateId === id) {
      resetInputForm();
      return;
    }
    const selectedTodo = todos.filter((todo: Todo) => todo.id === id)[0];
    const { title = "", level = 0, isClosed = false } = selectedTodo;
    if (title) {
      setTitle(title);
      setLevel(level);
      setIsClosed(isClosed);
      setUpdateId(id);
      return;
    }
    alert("Error, Undefined ID");
  };

  const handleClickDelete = () => {
    if (confirm("Are you sure you want to delete?")) {
      deleteTodo({
        variables: {
          id: updateId,
        },
      });
    }
  };

  if (error || updateError) {
    if (error) console.error(error);
    if (updateError) console.error(updateError);
    return <div>ERROR</div>;
  }

  if (loading || todoLoading || updateLoading || deleteLoading) {
    return <div>LOADING</div>;
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Todo List</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex style={{ flexDirection: "column" }}>
        <h1 className={styles.title}>Todo List</h1>
        <Wrapper>
          <InputBoxWrapper>
            <Flex>
              <Input
                placeholder="TODO"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <Select
                value={level}
                onChange={(e) => setLevel(Number(e.target.value))}
              >
                <option value={1}>low</option>
                <option value={2}>normal</option>
                <option value={3}>high</option>
              </Select>
              <Button onClick={handleClickButton}>
                {updateId ? "Update" : "Add"}
              </Button>
            </Flex>
            <Flex>
              <CheckBox
                type="checkbox"
                id="check"
                checked={isClosed}
                onChange={() => setIsClosed((isClosed) => !isClosed)}
              />
              <label htmlFor="check">Done</label>
            </Flex>
          </InputBoxWrapper>
        </Wrapper>
        <CardListWrapper>
          {todos.map((todo: Todo) => (
            <CardWrapper
              key={todo.id}
              onClick={() => handleClickTodo(todo.id as number)}
              style={todo.id === updateId ? { borderColor: "#000" } : {}}
            >
              <CardHead>
                <span>
                  {levelGroup ? levelGroup[todo.level as number] : todo.level}
                </span>
                {updateId === todo.id && (
                  <CardDelete onClick={handleClickDelete}>Delete</CardDelete>
                )}
              </CardHead>
              <CardBody
                style={{
                  textDecoration: todo.isClosed ? "line-through" : "auto",
                }}
              >
                {todo.title}
              </CardBody>
            </CardWrapper>
          ))}
        </CardListWrapper>
      </Flex>
    </div>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 10px;
`;

const InputBoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 500px;
  padding: 20px;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 4px;

  select {
    margin: 0 10px;
  }
`;

const Flex = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  width: 100%;
  height: 50px;
`;

const Select = styled.select`
  height: 50px;
  font-size: 16px;
  padding: 10px;
`;

const Button = styled.button`
  height: 50px;
  width: 110px;
  font-size: 16px;
`;

const CheckBox = styled.input`
  width: 20px;
  height: 20px;
  margin: 5px;
  margin-left: 0;
`;

const CardListWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 20px;
  max-width: 500px;
`;

const CardWrapper = styled.div`
  text-decoration: none;
  border: 1px solid #eaeaea;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 150px;
`;

const CardHead = styled.div`
  display: flex;
  justify-content: space-between;

  span {
    font-style: italic;
    color: rgba(0, 0, 0, 0.7);
  }
`;

const CardBody = styled.div`
  font-size: 18px;
  margin-top: 10px;
  overflow: auto;
`;

const CardDelete = styled.div`
  color: red;
  cursor: pointer;
`;

export default Home;
