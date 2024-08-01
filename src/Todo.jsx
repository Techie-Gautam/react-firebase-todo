import React from "react";
import { Button, ListItem, ListItemText, ListItemSecondaryAction } from "@mui/material";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "./firebase";

const Todo = ({ todoItem, setCurrentEditTodoID, setInputValue, currentEditTodoID }) => {

  const handleDelete = (currentTodoID) => {
    if (currentTodoID === currentEditTodoID) {
      setCurrentEditTodoID(null);
      setInputValue('');
    }
    deleteDoc(doc(db, 'todos', currentTodoID));
  };

  return (
    <ListItem className="todo-item" >
      <ListItemText primary={todoItem?.todoItem?.todo} />
      <ListItemSecondaryAction>
        <Button
          onClick={() => handleDelete(todoItem.id)}
          variant="contained"
          color="secondary"
          className="button"
        >
          Delete
        </Button>
        <Button
          onClick={() => {
            setInputValue(todoItem.todoItem.todo);
            setCurrentEditTodoID(todoItem.id);
          }}
          variant="contained"
          color="info"
          className="button"
        >
          Edit
        </Button>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default Todo;
