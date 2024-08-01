import React, { useEffect, useState } from "react";
import { TextField, Button, Container, Typography, List } from "@mui/material";
import { addDoc, collection, doc, onSnapshot, orderBy, query, serverTimestamp, updateDoc } from 'firebase/firestore';
import { auth, db, logout } from "./firebase";
import Todo from "./Todo";
import Index from "./firebaseAuth/Index";
import { useAuthState } from "react-firebase-hooks/auth";
import Autho from "./firebaseAuth/Autho";

const q = query(collection(db, 'todos'), orderBy('timestamp', 'desc'));

const App = () => {
  const [user, loading, error ] = useAuthState(auth);

  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);
  const [currentEditTodoID, setCurrentEditTodoID] = useState(null);
  
  useEffect(() => {
    onSnapshot(q, (snapShot) => {
      setTodos(
        snapShot.docs.map((docItem) => ({
          id: docItem.id,
          todoItem: docItem.data()
        }))
      );
    });
  }, []);
  
  const handleAddAndEditTodo = (e) => {
    e.preventDefault();
    currentEditTodoID !== null 
      ? updateDoc(doc(db, 'todos', currentEditTodoID), {
          todo: inputValue
        })
      : addDoc(collection(db, 'todos'), {
          todo: inputValue,
          timestamp: serverTimestamp(),
        });
    setInputValue('');
    setCurrentEditTodoID(null);
  };

  return (
    <Container className="app-container">
      {user ? (
        <>
        <Autho />
          <Typography variant="h3" className="header">
            Firebase Todo
          </Typography>
          <form onSubmit={handleAddAndEditTodo} className="form">
            <TextField
              id="todo"
              label="Create Todo"
              variant="outlined"
              size="small"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="input"
            />
            <Button type="submit" variant="contained" color="primary" className="button">
              {currentEditTodoID !== null ? "Edit Todo" : "Add Todo"}
            </Button>
          </form>
          <List className="todo-list">
            {todos && todos.length > 0 ? (
              todos.map((todoItem) => (
                <Todo
                  setInputValue={setInputValue}
                  currentEditTodoID={currentEditTodoID}
                  setCurrentEditTodoID={setCurrentEditTodoID}
                  todoItem={todoItem}
                  key={todoItem.id}
                />
              ))
            ) : (
              <Typography variant="h5">Todo list is empty</Typography>
            )}
          </List>
      <button className="auth-button" onClick={logout}>Log Out</button>
        </>
      ) : (
        <Index />
      )}
    </Container>
  );
};

export default App;
