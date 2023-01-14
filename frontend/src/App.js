import React from "react";
// import "./styles.css";
import "./app.css";
// import TodoList from "./TodoList";
import { Provider } from "react-redux";
import store from "./store";
import Form from "./component/form";

export default function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Form />
      </Provider>
    </div>
  );
}
