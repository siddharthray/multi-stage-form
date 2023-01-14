import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTodos, addTodo } from "./store/profile";

export default function TodoList() {
  const [input, setInput] = useState("");

  const loading = useSelector((state) => state.todo.loading);
  const error = useSelector((state) => state.todo.error);
  const todos = useSelector((state) => state.todo.todos);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodos());
  }, []);

  const add = () => {
    dispatch(
      addTodo({
        text: input
      })
    );
    setInput("");
  };

  if (loading) {
    return <div>loading...</div>;
  }
  if (error) {
    return <div>{error.message}</div>;
  }
  return (
    <div>
      <h1>TODO list</h1>

      <input
        type="text"
        onChange={(e) => {
          setInput(e.target.value);
        }}
        value={input}
        placeholder="add todos"
      />
      <button onClick={add}>Add</button>

      <ul>
        {todos.map((todo, index) => {
          return <li key={index}>{todo.name}</li>;
        })}
      </ul>
    </div>
  );
}
